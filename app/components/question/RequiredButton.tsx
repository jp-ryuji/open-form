import React, { useState } from 'react'

import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './RequiredButton.module.css'

export default function RequiredButton(props: { className: string }) {
  const [isToggleOn, setIsToggleOn] = useState(false)

  const onClickHandler = () => {
    setIsToggleOn(!isToggleOn)
  }

  return (
    <button
      onClick={onClickHandler}
      className={[props.className, 'flex', styles.toggle_button].join(' ')}
    >
      <span className="mr-2">Required</span>
      <FontAwesomeIcon icon={isToggleOn ? faToggleOn : faToggleOff} />
    </button>
  )
}
