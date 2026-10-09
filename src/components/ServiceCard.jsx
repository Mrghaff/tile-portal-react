import styles from "./ServiceCard.module.css";
import Icon from "./Icon.jsx";

export default function ServiceCard({ icon, title, description, badge, action, featured, onClick }) {
  return (
    <button
      className={`${styles.card} ${featured ? styles.featured : ""}`}
      onClick={onClick}
      type="button"
    >
      <span className={styles.head}>
        <span className={styles.iconbox}><Icon name={icon} /></span>
        {badge && <span className={styles.badge}>{badge}</span>}
      </span>
      <h3>{title}</h3>
      <p>{description}</p>
      <span className={styles.bottom}>{action}<Icon name="arrow" /></span>
    </button>
  );
}
