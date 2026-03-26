import { motion } from "framer-motion"
import { useEffect, useState } from "react"

export default function SplashScreen({ onFinish }) {
  const [show, setShow] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(false)
      onFinish()
    }, 3500) // tempo total da splash

    return () => clearTimeout(timer)
  }, [])

  if (!show) return null

  return (
    <div className="splash-container">
      
      {/* coração */}
      <motion.div
        className="heart"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />

      {/* textos */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        Matheus e Kariny
      </motion.h1>

      <motion.h3
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        "Uma vez que já não são dois, mas um só, que ninguém separe o que Deus uniu."
      </motion.h3>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
      >
        Mateus 19:6
      </motion.p>

      {/* fade out */}
      <motion.div
        className="fade"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
      />

    </div>
  )
}