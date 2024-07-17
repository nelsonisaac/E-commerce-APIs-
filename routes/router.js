import express from "express";
import addProd, { allProd, login, removeProd, signup } from "../controllers/users.js";

const router = express.Router();

//routes for product management
router.post("/addProduct", addProd);
router.delete("/removeProduct", removeProd);
router.get("/allProducts", allProd);

//routes for user management
router.post("/signup", signup);
router.post("/login", login);

export default router;