import styles from './Card.module.css'

function CardBody(props: { children: any }) {
  return <div className={styles.cardBody}>{props.children}</div>
}

export default CardBody
