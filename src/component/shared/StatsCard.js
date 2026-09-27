import { ChevronRight } from "lucide-react";
import "./StatsCard.css";

function StatsCard({
  title,
  value,
  icon: Icon,
  color = "blue",
  caption,
  onClick,
}) {
  return (
    <article className={`stats-card stats-card--${color}`}>
      <div className="stats-card-icon" aria-hidden="true">
        {Icon && <Icon size={34} strokeWidth={2.2} />}
      </div>
      <div className="stats-card-copy">
        <span className="stats-card-title">{title}</span>
        <strong className="stats-card-value">{value}</strong>
        {caption && <span className="stats-card-caption">{caption}</span>}
      </div>
      {onClick && (
        <button
          type="button"
          className="stats-card-action"
          aria-label={`View ${title}`}
          onClick={onClick}
        >
          <ChevronRight size={23} strokeWidth={2.5} aria-hidden="true" />
        </button>
      )}
    </article>
  );
}

export default StatsCard;