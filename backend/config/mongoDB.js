import mongoose from "mongoose"

const connectDB = async () => {
    mongoose.connection.on("connected", () =>console.log("Databse connected"))
    await mongoose.connect(`${process.env.MONGO_URI}/music`)

}
export default connectDB