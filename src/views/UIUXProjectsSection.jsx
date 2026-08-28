const leftColumnCards = [
  {
    className:
      "relative self-stretch w-full bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden aspect-[0.8]",
  },
  {
    className:
      "relative w-[360px] h-[450px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden aspect-[0.8]",
  },
];

const centerCards = [
  {
    className:
      "relative w-[432px] h-[540px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
  {
    className:
      "relative w-[432px] h-[540px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
];

const rightColumnCards = [
  {
    className:
      "relative self-stretch w-full bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden aspect-[0.8]",
  },
  {
    className:
      "relative self-stretch w-full bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden aspect-[0.8]",
  },
];

const bottomRowCards = [
  {
    wrapperClassName: "flex flex-col w-[398px] items-end relative",
    cardClassName:
      "relative self-stretch w-full h-[497.5px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
  {
    wrapperClassName: "flex flex-col w-[398px] items-end relative",
    cardClassName:
      "relative self-stretch w-full h-[497.5px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
  {
    wrapperClassName: "flex flex-col w-[397px] items-end relative",
    cardClassName:
      "relative self-stretch w-full h-[497.5px] bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
  {
    wrapperClassName: "flex flex-col w-[391px] items-end relative",
    cardClassName:
      "w-[398px] h-[497.5px] ml-[-7.00px] relative bg-collection-2-basic-color-pink-400 rounded-[30px] overflow-hidden",
  },
];

const PlaceholderCard = ({ className }) => (
  <div
    className={className}
    role="img"
    aria-label="Social media gallery placeholder image"
  >
    <div className="absolute top-[358px] left-[268px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-black text-4xl text-justify tracking-[0] leading-[normal]">
      placeholder foto
    </div>
  </div>
);

export const SocialMediaGallerySection = () => {
  return (
    <section
      aria-labelledby="social-media-gallery-title"
      className="top-[1216px] bg-collection-2-basic-color-blue-200 flex flex-col w-[1720px] items-start gap-6 px-[30px] py-[46px] absolute left-[100px] rounded-[40px] overflow-hidden border-[none] backdrop-blur-[10.5px] backdrop-brightness-[100.0%] backdrop-saturate-[100.0%] [-webkit-backdrop-filter:blur(10.5px)_brightness(100.0%)_saturate(100.0%)] shadow-[inset_0_1px_0_rgba(255,255,255,0.40),inset_1px_0_0_rgba(255,255,255,0.32),inset_0_-1px_7px_rgba(0,0,0,0.13),inset_-1px_0_7px_rgba(0,0,0,0.11)] before:content-[''] before:absolute before:inset-0 before:p-px before:rounded-[40px] before:[background:linear-gradient(113deg,rgba(0,0,0,1)_0%,rgba(51,51,51,0.5)_50%,rgba(102,102,102,0)_100%)] before:[-webkit-mask:linear-gradient(#fff_0_0)_content-box,linear-gradient(#fff_0_0)] before:[-webkit-mask-composite:xor] before:[mask-composite:exclude] before:z-[1] before:pointer-events-none"
    >
      <header className="w-[1656px] gap-[996px] flex-[0_0_auto] flex items-start relative z-[2]">
        <h2
          id="social-media-gallery-title"
          className="relative w-fit mt-[-1.00px] [font-family:'FreeSans-Bold',Helvetica] font-bold text-collection-2-basic-color-slate-700 text-[64px] tracking-[0] leading-[48px] whitespace-nowrap"
        >
          Social Media
        </h2>
        <p className="relative w-fit mt-[-1.00px] mr-[-1.00px] [font-family:'FreeSans-Medium',Helvetica] font-medium text-collection-2-basic-color-slate-700 text-[32px] tracking-[0] leading-[48px] underline whitespace-nowrap">
          Atlus Info Indonesia
        </p>
      </header>
      <div className="flex items-center gap-6 relative self-stretch w-full flex-[0_0_auto] z-[2]">
        <div className="flex flex-col w-[360px] h-[927.77px] items-end gap-[26px] relative aspect-[0.39]">
          {leftColumnCards.map((card, index) => (
            <PlaceholderCard
              key={`left-card-${index}`}
              className={card.className}
            />
          ))}
        </div>
        {centerCards.map((card, index) => (
          <PlaceholderCard
            key={`center-card-${index}`}
            className={card.className}
          />
        ))}

        <div className="flex flex-col w-[360px] h-[928px] items-end gap-[26px] relative aspect-[0.39]">
          {rightColumnCards.map((card, index) => (
            <PlaceholderCard
              key={`right-card-${index}`}
              className={card.className}
            />
          ))}
        </div>
      </div>
      <div className="flex w-[1656px] items-center gap-6 px-0 py-px relative flex-[0_0_auto] z-[2]">
        {bottomRowCards.map((card, index) => (
          <div key={`bottom-card-${index}`} className={card.wrapperClassName}>
            <PlaceholderCard className={card.cardClassName} />
          </div>
        ))}
      </div>
    </section>
  );
};
