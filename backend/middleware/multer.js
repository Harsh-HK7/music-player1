import multer from 'multer'
import path from 'path'
import mongoose from 'mongoose'

// Use memory storage for Vercel compatibility
const storage = multer.memoryStorage()

const fileFilter = (req , file, cb) => {
    const allowedExtensions = ['.mp3','.wav','.jpg','.jpeg','.png','.webp'];
    const ext = path.extname(file.originalname).toLocaleLowerCase()
    const isMimeTypeValid = file.mimetype.startsWith('audio/') || file.mimetype.startsWith('image/')
    const isExtensionValid = allowedExtensions.includes(ext)

    if(isMimeTypeValid && isExtensionValid){
        cb(null, true)
    }else{
        cb(new Error('Invalid file type. Only audio(.mp3 & .wav)  and image(.jpg , .jpeg & .png) files are allowed.'))
    }
}

const upload = multer({
    storage,
    fileFilter
})

export default upload

mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});