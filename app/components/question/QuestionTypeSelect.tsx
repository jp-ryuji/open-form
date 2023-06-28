import { ChangeEventHandler } from 'react';
import questionStyles from './Question.module.css'

import {
  questionTypeMultipleOptions as qTypeMultiOptions,
  questionTypeText as qTypeText,
} from './question-type'

export default function QuestionForm({value, onChange}: {
  value: string;
  onChange: ChangeEventHandler<HTMLSelectElement>
}) {
  return (
    <label className={questionStyles.questionType}>
      Question Type:
      <select value={value} onChange={onChange}>
        <option value={qTypeText.short}>Text (short)</option>
        <option value={qTypeText.long}>Text (long)</option>
        <option value={qTypeMultiOptions.radio}>Radio button</option>
        <option value={qTypeMultiOptions.checkbox}>Checkbox</option>
        <option value={qTypeMultiOptions.pulldown}>Pulldown</option>
      </select>
    </label>
  )
}
