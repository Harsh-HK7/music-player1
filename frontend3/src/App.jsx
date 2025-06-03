import { Routes , Route, useLocation } from "react-router-dom"
import SideBarAdmin from "./components/SideBar_Admin"
import SideBar from "./components/SideBar"
import Header from "./components/Header"
import Display from "./components/Display"
import UploadSong from "./pages/UploadSong"
import ListSong from "./pages/ListSong"
import { ToastContainer } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';  

const App = () => {
    const location = useLocation()
    const adminPaths = ["/add-music","/list-songs"]
    const isAdminPage = adminPaths.includes(location.pathname)

return (
  
  <div className="flex relative h-screen">
    {isAdminPage ? (
     <>
       <SideBarAdmin />
     <div className="flex-1 overflow-y-scroll">
      <Routes>
        <Route path ="/add-music" element={<UploadSong/>} />
        <Route path ="/list-songs" element={<ListSong/>} />
      
      </Routes>
      
     </div>  
      </>
    ): (
      <>
          <ToastContainer />

      <SideBar />
      <div className="flex-1 bg-black overflow-y-scroll">
        <Header/>
        
      </div>
      <div className="flex-2 bg-black hidden lg:block p-2">
        <Display />
      </div>
      </>
    )}
    </div>
 
  )
}

export default App
