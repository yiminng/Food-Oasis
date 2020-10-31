import { useState, useEffect } from 'react'
import theme from 'theme'

const useMobile = () => {
  const [isMobile, setMobile] = useState(false);

  useEffect(() => {
    setMobile(window.innerWidth < theme.breakpoints.values.sm)
  }, [])

  return isMobile;
}

export default useMobile;
