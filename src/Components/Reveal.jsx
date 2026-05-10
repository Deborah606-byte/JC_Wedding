import { motion } from 'motion/react'

const EASE = [0.22, 1, 0.36, 1]

export default function Reveal({
  children,
  delay = 0,
  duration = 0.8,
  y = 28,
  x = 0,
  once = true,
  className = '',
  as: Tag = 'div',
  margin = '-80px',
}) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      initial={{ opacity: 0, y, x }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once, margin }}
      transition={{ duration, delay, ease: EASE }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerGroup({
  children,
  className = '',
  stagger = 0.08,
  delayChildren = 0.1,
  once = true,
  margin = '-60px',
  as: Tag = 'div',
}) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren } },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}

export function StaggerItem({ children, y = 24, className = '', as: Tag = 'div' }) {
  const MotionTag = motion[Tag] || motion.div
  return (
    <MotionTag
      variants={{
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
      }}
      className={className}
    >
      {children}
    </MotionTag>
  )
}
