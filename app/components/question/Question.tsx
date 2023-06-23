'use client'

import React, { useState } from 'react'
import styles from './Question.module.css'

/* Returns an input field for a question */
export default function Question() {
  const [question, setQuestion] = useState('')

  const changeQuestionHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setQuestion(event.target.value)
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
