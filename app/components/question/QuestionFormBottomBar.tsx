'use client'

import React from 'react'
import {
  faX,
  faClone,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequiredCheckbox from './RequiredCheckbox'
import styles from './QuestionFormBottomBar.module.css'
import { Tooltip } from '../ui/Tooltip'

export default function BottomNavigationBar(props: {
  onDeleteQuestion: () => void
  onDuplicateQuestion: () => void
  onRequired: (required: boolean) => void
  required: boolean
}) {
  return (
    <div className={styles.bottomNavigationBar}>
      <Tooltip label="Duplicate">
        <button
          onClick={props.onDuplicateQuestion}
          className={styles.bottomNavigationBarButton}
        >
          <FontAwesomeIcon icon={faClone} />
        </button>
      </Tooltip>
      <Tooltip label="Delete">
        <button
          className={styles.bottomNavigationBarButton}
          onClick={props.onDeleteQuestion}
        >
          <FontAwesomeIcon icon={faX} />
        </button>
      </Tooltip>
      <span className={styles.bottomNavigationBarSeparator}></span>
      <RequiredCheckbox
        value={props.required}
        className={styles.bottomNavigationBarButton}
        onChange={props.onRequired}
      />
      <button className={styles.bottomNavigationBarButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
    </div>
  )
}
