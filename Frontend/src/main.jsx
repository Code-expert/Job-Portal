import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'


const appRouter = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
        {
            path: "/",
            element: <Home />,
        },
        {
            path: "/login",
            element: (
                    <Login />               
            ),
        },
        {
            path: "/signup",
            element: (
                    <Signup />
            ),
        },
      ],
    }
      ])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <RouterProvider router={appRouter}/>
   <ToastContainer/>
  </StrictMode>,
)
