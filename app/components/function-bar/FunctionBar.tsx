import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function FunctionBar(props: { onClick: () => void }) {
  const clickHandler = () => {
    props.onClick()
  }

  return (
    <div className="flex justify-end">
      <button type="button" onClick={clickHandler} title="Add new question">
        <FontAwesomeIcon icon={faPlus} />
      </button>
    </div>
  )
}
