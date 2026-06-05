import "server-only";
import bcrypt from "bcryptjs";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";
import { db } from "./db";

const COOKIE = "city_session";
const secret = new TextEncoder().encode(
  process.env.SESSION_SECRET || "citygym-dev-secret-change-me-in-production-please"
);

// Ensure a default admin exists (admin / citygym). Change from the panel later.
export function ensureDefaultAdmin() {
  const count = db.prepare("SELECT COUNT(*) AS n FROM admins").get() as { n: number };
  if (count.n === 0) {
    const hash = bcrypt.hashSync("citygym", 10);
    db.prepare("INSERT INTO admins (username, password_hash) VALUES (?, ?)").run("admin", hash);
  }
}

export async function login(username: string, password: string): Promise<boolean> {
  ensureDefaultAdmin();
  const row = db.prepare("SELECT * FROM admins WHERE username = ?").get(username) as
    | { id: number; username: string; password_hash: string }
    | undefined;
  if (!row || !bcrypt.compareSync(password, row.password_hash)) return false;

  const token = await new SignJWT({ uid: row.id, username: row.username })
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime("7d")
    .sign(secret);

  (await cookies()).set(COOKIE, token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 7,
  });
  return true;
}

export async function logout() {
  (await cookies()).delete(COOKIE);
}

export async function getSession(): Promise<{ uid: number; username: string } | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  try {
    const { payload } = await jwtVerify(token, secret);
    return { uid: payload.uid as number, username: payload.username as string };
  } catch {
    return null;
  }
}

export function changePassword(uid: number, newPassword: string) {
  const hash = bcrypt.hashSync(newPassword, 10);
  db.prepare("UPDATE admins SET password_hash = ? WHERE id = ?").run(hash, uid);
}
