import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import OurStory from './Pages/OurStory'
import Guestbook from './Pages/Guestbook'
import WeddingParty from './Pages/WeddingParty'
import OrderOfEvents from './pages/OrderOfEvents'
import RSVP from './Pages/RSVP'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/our-story" element={<OurStory />} />
        <Route path="/guestbook" element={<Guestbook />} />
        <Route path="/wedding-party" element={<WeddingParty />} />
        <Route path="/order-of-events" element={<OrderOfEvents />} />
        <Route path="/rsvp" element={<RSVP />} />
      </Routes>
    </BrowserRouter>
  )
}
