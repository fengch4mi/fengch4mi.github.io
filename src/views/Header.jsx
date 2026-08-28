const navItems = [
  {
    label: "Home",
    active: false,
    widthClass: "inline-flex",
    textClass: "text-collection-2-basic-color-slate-700",
  },
  {
    label: "About",
    active: false,
    widthClass: "flex w-[105px]",
    textClass: "text-collection-2-basic-color-slate-700",
  },
  {
    label: "Portfolio",
    active: true,
    widthClass: "inline-flex flex-[0_0_auto]",
    textClass: "text-collection-2-basic-color-slate-50",
  },
];

export const SiteHeaderSection = () => {
  return (
    <header className="flex w-[1720px] items-center gap-[1000px] px-10 py-[18px] absolute top-[50px] left-[100px] bg-collection-2-basic-color-amber-400 rounded-[50px] overflow-hidden">
      <div className="relative w-fit [font-family:'FreeSans-Bold',Helvetica] font-bold text-black text-[40px] tracking-[0] leading-[normal]">
        Hafizh Alexander
      </div>
      <nav
        aria-label="Primary"
        className="inline-flex items-center gap-3 relative flex-[0_0_auto] mr-[-32.00px]"
      >
        {navItems.map((item) => (
          <button
            key={item.label}
            type="button"
            aria-current={item.active ? "page" : undefined}
            className={`all-[unset] box-border ${item.widthClass} flex-col items-center justify-center gap-2.5 px-[31px] py-[21px] relative rounded-[50px] overflow-hidden bg-collection-2-basic-color-slate-800`}
          >
            <div
              className={`relative self-stretch mt-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium ${item.textClass} text-base tracking-[0] leading-[normal]`}
            >
              {item.label}
            </div>
          </button>
        ))}
      </nav>
    </header>
  );
};
