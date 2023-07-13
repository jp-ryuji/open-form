import styles from './Card.module.css'

function Card({ children, highlight }: { children: any; highlight?: boolean }) {
  return (
    <div className={[styles.card, highlight && styles.cardHighlight].join(' ')}>
      {children}
    </div>
  )
}

export default Card
