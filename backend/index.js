import express from "express"
import { connection } from "./connection.js" 
import router from "./routes/user.js"
import cors from "cors"
import { config } from "dotenv"
config()
const app = express()
app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())

connection(process.env.DBURL).then(()=>console.log("server connected"))
app.use("/user",router)
app.listen(8000,()=>console.log("server started"))
