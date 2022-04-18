const express = require("express");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const fs = require("fs/promises");
const {v4} = require("uuid");

const tempUpload = path.join(__dirname, "temp");

const multerConfig = multer.diskStorage({
    destination: tempUpload,
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage: multerConfig
});

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

const products = [];
// upload.array('photos', 12)
// const cpUpload = upload.fields([{ name: 'avatar', maxCount: 1 }, { name: 'gallery', maxCount: 8 }])
app.post("/api/products", upload.single("image"), async (req, res, next)=> {
    try {
        const id = v4();
        const {path: tempDir, originalname} = req.file;
        const [extension] = originalname.split(".").reverse();
        const filename = `${id}.${extension}`;
        const resultDir = path.join(__dirname, "public", "products", filename);
        await fs.rename(tempDir, resultDir);
        const image = path.join("products", filename);
        const newProduct = {
            _id: id,
            ...req.body,
            image
        };
        products.push(newProduct);
        res.status(201).json(newProduct);
    } catch (error) {
        const {path: tempDir} = req.file;
        await fs.unlink(tempDir);
    }
});

app.get("/api/products", (req, res)=> {
    res.json(products);
})

app.listen(3000);