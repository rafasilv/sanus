import { motion } from "framer-motion"

interface LogoAnimatedProps {
  className?: string
}

export function LogoAnimated({ className = "" }: LogoAnimatedProps) {
  return (
    <div className={`relative ${className}`}>
      {/* Gotas de tinta dourada */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(16)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background: `radial-gradient(circle, rgba(239, 203, 121, 0.8) 0%, rgba(212, 175, 55, 0.4) 100%)`,
              filter: "blur(1px)"
            }}
            initial={{ 
              opacity: 0, 
              scale: 0,
              y: Math.random() * 200 - 100,
              x: Math.random() * 200 - 100
            }}
            animate={{ 
              opacity: [0, 0.8, 0],
              scale: [0, 1.2, 0],
              y: 0,
              x: 0
            }}
            transition={{ 
              duration: 2,
              delay: i * 0.05,
              ease: "easeOut"
            }}
          />
        ))}
      </div>

      {/* Logo com efeito de dissolução */}
      <motion.div
        className="relative z-10"
        initial={{ 
          opacity: 0,
          filter: "blur(15px) saturate(0) brightness(0.3)"
        }}
        animate={{ 
          opacity: 1,
          filter: "blur(0px) saturate(1) brightness(1)"
        }}
        transition={{ 
          duration: 1.5,
          ease: "easeOut",
          delay: 0.6
        }}
      >
        <img 
          src="/logo-sanus.svg" 
          alt="Sanus" 
          className="w-full h-full drop-shadow-2xl"
        />
      </motion.div>

      {/* Ondas de dissolução */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239, 203, 121, 0.2) 0%, transparent 50%)",
          filter: "blur(20px)"
        }}
        initial={{ 
          scale: 0,
          opacity: 0
        }}
        animate={{ 
          scale: [0, 1.5, 1],
          opacity: [0, 0.6, 0.2]
        }}
        transition={{ 
          duration: 2,
          ease: "easeOut",
          delay: 0.3
        }}
      />

      {/* Brilho final */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(239, 203, 121, 0.15) 0%, transparent 70%)",
          filter: "blur(40px)"
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ 
          duration: 1,
          delay: 2.0
        }}
      />
    </div>
  )
}
