import React from 'react'
import { IconDefinition } from '@fortawesome/free-solid-svg-icons'
import MultipleOptionsIconOrNum from './MultipleOptionsIconOrNum'
import styles from './AddOption.module.css'

export default function AddOption(props: {
  icon?: IconDefinition
  num: number
  onClick: () => void
}) {
  const onClickHandler = () => {
    props.onClick()
  }

  return (
    <label className="items-container mb-2 flex">
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
