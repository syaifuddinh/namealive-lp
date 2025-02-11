export const MobileView = ({ children }: { children: React.ReactNode }) => (
  <div className="block md:hidden">
    { children }
  </div>
);