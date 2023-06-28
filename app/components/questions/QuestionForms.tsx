'use client'

import AddQuestionButton from './AddQuestionButton'
import QuestionForm from '../question/QuestionForm'
import { Card, CardBody } from '../ui/Card'
import { Question, createQuestion, useQuestionStore } from '@/app/store'
import { nanoid } from 'nanoid'

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

  return (
    <>
      {questions.length ? (
        questions.map((question, index) => (
          <QuestionForm
            key={question.id}
            question={question}
            onDuplicateQuestion={(duplicate) =>
              addQuestionFormHandler({ ...duplicate, id: nanoid() })
            }
            onDeleteQuestion={() => deleteQuestionFormHandler(index)}
            onUpdate={(question) => updateQuestionFormHandler(index, question)}
          />
        ))
      ) : (
        <Card>
          <CardBody>No question.</CardBody>
        </Card>
      )}
      <div className="mt-6 flex justify-end">
        <AddQuestionButton onClick={addQuestionFormHandler} />
      </div>
    </>
  )
}
