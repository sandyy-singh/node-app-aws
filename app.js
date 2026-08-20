import dotenv from "dotenv";
import connectDB from "./config/db.js";
import express from 'express'
import cookieParser from "cookie-parser";
import cors from "cors";



import dns from 'node:dns/promises';
dns.setServers(['8.8.8.8', '1.1.1.1']);

dotenv.config()

const app = express();

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true                  // cookies allow करने के लिए ज़रूरी
}));

app.use(cookieParser());
app.use(express.json());

app.post("/test", async (req, res) => {
    const { input } = req.body
   
    return res.status(200).json({ "test:": input })
})

app.get("/", (req, res) => {
    return res.json({ message: "hello from node-app-aws" })
})


const PORT = process.env.PORT || 5002;

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`server runnig onnn port ${PORT}`)
    })
}).catch((err) => {
    console.log(err)

})