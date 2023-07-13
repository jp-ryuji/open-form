'use client'

import React from 'react'
import styles from './Question.module.css'
import { Question } from '@/app/store'

/* Returns an input field for a question */
export default function QuestionInput({
  question,
  onChange,
}: {
  question: string
  onChange: (question: string) => void
}) {
  const changeQuestionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    onChange(event.target.value)
  }

  return (
    <input
      type="text"
      placeholder="Question?"
      value={question}
      onChange={changeQuestionHandler}
      className={styles.question}
    />
  )
}
