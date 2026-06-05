// The admin panel is staff-facing and always English/LTR, even when the public
// site is switched to Arabic (RTL).
export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div dir="ltr" className="text-left">
      {children}
    </div>
  );
}
