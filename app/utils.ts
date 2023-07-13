import {
  faCircle,
  faSquare,
  IconDefinition,
} from '@fortawesome/free-regular-svg-icons'

import {
  QUESTION_TYPE_MULTIPLE_OPTIONS,
  QUESTION_TYPE_TEXT,
} from '@/app/constant'
import { Question } from './store'

export const determineIcon = (
  questionType: string
): IconDefinition | undefined => {
  switch (questionType) {
    case QUESTION_TYPE_MULTIPLE_OPTIONS.radio:
      return faCircle
    case QUESTION_TYPE_MULTIPLE_OPTIONS.checkbox:
      return faSquare
    case QUESTION_TYPE_MULTIPLE_OPTIONS.pulldown:
      return undefined
    default:
      // FIXME:
      return faCircle
  }
}

export const isMultiOptionsQuestion = (question: Question) =>
  Object.values(QUESTION_TYPE_MULTIPLE_OPTIONS).includes(question.questionType)

export const isTextQuestion = (question: Question) =>
  Object.values(QUESTION_TYPE_TEXT).includes(question.questionType)
