import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export function DuplicateWarning() {
  // TODO: Add a warning message with tooltip as Google form does
  return (
    <div className="text-red-500">
      <FontAwesomeIcon icon={faExclamationTriangle} />
    </div>
  )
}
