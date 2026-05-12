import { useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Layout from './Components/Layout'
import Home from './Pages/Home'
import OurStory from './Pages/OurStory'
import Guestbook from './Pages/Guestbook'
import WeddingParty from './Pages/WeddingParty'
import OrderOfEvents from './Pages/OrderOfEvents'
import RSVP from './Pages/RSVP'
import NotFound from './Pages/NotFound'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/wedding-party" element={<WeddingParty />} />
        <Route path="/order-of-events" element={<OrderOfEvents />} />
        <Route path="/rsvp" element={<RSVP />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  )
}

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <BrowserRouter>
        <ScrollToTop />
        <Layout>
          <AnimatedRoutes />
        </Layout>
      </BrowserRouter>
    </MotionConfig>
  )
}
