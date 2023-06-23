'use client'

import React from 'react'
import {
  faX,
  faClone,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequiredButton from './RequiredButton'
import styles from './BottomNavigationBar.module.css'

export default function BottomNavigationBar(props: {
  onDeleteQuestion: () => void
}) {
  return (
    <div className={styles.bottomNavigationBar}>
      <button className={styles.bottomNavigationBarButton}>
        <FontAwesomeIcon icon={faClone} />
      </button>
      <button className={styles.bottomNavigationBarButton}>
        <FontAwesomeIcon
          icon={faX}
          className="ml-2"
          onClick={props.onDeleteQuestion}
        />
      </button>
      <span className={styles.bottomNavigationBarSeparator}></span>
      <RequiredButton className={styles.bottomNavigationBarButton} />
      <button className={styles.bottomNavigationBarButton}>
        <FontAwesomeIcon icon={faEllipsisVertical} />
      </button>
    </div>
  )
}
