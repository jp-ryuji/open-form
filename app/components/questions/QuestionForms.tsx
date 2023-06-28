'use client'

import QuestionForm from '../question/QuestionForm'
import { Card, CardBody } from '../ui/Card'
import { Question, createQuestion, useQuestionStore } from '@/app/store'
import { nanoid } from 'nanoid'
import { ActionsBar, ActionsBarContainer } from './ActionsBar'

export default function QuestionForms() {
  const questionStore = useQuestionStore()
  const questions = questionStore.questions

  const addQuestionFormHandler = (question?: Question) => {
    questionStore.addQuestion(question || createQuestion())
  }

  const deleteQuestionFormHandler = (index: number) => {
    questionStore.deleteQuestion(index)
  }

  const updateQuestionFormHandler = (index: number, question: Question) => {
    questionStore.updateQuestion(index, question)
  }

  const selectQuestionFormHandler = (question: Question) => {
    console.log('select', question)
    questionStore.selectQuestion(question)
  }

  return (
    <ActionsBarContainer>
      <div className="pb-32">
        {questions.length ? (
          questions.map((question, index) => (
            <QuestionForm
              key={question.id}
              question={question}
              selected={question.id === questionStore.selectedQuestion}
              onDuplicateQuestion={(duplicate) =>
                addQuestionFormHandler({ ...duplicate, id: nanoid() })
              }
              onDeleteQuestion={() => deleteQuestionFormHandler(index)}
              onUpdate={(question) =>
                updateQuestionFormHandler(index, question)
              }
              onSelect={() => {
                selectQuestionFormHandler(question)
              }}
            />
          ))
        ) : (
          <Card>
            <CardBody>No question.</CardBody>
          </Card>
        )}
      </div>
      <ActionsBar onAdd={addQuestionFormHandler} />
    </ActionsBarContainer>
  )
}
