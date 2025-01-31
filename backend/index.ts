import express from "express"
import { connection } from "./connection" 
import router from "./routes/user"
import cors from "cors"
import { config } from "dotenv"
config()
const app = express()

app.use(cors({
    origin: ['http://localhost:5173'], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, 
    optionsSuccessStatus: 200
}));
app.use(express.urlencoded({extended:false}))
app.use(express.json())

connection(process.env.DBURL as  string).then(()=>console.log("server connected"))
app.use("/user",router)
app.listen(8000,()=>console.log("server started"))
