import { useState } from 'react';
import NewReleases from './NewReleases';

const Header = () => {
  
  const [currentSongImage, setCurrentSongImage] = useState(null);
  const [currentSongTitle, setCurrentSongTitle] = useState(null);
  const [currentSongArtist, setCurrentSongArtist] = useState(null);

  
  return (
    <>
    <header
     className="relative bg-cover bg-no-repeat bg-top h-96 flex items-center justify-center text-white"
     style={{
      backgroundImage: `url(${currentSongImage || 'https://i.ytimg.com/vi/WHkjnScrPIw/maxresdefault.jpg'})`
     }} 
    >
    <div className="absolute inset-0 bg-black bg-opacity-40"></div>

     {currentSongTitle && currentSongArtist  && (
       <div className='absolute text-white text-center hidden xl:block'>
          <p className='text-3xl md:text-8xl font-bold mb-2 drop-shadow-lg'>
            {currentSongTitle}
          </p>
          <p className='text-xl md:text-2xl text-grey-300 font-medium drop-shadow-lg'>
            {currentSongArtist}
          </p>
       </div>
     )}

     </header>

      <NewReleases
      setCurrentSongImage={setCurrentSongImage}
      setCurrentSongTitle={setCurrentSongTitle}
      setCurrentSongArtist={setCurrentSongArtist}
     
     />
     </>
  )
}

export default Header