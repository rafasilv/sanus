import { useState, useEffect } from "react"

interface TypingTextProps {
  text: string
  speed?: number
  delay?: number
  className?: string
}

export function TypingText({ text, speed = 100, delay = 0, className = "" }: TypingTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [, setCurrentIndex] = useState(0)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    // Reset when component mounts
    setDisplayedText("")
    setCurrentIndex(0)
    
    const startTyping = () => {
      const timer = setInterval(() => {
        setCurrentIndex(prev => {
          if (prev < text.length) {
            setDisplayedText(text.slice(0, prev + 1))
            return prev + 1
          } else {
            clearInterval(timer)
            return prev
          }
        })
      }, speed)

      return timer
    }

    const timer = setTimeout(() => {
      startTyping()
    }, delay)

    return () => {
      clearTimeout(timer)
    }
  }, [text, speed, delay])

  // Cursor blinking effect
  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev)
    }, 500)

    return () => clearInterval(cursorTimer)
  }, [])

  return (
    <span className={className}>
      {displayedText}
      {showCursor && <span>|</span>}
    </span>
  )
}
