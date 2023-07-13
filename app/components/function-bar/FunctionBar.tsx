import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './FunctionBar.module.css'

export default function FunctionBar(props: { onClick: () => void }) {
  const clickHandler = () => {
    props.onClick()
  }

  return (
    <div className="mt-6 flex justify-end">
      <button
        type="button"
        onClick={clickHandler}
        title="Add new question"
        className={styles.addQuestion}
      >
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
