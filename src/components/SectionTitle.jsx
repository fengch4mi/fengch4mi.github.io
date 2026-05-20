export default function SectionTitle({
  title,
  subtitle,
  titleClassName = 'section-title',
  subtitleClassName = 'section-subtitle'
}) {
  return (
    <>
      <h2 className={titleClassName}>{title}</h2>
      {subtitle ? <p className={subtitleClassName}>{subtitle}</p> : null}
    </>
  );
}
