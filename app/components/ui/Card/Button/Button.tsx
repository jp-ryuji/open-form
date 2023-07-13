import styles from './Button.module.css'

export default function Button({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode
  className?: string
  onClick: () => void
}) {
  return (
    <button className={[styles.button, className].join(' ')} onClick={onClick}>
      {children}
    </button>
  )
}
