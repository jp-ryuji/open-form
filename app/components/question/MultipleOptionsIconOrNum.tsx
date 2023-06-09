import React from 'react'
import { IconDefinition } from '@fortawesome/free-regular-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

/* Returns a div with an icon or a number, depending on whether the icon prop is passed in. */
export default function MultipleOptionsIconOrNum(props: {
  icon?: IconDefinition
  num: number
}) {
  const { icon, num } = props

  return (
    <div className="mr-2 flex items-center">
      {icon && <FontAwesomeIcon icon={icon} />}
      {!icon && <span>{num + '.'}</span>}
    </div>
  )
}
