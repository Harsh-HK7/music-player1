import { useContext } from "react"
import {PlayerContext} from "../context/PlayerContext"
import {FaHeart,FaEllipsisH} from "react-icons/fa"
import banner from "../assets/banner_cate.png"


const Display = () => {
  
    const {songsData, backendUrl} = useContext(PlayerContext)
  
  return (
    <div className="w-96 h-auto bg-gradient-to-r from-black to-gray-700 text-white rounded-xl px-3 mr-3 overflow-y-scroll">
      <div className="flex flex-row justify-between items-center mt-3 py-2 px-2"> 
        <h1 className="font-bold text-md">Top Streams</h1>
        <div className="flex flex-row items-center bg-gray-400 px-1 py-1 rounded-lg space-x-2">
          <p className="bg-red-500 text-white rounded-lg px-2 py-2">Local</p>
          <p className="text-white px-2 py-1 ">Global</p>
        </div>
      </div>

      <div className="mt-3 overflow-y-scroll">
        {songsData.map((song, index) => (
            <div
              key={song._id}
              className="flex flex-row items-center justify-between py-2 px-2 hover:bg-gray-800 rounded-lg cursor-pointer"
            >    
              <div className="flex flex-row items-center space-x-3">
                <img
                  src={`${backendUrl}/${song.imageFilePath}`}
                  alt={song.title}
                  className="w-10 h-10 rounded-lg object-cover"
                />
                <div>
                  <p className="font-semibold">{song.title}</p>
                  <p className="text-sm text-gray-400">{song.artist}</p>
                </div>
              </div>
              <div className="flex flex-row items-center space-x-3">
                <FaHeart className="text-grey-400 hover:text-red-500 cursor-pointer" />
                <FaEllipsisH className="text-grey-400 cursor-pointer "/>
               </div> 
            </div>
        )).slice(0, 5)}

          <div className="mt-3">
            <div className="flex justify-between mr-2 mb-2">
                <h1 className="text-lg text-white font-medium">Categories</h1>
                <p className="text-red-500 cursor-pointer font-medium hover:text-white text-sm">See All</p>
            </div>
            <div className="w-96 overflow-hidden mr-2">
              <img src={banner} />
            </div>
          </div>

      </div>
    </div>
  )
}

export default Display