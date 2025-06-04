import { createContext, useEffect, useState } from "react"
import axios from "axios"

export const PlayerContext = createContext()

const backendUrl = import.meta.env.VITE_BACKEND_URL || "http://localhost:3000"

const PlayerContextProvider = ({ children }) => {
    
const [songsData, setSongsData] = useState([])

const fetchSongs = async () => {
  try {
    const { data } = await axios.get(`${backendUrl}/api/admin/get-music`)
    setSongsData(data.musics)
  } catch (error) {
    console.error(error)
  }
}
useEffect(() => {
  fetchSongs()
}, [])

const values = {
  backendUrl,
  songsData,
  fetchSongs
}


  return (
    <PlayerContext.Provider value={values}>
        {children}
        </PlayerContext.Provider>
  )
}
export default PlayerContextProvider;
