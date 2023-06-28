import React from 'react'

import { IconDefinition } from '@fortawesome/free-solid-svg-icons'

import styles from './AddQuestionOption.module.css'
import questionStyles from './Question.module.css'
import MultipleOptionsIconOrNum from './MultipleOptionsIconOrNum'

export default function AddQuestionOption(props: {
  icon?: IconDefinition
  num: number
  onClick: () => void
}) {
  const onClickHandler = () => {
    props.onClick()
  }

  return (
    <label className={questionStyles.questionOption}>
      <MultipleOptionsIconOrNum icon={props.icon} num={props.num} />
      <a className={styles.add_option_link} onClick={onClickHandler}>
        Add an option
      </a>

      {/* TODO: Add other option */}
      {/* &nbsp;or&nbsp;
          <a className="add-option-link" onClick={handleAddOtherQuestionOption}>
            Add &ldquo;other&rdquo;
          </a>
          */}
    </label>
  )
}
