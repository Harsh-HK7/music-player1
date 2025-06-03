import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'  
import connectDB from './config/mongoDB.js'
import adminRouter from './routes/adminRoutes.js'
import path from 'path'

dotenv.config()
connectDB()

const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
}))
console.log("Serving static files from:", path.join(path.resolve(), 'uploads'));

app.use('/uploads', express.static(path.join(path.resolve(), 'uploads')))

app.use('/api/admin', adminRouter)

app.listen(PORT, () => {
    console.log(`Server connected to port ${PORT}`)
})
// 