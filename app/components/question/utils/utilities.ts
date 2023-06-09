import {
  faCircle,
  faSquare,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'

import { questionTypeMultipleOptions as qTypeMultiOptions } from '../question-type'

export const determineIcon = (
  questionType: string
): IconDefinition | undefined => {
  switch (questionType) {
    case qTypeMultiOptions.radio:
      return faCircle
    case qTypeMultiOptions.checkbox:
      return faSquare
    case qTypeMultiOptions.pulldown:
      return undefined
    default:
      // FIXME:
      return faCircle
  }
}
