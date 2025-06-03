import { assets } from "../assets/assets"
import { useContext } from "react"
import { PlayerContext } from "../context/PlayerContext"
import { useNavigate } from "react-router-dom"
import {toast} from "react-toastify"
import axios from "axios"
import { useState } from "react"

const UploadSong = () => {
  const { backendUrl } = useContext(PlayerContext)
  const navigate = useNavigate()

  const [image, setImage]= useState(false)
  const [song, setSong]= useState(false)
  const [songData, setSongData]= useState({
    title: "",
    artist: "",
  })
  const onSubmitHandler = async (e) =>{
    e.preventDefault()
  
  try{
      const formData = new FormData()
      formData.append('title', songData.title)
      formData.append('artist', songData.artist)
      formData.append('music', song)
      formData.append('image', image)

      const {data} = await axios.post(`${backendUrl}/api/admin/add-music`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        }
      })

      if(data.success){
        toast.success(data.message)
        navigate("/list-songs")
        setSongData({
          title: "",
          artist: "",
        })
        setImage(false)
        setSong(false)
      }
      else{
        toast.error(data.message)
      }

  }catch(error){
    console.log(error)
    toast.error("Error occured , cannot upload song")
   }
  }
  const onChangeHandler = async (e) => {
      const{name , value} = e.target
      setSongData({...songData, [name]: value})
   }

  return (
    <div className="h-screen flex items-center ">
      <form onSubmit={onSubmitHandler} className="flex flex-row max-h-screen gap-8 text-gray-600 w-full max-w-xl mx-auto p-4 sm:p-6 md:p-8 shadow-lg rounded-xl shadow-black ">
        <div className="flex flex-row flex-wrap gap-6 items-center">
          <div className="flex flex-col  gap-2 items-center">
            <p className="text-sm md:text-base"> Upload Songs</p>
            <input
              type="file"
              id="song"
              onChange={(e)=> setSong(e.target.files[0])}
              accept="audio/*"
              hidden 
            />
            <label htmlFor="song">
              { <img src={song ? assets.upload_added : assets.upload_song} className="w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain " alt="" /> }
              
           </label>
          </div>
          <div className="flex flex-col  gap-2 items-center">
              <p className="text-sm md:text-base"> Upload Image</p>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={(e)=> setImage(e.target.files[0])}
              hidden
              />
            <label htmlFor="image">
            { <img src={image ? URL.createObjectURL(image) : assets.upload_area} className="w-24 h-24 md:w-32 md:h-32 cursor-pointer object-contain " alt="" /> }
              
              </label>
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="title"className="text-sm md:text-base">Song Name</label>
            <input
              type="text"
              id="title"
              onChange={onChangeHandler}
              value={songData.title}
              name="title"
              className="bg-transparen w-full p-2.5 rounded-lg outline-none"
              placeholder="song name"
              required
              />
          </div>
          <div className="flex flex-col gap-2 w-full">
            <label htmlFor="artist"className="text-sm md:text-base">Artist Name</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={songData.artist}
              onChange={onChangeHandler}
              className="bg-transparent w-full p-2.5 rounded-lg outline-none"
              placeholder="artist name"
              required
              />
          </div>
          <button type="submit"
           className="text-sm md:text-base bg-black text-white py-2 px-40 md:py-3 md:px-60 rounded-lg shadow-lg hover:bg-gray-800 self-start">
          Add
          </button>
        </div>
      </form>
    </div>
  )
}

export default UploadSong
