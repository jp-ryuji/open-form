import styles from './Tooltip.module.css'

export default function Tooltip({
  children,
  label,
}: {
  children: React.ReactNode
  label: string
}) {
  return (
    <div className={styles.tooltip}>
      <div className={styles.tooltipTrigger}>{children}</div>
      <div className={styles.tooltipContent}>{label}</div>
    </div>
  )
}
