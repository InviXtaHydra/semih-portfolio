import { motion } from 'framer-motion'

// Quiet scroll reveal: short travel, plays once.
export default function Reveal({ children, delay = 0, y = 16, className, as = 'div', ...rest }) {
  const Tag = motion[as]
  return (
    <Tag
      className={className}
      {...rest}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </Tag>
  )
}
