import { useState, useEffect } from 'react'
import theme from 'theme'

const useMobile = () => {
  const [isMobile, setMobile] = useState(false);
  const resize = () => {
    const isSmall = window.innerWidth < theme.breakpoints.values.sm
    if (isSmall !== isMobile)
      setMobile(isSmall)
  }

  useEffect(() => {
    resize()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, [resize]);

  return isMobile;
}

export default useMobile;
