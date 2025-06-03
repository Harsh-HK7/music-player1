import adminModel from "../models/adminModel.js"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import path from "path"
import musicModel from "../models/musicModel.js"

const register = async (req, res) => {
     try {
        const {username,email,password} = req.body   
    
        if(!username || !email || !password){
             return res.status(400).json({successs:false, message:"All fields are required"})
        }
        const existingUser = await adminModel.findOne({email})
        
        if(existingUser){
            return res.status(409).json({success:false, message:"User already exists"})
        }


        const salt = await bcrypt.genSalt(10)

        const hashedPassword = await bcrypt.hash(password, salt)
        const newUser = new adminModel({
            username,
            email,
            password:hashedPassword
        })
        await newUser.save()

        const token = jwt.sign({id: newUser._id}, process.env.JWT_SECRET, {expiresIn: "7d"})

        res.cookie(token ,{
            httpOnly: false,
            secure:false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userResponse ={
            id : newUser._id,
            username : newUser.username,
            email : newUser.email,
        }

        res.status(201).json({success:true, message:"Registered successfully", user: userResponse, token})

    }
      catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Intevnal server error"})
     }
}

const login = async (req, res) => {

    try{
            const {email, password} = req.body
            
            if(!email || !password){
                return res.status(400).json({successs:false, message:"All fields are required"})
            }

            const user = await adminModel.findOne({email})

            if(!user){
                return res.status(409).json({success:false,message:"user not found"})
            }

            const isPasswordCorrect = await bcrypt.compare(password , user.password)
            if(!isPasswordCorrect){
                return res.status(401).json({success:false,message:"invalid credentials"})
            }

             const token = jwt.sign({id: user._id}, process.env.JWT_SECRET, { expiresIn : "7d"})

        res.cookie(token ,{
            httpOnly: false,
            secure:false,
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000
        })

        const userResponse ={
            id : user._id,
            username : user.username,
            email : user.email,
        }

        res.status(201).json({success:true, message:"Login successfull", user: userResponse, token})


    }
      catch (error) {
        console.log(error)
        res.status(500).json({success:false, message:"Intevnal server error"})
     }


}

const uploadMusic = async (req, res) => {
    try{

        const{title,artist} = req.body
        if(!title || !artist){
            return res.status(400).json({successs:false, message:"All fields are required"})
        }

        const musicFile = req.files.music?.[0]
        const imageFile = req.files.image?.[0]
        if(!musicFile ){
            return res.status(400).json({successs:false, message:"No music file found"})
        }
          if(!imageFile ){
            return res.status(400).json({successs:false, message:"Image file is required"})
        }
        const allowedExtensions = ['.mp3','.wav','.jpg','.jpeg','.png','.webp'];
        const musicExt = path.extname(musicFile.originalname).toLowerCase()
        const imageExt = path.extname(imageFile.originalname).toLowerCase()

        if (!allowedExtensions.includes(musicExt)|| !allowedExtensions.includes(imageExt)) {
            return res.status(400).json({successs:false, message:"Invalid file type. Only audio(.mp3 & .wav)  and image(.jpg , .jpeg & .png) files are allowed."})
        }            
            
            const filePath = musicFile.path.replace(/\\/g, '/');
            const imageFilePath = imageFile.path.replace(/\\/g, '/');


            const music = new musicModel({
                title,
                artist,
                filePath,
                imageFilePath
            })
            await music.save()

            res.status(201).json({success:true, message:"Music uploaded successfully", music})
    }
   catch(error) {
        console.log(error)
        res.status(500).json({success:false, message:"Intevnal server error"})
     }
}

const getMusic = async (req, res)=>{
    try{
        const musics = await musicModel.find()
        if(!musics){
            return res.json({success:false, message:"No music found"})
        } 

        res.json({success:true,musics})
    }
     catch(error) {
        console.log(error)
        res.status(500).json({success:false, message:"Intevnal server error"})
     }
}

const deleteMusic = async (req , res)=>{
    try{
        const {id} = req.params;
        const music = await musicModel.findByIdAndDelete(id)

        if(!music){
            return res.json({success:false, message:"No music found"})
        } 

        res.status(200).json({success:true, message:"Music deleted successfully", music})
    }
     catch(error) {
        console.log(error)
        res.status(500).json({success:false, message:"Intevnal server error"})
     }
      
}
export {register, login , uploadMusic , getMusic , deleteMusic}
//