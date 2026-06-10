import Navbar from "./components/Navbar"
import Footer from  "./components/Footer"
import { Outlet, useLocation } from "react-router-dom"

function App() {
  const location = useLocation();
  const isHome = location.pathname === "/";

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
     <Navbar/>
     <main className={`flex-grow ${isHome ? "" : "pt-28"}`}>
       <Outlet/>
     </main>
     <Footer/>
    </div>
  )
}

export default App
