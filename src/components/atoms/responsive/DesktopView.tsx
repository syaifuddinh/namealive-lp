export const DesktopView = ({ children }: { children: React.ReactNode }) => (
  <div className="hidden md:block">
    { children }
  </div>
);