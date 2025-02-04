"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function RandomWordDisplay() {
  const [words, setWords] = useState<string[]>([])
  const [currentWord, setCurrentWord] = useState<string>("")
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetch("/api/words")
      .then((response) => response.json())
      .then((data) => {
        setWords(data.words)
        setIsLoading(false)
      })
      .catch((error) => {
        console.error("Error fetching words:", error)
        setIsLoading(false)
      })
  }, [])

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  const startCountdown = () => {
    setCountdown(3)
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(timer)
          setCurrentWord(getRandomWord())
          return null
        }
        return prev! - 1
      })
    }, 1000)
  }

  const handleClick = () => {
    setCurrentWord("")
    startCountdown()
  }

  if (isLoading) {
    return <div>Loading word list...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        {countdown === null && !currentWord && (
          <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button onClick={handleClick} className="bg-sky-500 hover:bg-sky-500 text-lg">
              Play
            </Button>
          </motion.div>
        )}
        {countdown !== null && (
          <motion.div
            key={`countdown-${countdown}`}
            initial={{ opacity: 0, scale: 0.75 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.75 }}
            transition={{ duration: 0.25 }}
            className="text-9xl font-bold"
          >
            {countdown}
          </motion.div>
        )}
        {currentWord && (
          <motion.div
            key="word"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-6xl font-bold mb-4">{currentWord}</h2>
            <Button onClick={handleClick} className="bg-sky-500 hover:bg-sky-500 text-lg">
              Next
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

