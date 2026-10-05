import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Check, Copy } from 'lucide-react'

export default function CopyButton({ value, label }) {
  const [copied, setCopied] = useState(false)

  async function copy() {
    try {
      await navigator.clipboard.writeText(value)
    } catch {
      // Fallback for browsers without async clipboard access
      const el = document.createElement('textarea')
      el.value = value
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      el.remove()
    }
    setCopied(true)
    setTimeout(() => setCopied(false), 1800)
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="relative inline-flex h-9 items-center gap-1.5 rounded-full border border-rule px-3 text-sm text-muted transition-colors hover:border-paper/30 hover:text-paper"
    >
      <AnimatePresence mode="wait" initial={false}>
        {copied ? (
          <motion.span key="done" className="inline-flex items-center gap-1.5 text-sap"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
            <Check size={15} /> Copied
          </motion.span>
        ) : (
          <motion.span key="idle" className="inline-flex items-center gap-1.5"
            initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.15 }}>
            <Copy size={15} /> Copy
          </motion.span>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">{copied ? `${label} copied to clipboard` : ''}</span>
    </button>
  )
}
