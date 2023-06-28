import React from 'react'

import { faToggleOff, faToggleOn } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import styles from './RequiredCheckbox.module.css'

export default function RequiredCheckbox({
  value,
  onChange,
  className,
}: {
  className: string
  value: boolean
  onChange: (value: boolean) => void
}) {
  const onClickHandler = () => {
    onChange(!value)
  }

  return (
    <button
      onClick={onClickHandler}
      className={[className, 'flex', styles.toggle_button].join(' ')}
    >
      <span className="mr-2">Required</span>
      <FontAwesomeIcon icon={value ? faToggleOn : faToggleOff} />
    </button>
  )
}
