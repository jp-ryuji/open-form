'use client'

import { useState } from 'react'

import FunctionBar from '../function-bar/FunctionBar'
import QuestionForm from '../question/QuestionForm'

const questionsInitialState = [{ key: 1 }]

export default function QuestionForms() {
  const [questions, setQuestions] = useState(questionsInitialState)

  const addQuestionFormHandler = () => {
    if (questions.length === 0) {
      setQuestions(questionsInitialState)
    } else {
      const lastKey = questions[questions.length - 1].key
      const newKey = lastKey + 1
      const newQuestion = { key: newKey }
      const newQuestions = [...questions, newQuestion]
      setQuestions(newQuestions)
    }
  }

  const deleteQuestionFormHandler = (key: number) => {
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
