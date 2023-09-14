import { ChangeEventHandler } from 'react'
import questionStyles from './Question.module.css'

import {
  QUESTION_TYPE_MULTIPLE_OPTIONS,
  QUESTION_TYPE_TEXT,
} from '@/app/constant'

export default function QuestionForm({
  value,
  onChange,
}: {
  value: string
  onChange: ChangeEventHandler<HTMLSelectElement>
}) {
  return (
    <label className={questionStyles.questionType}>
      Question Type:
      <select value={value} onChange={onChange}>
        <option value={QUESTION_TYPE_TEXT.short}>Text (short)</option>
        <option value={QUESTION_TYPE_TEXT.long}>Text (long)</option>
        <option value={QUESTION_TYPE_MULTIPLE_OPTIONS.radio}>
          Radio button
        </option>
        <option value={QUESTION_TYPE_MULTIPLE_OPTIONS.checkbox}>
          Checkbox
        </option>
        <option value={QUESTION_TYPE_MULTIPLE_OPTIONS.pulldown}>
          Pulldown
        </option>
      </select>
    </label>
  )
}
