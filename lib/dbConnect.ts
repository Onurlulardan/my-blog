import mongoose from "mongoose";

const URI = process.env.MONGODB_URI as string;


const dbConnect = async () => {
    
    try {
        const connection = await mongoose.connect(URI);
        return connection
    } catch (error) {
        console.log("db connection fail: ", error);
    }

}

export default dbConnect;