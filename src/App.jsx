import { useEffect, lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, MotionConfig } from 'motion/react'
import Layout from './Components/Layout'
import Home from './Pages/Home'

const OurStory = lazy(() => import('./Pages/OurStory'))
const Guestbook = lazy(() => import('./Pages/Guestbook'))
const WeddingParty = lazy(() => import('./Pages/WeddingParty'))
const OrderOfEvents = lazy(() => import('./Pages/OrderOfEvents'))
const RSVP = lazy(() => import('./Pages/RSVP'))
const NotFound = lazy(() => import('./Pages/NotFound'))

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function RouteFallback() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-[#2D4C3B]/20 border-t-[#2D4C3B] rounded-full animate-spin" aria-label="Loading" />
    </div>
  )
}

function AnimatedRoutes() {
  const location = useLocation()
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Suspense fallback={<RouteFallback />}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/guestbook" element={<Guestbook />} />
          <Route path="/wedding-party" element={<WeddingParty />} />
          <Route path="/order-of-events" element={<OrderOfEvents />} />
          <Route path="/rsvp" element={<RSVP />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
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
