'use client'

import React, { useEffect, useState } from 'react'

import { Card, CardBody } from '../ui/Card'
import AddQuestionOption from './AddQuestionOption'
import QuestionFormBottomBar from './QuestionFormBottomBar'
import QuestionInput from './QuestionInput'
import QuestionTypeSelect from './QuestionTypeSelect'
import { faGripHorizontal } from '@fortawesome/free-solid-svg-icons'
import styles from './QuestionForm.module.css'
import questionStyles from './Question.module.css'

import QuestionOption from './QuestionOption'
import {
  determineIcon,
  isMultiOptionsQuestion,
  isTextQuestion,
} from '@/app/utils'
import { Question as QuestionType } from '@/app/store'
import { Draggable } from 'react-beautiful-dnd'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export default function QuestionForm({
  question,
  onDeleteQuestion,
  onDuplicateQuestion,
  onUpdate,
  onSelect,
  selected,
  index,
}: {
  question: QuestionType
  onDeleteQuestion: () => void
  onDuplicateQuestion: (question: QuestionType) => void
  onUpdate: (question: QuestionType) => void
  onSelect: (question: QuestionType, el: HTMLElement) => void
  selected: boolean
  index: number
}) {
  const [questionOptions, setQuestionOptions] = useState(() =>
    question.questionOptions.map((option, index) => ({
      key: index,
      value: option,
    }))
  )

  useEffect(() => {
    onUpdate({
      ...question,
      questionOptions: questionOptions.map((q) => q.value),
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [questionOptions])

  const changeQuestionTypeHandler = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    onUpdate({
      ...question,
      questionType: event.target.value as QuestionType['questionType'],
    })
  }

  const addQuestionOptionHandler = () => {
    const lastOptionKey = questionOptions.length
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

  const updateQuestion = (update: Partial<QuestionType>) => {
    onUpdate({ ...question, ...update })
  }

  const showAnswers = (selected: boolean) => {
    if (isTextQuestion(question)) {
      return (
        <p className={styles.render_question_text}>
          Text ({question.questionType})
        </p>
      )
    }

    if (isMultiOptionsQuestion(question)) {
      const icon = determineIcon(question.questionType)

      return (
        <div className="mx-2 flex flex-col">
          {questionOptions.map((option, index) => {
            return (
              <QuestionOption
                key={option.key}
                icon={icon}
                num={index + 1}
                defaultValue={option.value}
                editable={selected}
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
          {selected && (
            <AddQuestionOption
              icon={icon}
              num={questionOptions.length + 1}
              onClick={addQuestionOptionHandler}
            />
          )}
        </div>
      )
    }

    return null
  }

  return (
    <Draggable key={question.id} index={index} draggableId={question.id}>
      {(provided, snapshot) => (
        <div
          className={[
            selected ? 'selected' : '',
            'mb-4',
            questionStyles.questionForm,
          ].join(' ')}
          onClick={(e) => selected || onSelect(question, e.currentTarget)}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card highlight={selected}>
            <div
              className={[
                questionStyles.questionDragTrigger,
                selected || 'hidden',
              ].join(' ')}
            >
              <FontAwesomeIcon icon={faGripHorizontal} />
            </div>
            <CardBody>
              <div>
                <QuestionInput
                  question={question.question}
                  onChange={(update) =>
                    onUpdate({ ...question, question: update })
                  }
                />
                {selected && (
                  <QuestionTypeSelect
                    value={question.questionType}
                    onChange={changeQuestionTypeHandler}
                  />
                )}
              </div>
              <div>{showAnswers(selected)}</div>
            </CardBody>
            {selected && (
              <div className={questionStyles.questionActions}>
                <QuestionFormBottomBar
                  required={question.required}
                  onDeleteQuestion={() => onDeleteQuestion()}
                  onDuplicateQuestion={() => onDuplicateQuestion(question)}
                  onRequired={(required) => updateQuestion({ required })}
                />
              </div>
            )}
          </Card>
        </div>
      )}
    </Draggable>
  )
}
