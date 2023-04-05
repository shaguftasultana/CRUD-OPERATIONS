import mongoose from "mongoose";
const  MONGO_URI="mongodb+srv://shaguftasultanapixako:NpmKWqoJYjLC7l71@cluster0.zjwwayy.mongodb.net/?retryWrites=true&w=majority"
mongoose.connect(MONGO_URI).then(()=> console.log('connected'));
