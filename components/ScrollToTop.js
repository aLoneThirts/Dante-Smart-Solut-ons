// src/components/ScrollToTop.js
import { useState, useEffect } from 'react'
import { Button } from 'react-bootstrap'
import { FaArrowUp } from 'react-icons/fa'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) setVisible(true)
      else setVisible(false)
    }
    window.addEventListener('scroll', toggleVisibility)
    return () => window.removeEventListener('scroll', toggleVisibility)
  }, [])

  const scrollToTop = () =>
    window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <>
      {visible && (
        <Button
          onClick={scrollToTop}
          style={styles.button}
          aria-label="Scroll to top"
        >
          <FaArrowUp />
        </Button>
      )}
    </>
  )
}

const styles = {
  button: {
    position: 'fixed',
    right: '1.5rem',
    bottom: '1.5rem',
    borderRadius: '50%',
    width: '3rem',
    height: '3rem',
    padding: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'var(--primary)',
    color: 'var(--light)',
    boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
    border: 'none',
    zIndex: 1000,
  },
}
