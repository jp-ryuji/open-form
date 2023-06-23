'use client'

import React, { useState } from 'react'

import Card from '../ui/Card'
import AddOption from './AddOption'
import ButtomNavigationBar from './BottomNavigationBar'
import Question from './Question'
import {
  questionTypeMultipleOptions as qTypeMultiOptions,
  questionTypeText as qTypeText,
} from './question-type'
import styles from './QuestionForm.module.css'
import questionStyles from './Question.module.css'
import cardStyles from '../ui/Card.module.css'

import QuestionOption from './QuestionOption'
import { determineIcon } from './utils/utilities'

export default function QuestionForm(props: {
  onDeleteQuestion: () => void
  id: string
}) {
  const [selectedQuestionType, setSelectedQuestionType] = useState(
    qTypeText.short
  )
  const [questionOptions, setQuestionOptions] = useState([
    {
      key: 1,
      value: 'Option 1',
    },
  ])

  const isQTypeTextSelected =
    Object.values(qTypeText).includes(selectedQuestionType)
  const isQTypeMultOptionsSelected =
    Object.values(qTypeMultiOptions).includes(selectedQuestionType)

  const changeQuestionTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedQuestionType(event.target.value)
  }

  const addQuestionOptionHandler = () => {
    const lastOptionKey = questionOptions[questionOptions.length - 1].key
    const newKey = lastOptionKey + 1
    const newValue = 'Option ' + newKey
    const newOption = { key: newKey, value: newValue }
    const options = [...questionOptions, newOption]

    setQuestionOptions(options)
  }

  const updateQuestionOptionHandler = (key: number, value: string) => {
    const newQuestionOptions = questionOptions.map((option) => {
      if (option.key === key) {
        return { key, value }
      }
      return option
    })
    setQuestionOptions(newQuestionOptions)
  }

  const deleteQuestionOptionHandler = (key: number) => {
    const newQuestionOptions = questionOptions.filter(
      (option) => option.key !== key
    )
    setQuestionOptions(newQuestionOptions)
  }

  // FIXME: Consider renaming this function
  const showQuestionText = () => {
    return isQTypeTextSelected && renderQuestionText()
  }
  const renderQuestionText = () => {
    return (
      <p className={styles.render_question_text}>
        Text ({selectedQuestionType})
      </p>
    )
  }

  const showQuestionOptions = () => {
    return isQTypeMultOptionsSelected && renderQuestionOptions()
  }

  const renderQuestionOptions = () => {
    const icon = determineIcon(selectedQuestionType)

    return (
      <div className="mx-2 flex flex-col">
        {questionOptions.map((option, index) => {
          return (
            <QuestionOption
              key={option.key}
              icon={icon}
              num={index + 1}
              defaultValue={option.value}
              otherQuestionOptions={questionOptions.filter(
                (op) => op.key !== option.key
              )}
              onUpdate={(value) =>
                updateQuestionOptionHandler(option.key, value)
              }
              onDelete={() => deleteQuestionOptionHandler(option.key)}
            />
          )
        })}
        <AddOption
          icon={icon}
          num={questionOptions.length + 1}
          onClick={addQuestionOptionHandler}
        />
      </div>
    )
  }

  return (
    <Card>
      <div className={cardStyles.cardBody}>
        <div>
          <Question />
          <label className={questionStyles.questionType}>
            Question Type:
            <select
              value={selectedQuestionType}
              onChange={changeQuestionTypeHandler}
            >
              <option value={qTypeText.short}>Text (short)</option>
              <option value={qTypeText.long}>Text (long)</option>
              <option value={qTypeMultiOptions.radio}>Radio button</option>
              <option value={qTypeMultiOptions.checkbox}>Checkbox</option>
              <option value={qTypeMultiOptions.pulldown}>Pulldown</option>
            </select>
          </label>
        </div>
        <div>
          {showQuestionText()}
          {showQuestionOptions()}
        </div>
      </div>
      <div className={questionStyles.questionActions}>
        <ButtomNavigationBar
          onDeleteQuestion={() => props.onDeleteQuestion()}
        />
      </div>
    </Card>
  )
}
