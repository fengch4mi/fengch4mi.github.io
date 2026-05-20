export const SkeletonCard = () => (
  <div className="skeleton-card">
    <div className="skeleton skeleton-image"></div>
    <div className="skeleton skeleton-text"></div>
    <div className="skeleton skeleton-text short"></div>
  </div>
);

export const SkeletonGrid = ({ count = 6 }) => (
  <div className="skeleton-grid">
    {Array.from({ length: count }).map((_, i) => (
      <SkeletonCard key={i} />
    ))}
  </div>
);

export const SkeletonAbout = () => (
  <div className="skeleton-about">
    <div className="skeleton-profile">
      <div className="skeleton skeleton-avatar"></div>
      <div className="skeleton-text-group">
        <div className="skeleton skeleton-title"></div>
        <div className="skeleton skeleton-text"></div>
        <div className="skeleton skeleton-text"></div>
      </div>
    </div>
    <div className="skeleton-experience">
      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="skeleton-job">
          <div className="skeleton skeleton-text"></div>
          <div className="skeleton skeleton-text short"></div>
        </div>
      ))}
    </div>
  </div>
);

export default SkeletonGrid;
