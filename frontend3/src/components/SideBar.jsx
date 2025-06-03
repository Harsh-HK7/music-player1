import logo from '../assets/logo.png'
import logo4 from '../assets/logo4.png'
import {IoMdHome} from 'react-icons/io'
import {BsGrid1X2} from 'react-icons/bs'
import {CiHeart} from 'react-icons/ci'
import { CiHeadphones } from 'react-icons/ci'




const SideBar = () => {
  return (
    <div className="bg-gradient-to-l from-black to-gray-700 ">
      <div className="mt-3 py-2 px-2">
        <img src={logo} className='mt-1 w-44 hidden md:block cursor-pointer'/>
        <img src={logo4} className='mt-1 w-14 block md:hidden cursor-pointer'/>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        <div className="bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <IoMdHome className='text-white text-2xl' />
          <p className='text-white text-lg font-semibold hidden md:block'>Home</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <BsGrid1X2 className='text-white text-2xl' />
          <p className='text-white text-lg font-semibold hidden md:block'>Browser</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <CiHeart className='text-white text-2xl' />
          <p className='text-white text-lg font-semibold hidden md:block'>Favorite</p>
        </div>
      </div>
      <div className="flex flex-row items-center justify-center gap-5 py-2 px-2">
        <div className="hover:bg-red-500 w-full flex flex-row items-center justify-center gap-2 py-2 px-2 rounded-lg cursor-pointer">
          <CiHeadphones className='text-white text-2xl' />
          <p className='text-white text-lg font-semibold hidden md:block'>Library</p>
        </div>
      </div>
      
        
    </div>
  )
}

export default SideBar