import type { ElementType, ReactNode } from 'react'
import s from './Misregistered.module.css'

// Riso misregistration: a red plate printed slightly off from the ink plate.
export function Misregistered({
  as: Tag = 'span',
  className = '',
  children,
}: {
  as?: ElementType
  className?: string
  children: ReactNode
}) {
  return (
    <Tag className={`${s.wrap} ${className}`}>
      <span className={s.red} aria-hidden="true">{children}</span>
      <span className={s.ink}>{children}</span>
    </Tag>
  )
}
