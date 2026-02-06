import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from '../pages/home'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import PageNotFound from '../pages/pageNotFound'
import ContactUs from '../components/sections/contactUs'
import Testimonials from '../components/sections/Testimonial'
import RepairsProvider from '../context/PhonesContext'
import SelectModel from '../pages/ModelPage'
import SelectParts from '../pages/PartsPage'
import PricingPage from '../pages/PricingPage'
import AboutRepairStore from '../pages/AboutPage'
import AppointmentSuccess from '../pages/AppointmentConfirm'
import AppointmentPage from '../pages/AppointmentBook'

const Shell = () => (
  <div style={{ minHeight: '100vh', margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main className="container``">
      <Outlet />
    </main>
    <Testimonials />
    <ContactUs />
    <Footer />
  </div>
)

function ShellWrapper() {
  return <Shell />
}

export default function AppRouter() {
  return (
    <BrowserRouter>
      <RepairsProvider>
        <Routes>
          <Route element={<ShellWrapper />}>
            <Route path='/' element={<Home />} />
            <Route path='*' element={<PageNotFound />} />
            <Route path="/repairs" element={<SelectModel />} />
            <Route path="/repairs/:modelId" element={<SelectParts />} />
            <Route path="/prices" element={<PricingPage />} />
            <Route path="/aboutus" element={<AboutRepairStore />} />
            <Route path="/appointment" element={<AppointmentPage />} />
            <Route path="/appointment-success" element={<AppointmentSuccess />} />
          </Route>
        </Routes>
      </RepairsProvider>
    </BrowserRouter>
  )
}
