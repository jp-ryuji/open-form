import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './AddQuestionButton.module.css'

export default function FunctionBar(props: { onClick: () => void }) {
  const clickHandler = () => {
    props.onClick()
  }

  return (
    <button
      type="button"
      onClick={clickHandler}
      title="Add new question"
      className={styles.addQuestionButton}
    >
      <FontAwesomeIcon icon={faPlus} />
    </button>
  )
}
