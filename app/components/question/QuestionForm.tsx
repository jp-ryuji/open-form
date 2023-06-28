'use client'

import React, { useEffect, useState } from 'react'

import { Card, CardBody } from '../ui/Card'
import AddQuestionOption from './AddQuestionOption'
import QuestionFormBottomBar from './QuestionFormBottomBar'
import Question from './Question'
import QuestionTypeSelect from './QuestionTypeSelect'
import {
  questionTypeMultipleOptions as qTypeMultiOptions,
  questionTypeText as qTypeText,
} from './question-type'
import styles from './QuestionForm.module.css'
import questionStyles from './Question.module.css'

import QuestionOption from './QuestionOption'
import { determineIcon } from './utils/utilities'
import { Question as QuestionType } from '@/app/store'

export default function QuestionForm(props: {
  question: QuestionType
  onDeleteQuestion: () => void
  onDuplicateQuestion: (question: QuestionType) => void
  onUpdate: (question: QuestionType) => void
}) {
  const isQTypeTextSelected = Object.values(qTypeText).includes(
    props.question.questionType
  )
  const isQTypeMultOptionsSelected = Object.values(qTypeMultiOptions).includes(
    props.question.questionType
  )
  const [questionOptions, setQuestionOptions] = useState(() =>
    props.question.questionOptions.map((option, index) => ({
      key: index,
      value: option,
    }))
  )

  useEffect(() => {
    props.onUpdate({
      ...props.question,
      questionOptions: questionOptions.map((q) => q.value),
    })
  }, [props, questionOptions])

  const changeQuestionTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    props.onUpdate({
      ...props.question,
      questionType: event.target.value as QuestionType['questionType'],
    })
  }

  const addQuestionOptionHandler = () => {
    const lastOptionKey = questionOptions[questionOptions.length - 1]?.key || 0
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

  const updateQuestion = (question: Partial<QuestionType>) => {
    props.onUpdate({ ...props.question, ...question })
  }

  const showAnswers = () => {
    if (isQTypeTextSelected) {
      return (
        <p className={styles.render_question_text}>
          Text ({props.question.questionType})
        </p>
      )
    }

    if (isQTypeMultOptionsSelected) {
      const icon = determineIcon(props.question.questionType)

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
          <AddQuestionOption
            icon={icon}
            num={questionOptions.length + 1}
            onClick={addQuestionOptionHandler}
          />
        </div>
      )
    }

    return null
  }

  return (
    <Card>
      <CardBody>
        <Question />
        <QuestionTypeSelect
          value={props.question.questionType}
          onChange={changeQuestionTypeHandler}
        />
        <div>{showAnswers()}</div>
      </CardBody>
      <div className={questionStyles.questionActions}>
        <QuestionFormBottomBar
          required={props.question.required}
          onDeleteQuestion={() => props.onDeleteQuestion()}
          onDuplicateQuestion={() => props.onDuplicateQuestion(props.question)}
          onRequired={(required) => updateQuestion({ required })}
        />
      </div>
    </Card>
  )
}
