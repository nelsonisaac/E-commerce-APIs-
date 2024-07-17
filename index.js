import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import cors from "cors";
import dotenv from "dotenv";
// import addProd, { allProd, removeProd } from "./controllers/users.js";
import allroutes from "./routes/router.js";
import { fileURLToPath } from "url";

const app = express();
const port = 4000;

// Need to import meta.url manually as we are using type:"module" instead of commonjs
// Only then we can use for file storage
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.listen(port, (error) => {
    if (!error)
        console.log(`listening on ${port}`);
    else {
        console.log("error" + error);
    }
})

app.use(express.json());
app.use(cors());
dotenv.config();

/* DATABASE CONNECTION WITH MONGODB*/
mongoose.connect(process.env.MONGO_URL);


/*API CREATION */
app.get("/", (req, res) => {
    res.send("express is running")
})


/* MULTER IMAGE STORAGE MODULE */

const storage = multer.diskStorage({
    destination: "./upload/images",
    filename: (req, file, cb) => {
        return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({ storage: storage })

//creating upload endpoint which access the path to stored images folder
app.use('/images', express.static(path.join(__dirname,'upload/images')));

app.post("/upload", upload.single('product'), (req, res) => {
    res.json({
        success: 1,
        image_url: `http://localhost:${port}/images/${req.file.filename}`
    })
})

/* ROUTES */
// app.use("/addProduct",addProd );
// app.use("/removeProduct",removeProd);
// app.use("/allProducts", allProd);

app.use("/api",allroutes);