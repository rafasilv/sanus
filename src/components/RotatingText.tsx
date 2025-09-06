import { useState, useEffect, ReactNode } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface RotatingTextProps {
  text?: string
  y?: number
  className?: string
  children?: ReactNode
  delay?: number
  shouldAnimate?: boolean
}

export function RotatingText({ 
  text = "", 
  y = -50, 
  className = "",
  children,
  delay = 100,
  shouldAnimate = true
}: RotatingTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (!shouldAnimate) {
      setIsVisible(false)
      return
    }

    // Reset animation state
    setIsVisible(false)
    
    // Trigger animation after specified delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay, shouldAnimate])

  if (!shouldAnimate) {
    return (
      <div className={className}>
        {children || text}
      </div>
    )
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: y, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="inline-block"
          >
            {children || text}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
