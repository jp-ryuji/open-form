import React, { useState } from 'react'

import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './RequiredButton.module.css'

export default function RequiredButton() {
  const [isToggleOn, setIsToggleOn] = useState(false)

  const onClickHandler = () => {
    setIsToggleOn(!isToggleOn)
  }

  return (
    <FontAwesomeIcon
      onClick={onClickHandler}
      icon={isToggleOn ? faToggleOn : faToggleOff}
      className={styles.toggle_button}
    />
  )
}
