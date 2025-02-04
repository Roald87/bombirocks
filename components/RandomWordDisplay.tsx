"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

export default function RandomWordDisplay() {
  const [words, setWords] = useState<string[]>([])
  const [images, setImages] = useState<string[]>([])
  const [currentWord, setCurrentWord] = useState<string>("")
  const [currentImage, setCurrentImage] = useState<string | null>(null)
  const [imageSequence, setImageSequence] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [countdown, setCountdown] = useState<number | null>(null)
  const [isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    Promise.all([
      fetch("/api/words").then(response => response.json()),
      fetch("/api/images").then(response => response.json())
    ]).then(([wordsData, imagesData]) => {
      setWords(wordsData.words)
      setImages(imagesData.images)
      setIsLoading(false)
    }).catch((error) => {
      console.error("Error fetching data:", error)
      setIsLoading(false)
    })
  }, [])

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
  }

  const getRandomImages = (count: number) => {
    const randomImages = []
    for (let i = 0; i < count; i++) {
      const randomIndex = Math.floor(Math.random() * images.length)
      randomImages.push(images[randomIndex])
    }
    return randomImages
  }

  const startImageSequence = () => {
    const images = getRandomImages(3)
    setImageSequence(images)
    let index = 0
    
    // Set countdown together with first image
    const timer = setInterval(() => {
      if (index < images.length) {
        setCurrentImage(images[index])
        setCountdown(3 - index)
        index++
      } else {
        clearInterval(timer)
        setCurrentImage(null)
        setCountdown(null)
        setCurrentWord(getRandomWord())
        setIsTransitioning(false)
      }
    }, 1000)
  }

  const handleClick = () => {
    setCurrentWord("")
    setCurrentImage(null)
    setCountdown(null)  // Reset countdown before starting sequence
    setIsTransitioning(true)
    // Use setTimeout to prevent the first "3" from showing
    setTimeout(startImageSequence, 0)
  }

  if (isLoading) {
    return <div>Loading word list...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <AnimatePresence mode="wait">
        {!currentImage && !currentWord && !isTransitioning && (
          <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <Button onClick={handleClick} className="bg-sky-500 hover:bg-sky-500 text-lg">
              Play
            </Button>
          </motion.div>
        )}
        <div className="flex flex-col items-center gap-8">
          {currentImage && (
            <motion.div
              key={currentImage}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.25 }}
              className="w-64 h-64"
            >
              <img src={currentImage} alt="Random" className="w-full h-full object-cover rounded-lg" />
            </motion.div>
          )}
          {countdown && (
            <motion.div
              key={`countdown-${countdown}`}
              initial={{ opacity: 0, scale: 0.75 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.75 }}
              transition={{ duration: 0.25 }}
            >
              <h2 className="text-9xl font-bold">{countdown}</h2>
            </motion.div>
          )}
        </div>
        {currentWord && (
          <motion.div
            key="word"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="text-center"
          >
            <h2 className="text-9xl font-bold mb-4">{currentWord}</h2>
            <Button onClick={handleClick} className="bg-sky-500 hover:bg-sky-500 text-lg">
              Next
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}




