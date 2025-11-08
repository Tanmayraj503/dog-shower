import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import RandomDogShower from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import Layout from './components/layout.jsx'
import Home from './components/home.jsx'
import Cat from './components/cat.jsx'
import Dog from './components/dog.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='dog' element={<Dog />} />
      <Route path='cat' element={<Cat />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)