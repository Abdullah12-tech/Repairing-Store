import React from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'
import Home from '../pages/home'
import Header from '../layout/Header'
import Footer from '../layout/Footer'
import PageNotFound from '../pages/pageNotFound'

const Shell = () => (
  <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Header />
    <main className="container``">
      <Outlet />
    </main>
    <Footer />
  </div>
)

function ShellWrapper(){
  return <Shell />
}

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<ShellWrapper/>}>
          <Route path='/' element={<Home/>} />
          <Route path='*' element={<PageNotFound/>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
