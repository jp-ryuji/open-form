'use client'

import QuestionForm from '../question/QuestionForm'
import { Card, CardBody } from '../ui/Card'
import { Question, createQuestion, useQuestionStore } from '@/app/store'
import { nanoid } from 'nanoid'
import { ActionsBar, ActionsBarContainer } from './ActionsBar'
import { useEffect, useState } from 'react'
import { DragDropContext, DropResult, Droppable } from 'react-beautiful-dnd'
import Button from '../ui/Card/Button/Button'

export default function QuestionForms() {
  const questionStore = useQuestionStore()
  const questions = questionStore.questions
  const [actionBarTop, setActionsBarTop] = useState<number | undefined>(
    undefined
  )
  const [renderUI, setRenderUI] = useState(false)

  const addQuestionFormHandler = (question?: Question) => {
    const newQuestion = question || createQuestion()
    questionStore.addQuestion(newQuestion)
    selectQuestionFormHandler(newQuestion)
  }

  const deleteQuestionFormHandler = (index: number) => {
    questionStore.deleteQuestion(index)
  }

  const updateQuestionFormHandler = (index: number, question: Question) => {
    questionStore.updateQuestion(index, question)
  }

  const selectQuestionFormHandler = (question: Question) => {
    questionStore.selectQuestion(question)
    setActionsBarPosition(question)
  }

  const setActionsBarPosition = (question: Question) => {
    setTimeout(() => {
      const selectedEl = document.querySelector(
        `[data-question-id="${question.id}"]`
      )
      setActionsBarTop(
        (selectedEl?.getBoundingClientRect().y || 0) + window.scrollY
      )
    }, 100)
  }

  const onDragEnd = ({ destination, source }: DropResult) => {
    if (!destination) return
    questionStore.reorderQuestion(source.index, destination.index)
  }

  useEffect(() => {
    setRenderUI(true)
  }, [])

  return (
    renderUI && (
      <ActionsBarContainer>
        <div className="pb-32">
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) =>
                questions.length ? (
                  <div ref={provided.innerRef} {...provided.droppableProps}>
                    {questions.map((question, index) => (
                      <QuestionForm
                        index={index}
                        key={question.id}
                        question={question}
                        selected={
                          question.id === questionStore.selectedQuestion
                        }
                        onDuplicateQuestion={(duplicate) =>
                          addQuestionFormHandler({ ...duplicate, id: nanoid() })
                        }
                        onDeleteQuestion={() =>
                          deleteQuestionFormHandler(index)
                        }
                        onUpdate={(update) =>
                          updateQuestionFormHandler(index, update)
                        }
                        onSelect={(selected) => {
                          selectQuestionFormHandler(selected)
                        }}
                      />
                    ))}
                  </div>
                ) : (
                  <Card>
                    <CardBody>No question.</CardBody>
                  </Card>
                )
              }
            </Droppable>
          </DragDropContext>
          <div className="flex justify-end mt-6">
            <Button onClick={() => console.log({ questions })}>Submit</Button>
          </div>
        </div>
        <ActionsBar onAdd={addQuestionFormHandler} top={actionBarTop} />
      </ActionsBarContainer>
    )
  )
}
