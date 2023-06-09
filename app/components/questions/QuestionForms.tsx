'use client'

import { useState } from 'react'

import FunctionBar from '../function-bar/FunctionBar'
import QuestionForm from '../question/QuestionForm'

export default function QuestionForms() {
  const [numForms, setNumForms] = useState(1)

  const addFormHandler = () => {
    setNumForms(numForms + 1)
  }

  return (
    <>
      {Array.from({ length: numForms }).map((_, index) => (
        <QuestionForm key={index} />
      ))}
      <FunctionBar onClick={addFormHandler} />
    </>
  )
}
