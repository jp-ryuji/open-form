'use client'

import React, { useState } from 'react'

import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { faX } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { DuplicateWarning } from './DuplicateWarning'
import MultipleOptionsIconOrNum from './MultipleOptionsIconOrNum'
import styles from './Question.module.css'

export default function QuestionOption({
  editable,
  ...props
}: {
  icon?: IconDefinition
  num: number
  defaultValue: string
  otherQuestionOptions: any[]
  editable: boolean
  onUpdate: (value: string) => void
  onDelete: () => void
}) {
  const [duplicate, setDuplicate] = useState(false)
  const hasMultipleOptions = props.otherQuestionOptions.length > 0

  const changeQuestionOptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const hasDuplicate = props.otherQuestionOptions
      .map((option) => option.value)
      .some((option) => option === event.target.value)

    setDuplicate(hasDuplicate)
  }

  const updateQuestionOptionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    props.onUpdate(event.target.value)
  }

  const showDuplicateWarning = () => {
    return duplicate && <DuplicateWarning />
  }

  const showDeleteIcon = () => {
    return (
      hasMultipleOptions && (
        <button className={[styles.questionOptionButton].join(' ')}>
          <FontAwesomeIcon
            icon={faX}
            className="ml-2 cursor-pointer"
            onClick={props.onDelete}
          />
        </button>
      )
    )
  }

  return (
    <label className={styles.questionOption}>
      <MultipleOptionsIconOrNum icon={props.icon} num={props.num} />
      <input
        type="text"
        aria-label="Radio Button Option"
        defaultValue={props.defaultValue}
        onChange={changeQuestionOptionHandler}
        onBlur={updateQuestionOptionHandler}
        className="mr-auto"
      />
      {editable && showDuplicateWarning()}
      {editable && showDeleteIcon()}
    </label>
  )
}
