import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import Home from './pages/Home.jsx'
import Signup from './components/Signup.jsx'
import Login from './components/Login.jsx'
import {createBrowserRouter, RouterProvider } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import {Provider}  from "react-redux"
import store from "./store/store.js"
import Jobs from './pages/Jobs.jsx'
import Browse from './pages/Browse.jsx'
import Profile from './pages/Profile.jsx'

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
        {
          path: "/jobs",
          element: (
                  <Jobs/>
          ),
      },
      {
        path: "/browse",
        element: (
                <Browse/>
        ),
    },
    {
      path: "/profile",
      element: (
              <Profile/>
      ),
  },
      ],
    }
      ])

createRoot(document.getElementById('root')).render(
  
  <StrictMode>
    <Provider  store={store}>
    <RouterProvider router={appRouter}/>

    </Provider>
   <ToastContainer/>
  </StrictMode>,
)
