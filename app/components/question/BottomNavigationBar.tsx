'use client'

import React from 'react'
import {
  faX,
  faClone,
  faEllipsisVertical,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RequiredButton from './RequiredButton'

export default function BottomNavigationBar(props: {
  onDeleteQuestion: () => void
}) {
  return (
    <label className="mt-6 flex">
      <div className="flex items-center">
        <FontAwesomeIcon icon={faClone} className="ml-2" />
        <FontAwesomeIcon
          icon={faX}
          className="ml-2"
          onClick={props.onDeleteQuestion}
        />
        {/* FIXME: Add a gray vertical bar */}
        <span className="ml-2">Required</span>
        <RequiredButton />
        <FontAwesomeIcon icon={faEllipsisVertical} className="ml-2" />
      </div>
    </label>
  )
}
