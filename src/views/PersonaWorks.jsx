const workColumns = [
  {
    gapClassName: "gap-6",
    items: [{ heightClassName: "h-[545px]" }, { heightClassName: "h-[385px]" }],
  },
  {
    gapClassName: "gap-[23px]",
    items: [{ heightClassName: "h-[386px]" }, { heightClassName: "h-[545px]" }],
  },
  {
    gapClassName: "gap-6",
    items: [{ heightClassName: "h-[545px]" }, { heightClassName: "h-[385px]" }],
  },
  {
    gapClassName: "gap-6",
    items: [{ heightClassName: "h-[385px]" }, { heightClassName: "h-[545px]" }],
  },
];

export const PersonalWorksSection = () => {
  return (
    <section
      aria-labelledby="personal-works-title"
      className="top-[3848px] bg-collection-2-basic-color-green-200 flex flex-col w-[1720px] items-start gap-6 px-[30px] py-[46px] absolute left-[100px] rounded-[40px] overflow-hidden border-[none] backdrop-blur-[10.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(10.5px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_7px_rgba(0,0,0,0.13),inset_-1px_0_7px_rgba(0,0,0,0.11)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[40px] before:[background:linear-gradient(113deg,rgba(0,0,0,1)_0%,rgba(51,51,51,0.5)_50%,rgba(102,102,102,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
    >
      <header className="w-[1656px] gap-[1036px] flex-[0_0_auto] flex items-start relative z-[2]">
        <h2
          id="personal-works-title"
          className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Bold',Helvetica] font-bold text-collection-2-basic-color-slate-700 text-[64px] tracking-[0] leading-[48px] whitespace-nowrap"
        >
          Personal Works
        </h2>
        <a
          href="#"
          aria-label="View more personal works"
          className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-collection-2-basic-color-slate-700 text-[32px] tracking-[0] leading-[48px] underline whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-collection-2-basic-color-slate-700 focus-visible:ring-offset-2 focus-visible:ring-offset-transparent rounded-sm z-[2]"
        >
          more here
        </a>
      </header>
      <div
        role="list"
        aria-label="Personal works gallery"
        className="flex items-center gap-[38px] relative self-stretch w-full flex-[0_0_auto] z-[2]"
      >
        {workColumns.map((column, columnIndex) => (
          <div
            key={`column-${columnIndex}`}
            className={`flex flex-col w-[385px] items-start ${column.gapClassName} relative`}
          >
            {column.items.map((item, itemIndex) => (
              <article
                key={`item-${columnIndex}-${itemIndex}`}
                role="listitem"
                aria-label={`Personal work ${columnIndex * 2 + itemIndex + 1}`}
                className={`relative self-stretch w-full ${item.heightClassName} bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden`}
              >
                <div className="absolute top-[358px] left-[268px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-black text-4xl text-justify tracking-[0] leading-[normal] whitespace-nowrap">
                  placeholder foto
                </div>
              </article>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
