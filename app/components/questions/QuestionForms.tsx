'use client'

import { nanoid } from 'nanoid'
import { useState } from 'react'

import FunctionBar from '../function-bar/FunctionBar'
import QuestionForm from '../question/QuestionForm'

const questionsInitialState = [{ key: nanoid() }]

export default function QuestionForms() {
  const [questions, setQuestions] = useState(questionsInitialState)

  const addQuestionFormHandler = () => {
    if (questions.length === 0) {
      setQuestions(questionsInitialState)
    } else {
      const newQuestion = { key: nanoid() }
      const newQuestions = [...questions, newQuestion]
      setQuestions(newQuestions)
    }
  }

  const deleteQuestionFormHandler = (key: string) => {
    const newQuestions = questions.filter((question) => question.key !== key)

    setQuestions(newQuestions)
  }

  return (
    <>
      {questions.map((question) => (
        <QuestionForm
          key={question.key}
          onDeleteQuestion={() => deleteQuestionFormHandler(question.key)}
        />
      ))}
      <FunctionBar onClick={addQuestionFormHandler} />
    </>
  )
}
