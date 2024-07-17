import express from "express";
import addProd, {
    addCartItems,
    allProd,
    fetchUser, getCartItems, login,
    removeCartItems, removeProd, signup} from "../controllers/users.js";

const router = express.Router();

//routes for product management
router.post("/addProduct", addProd);
router.delete("/removeProduct", removeProd);
router.get("/allProducts", allProd);

//routes for user management
router.post("/signup", signup);
router.post("/login", login);

//routes for cartItems management
router.post("/addtocart", fetchUser, addCartItems);
router.post("/removecart", fetchUser, removeCartItems);
router.post("/getcart", fetchUser, getCartItems);

export default router;