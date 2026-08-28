import { withBase } from "../utils/baseUrl";

const socialLinks = [
  {
    name: "Github",
    handle: "@fengch4mi",
    href: "https://github.com/fengch4mi",
    bgClass: "bg-collection-2-basic-color-lime-50",
    titleWidthClass: "w-[76px]",
    handleWidthClass: "w-[135px]",
    iconSrc: withBase("assets/Github.svg"),
    iconClass:
      "!relative !row-[1_/_3] !col-[1_/_2] !justify-self-center !self-center !w-[58px] !h-[58px]",
  },
  {
    name: "Linkedin",
    handle: "Hafizh Dakota Alexander",
    href: "https://www.linkedin.com/in/hfizalex/",
    bgClass: "bg-collection-2-basic-color-orange-50",
    titleWidthClass: "w-[98px]",
    handleWidthClass: "w-[264px]",
    iconSrc: withBase("assets/Linkedin.svg"),
    iconClass:
      "!relative !row-[1_/_3] !col-[1_/_2] !self-center !w-[58px] !h-[58px] !aspect-[1]",
  },
  {
    name: "Instagram",
    handle: "@alexnyaan",
    href: "https://instagram.com/alexnyaan",
    bgClass: "bg-collection-2-basic-color-amber-50",
    titleWidthClass: "w-28",
    handleWidthClass: "w-[133px]",
    iconSrc: withBase("assets/Instagram.svg"),
    iconClass:
      "!relative !row-[1_/_3] !col-[1_/_2] !self-center !w-[58px] !h-[58px] !aspect-[1]",
  },
];

export const ContactCallToActionSection = () => {
  return (
    <section
      aria-labelledby="contact-call-to-action-title"
      className="grid grid-cols-2 grid-rows-3 w-[calc(100%_-_48px)] h-[calc(100%_-_5066px)] gap-2 pt-[76px] pb-9 px-[76px] absolute top-[5036px] left-6 bg-collection-2-basic-color-orange-400 rounded-3xl overflow-hidden"
    >
      <div className="relative row-[1_/_2] col-[1_/_3] [align-self:start] w-full h-fit flex items-start justify-between">
        <div className="flex flex-col w-[856px] items-start gap-[60px] relative self-stretch">
          <div className="inline-flex flex-col h-[255px] items-start gap-6 relative">
            <div className="flex flex-col items-start gap-2.5 relative self-stretch w-full flex-[0_0_auto]">
              <h2
                id="contact-call-to-action-title"
                className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Bold',Helvetica] font-bold text-onboarding-background-grey text-8xl tracking-[-1.92px] leading-[124.8px] whitespace-nowrap"
              >
                Let&apos;s get in touch!
              </h2>
              <p className="relative w-fit [font-family:'FreeSans-Medium',Helvetica] font-medium text-onboarding-background-grey text-[40px] tracking-[0] leading-[60px]">
                Get in touch today and let&#39;s explore
                <br />
                how we can work together!
              </p>
            </div>
          </div>
          <div className="flex flex-col w-[505px] items-start gap-[5px] relative flex-[0_0_auto]">
            <div className="relative self-stretch mt-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-onboarding-background-grey text-[32px] tracking-[0] leading-[41.6px]">
              Email Me @
            </div>
            <a
              href="mailto:alexanderhafizh@gmail.com"
              aria-label="Send email to alexanderhafizh@gmail.com"
              className="inline-flex flex-col items-center justify-center gap-2.5 px-9 py-4 relative flex-[0_0_auto] bg-collection-2-basic-color-stone-100 rounded-[48px] overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b262c] focus-visible:ring-offset-2 focus-visible:ring-offset-collection-2-basic-color-orange-400"
            >
              <div className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Bold',Helvetica] font-bold text-[#1b262c] text-[32px] text-justify tracking-[0] leading-[normal]">
                alexanderhafizh@gmail.com
              </div>
            </a>
          </div>
        </div>
        <div className="flex flex-col w-[856px] items-start gap-4 relative">
          <h3 className="relative self-stretch mt-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-onboarding-background-grey text-[40px] tracking-[0] leading-10">
            Socials
          </h3>
          <div className="flex flex-col items-start gap-4">
            {socialLinks.map(
              ({
                name,
                handle,
                href,
                bgClass,
                titleWidthClass,
                handleWidthClass,
                iconSrc,
                iconClass,
              }) => (
                <a
                  key={name}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${name}: ${handle}`}
                  className={`${bgClass} grid grid-cols-[repeat(2,fit-content(100%))] grid-rows-[repeat(2,fit-content(100%))] h-fit gap-[8px_24px] p-6 rounded-3xl overflow-hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b262c] focus-visible:ring-offset-2 focus-visible:ring-offset-collection-2-basic-color-orange-400`}
                >
                  <img
                    src={iconSrc}
                    alt=""
                    aria-hidden="true"
                    className={iconClass}
                  />
                  <div
                    className={`relative row-[1_/_2] col-[2_/_3] ${titleWidthClass} h-[33px] [font-family:'FreeSans-Bold',Helvetica] font-bold text-[#1b262c] text-2xl text-justify tracking-[0] leading-[normal]`}
                  >
                    {name}
                  </div>
                  <div
                    className={`relative row-[2_/_3] col-[2_/_3] ${handleWidthClass} h-[31px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-[#1b262c] text-2xl text-justify tracking-[0] leading-[normal]`}
                  >
                    {handle}
                  </div>
                </a>
              ),
            )}
          </div>
        </div>
      </div>
      <footer className="relative row-[3_/_4] col-[1_/_2] justify-self-start [align-self:end] w-fit h-fit inline-flex items-center gap-2.5 bg-transparent">
        <p className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-[#1b262c] text-[32px] text-justify tracking-[0] leading-[normal]">
          © 2026 Hafizh Dakota Alexander
        </p>
      </footer>
    </section>
  );
};
