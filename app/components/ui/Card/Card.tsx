import styles from './Card.module.css'

function Card(props: { children: any }) {
  return <div className={styles.card}>{props.children}</div>
}

export default Card
