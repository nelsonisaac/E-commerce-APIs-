import Product, { Users } from "../models/productModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


/* METHOD TO SAVE A PRODUCT */
const addProd = async (req, res) => {
    try {
        // Here e are trying to avoid sending id from the postman or from the front end by ourself
        // So we first find if there is any product in DB, if so we get it and store the id in an array
        // and now we get the array[0] id and increment it by 1 and assign it to the newProduct id
        let allProducts = await Product.find({});
        let id;
        if (allProducts.length > 0) {
            let lastProduct_array = allProducts.slice(-1);
            let lastProduct = lastProduct_array[0];
            id = lastProduct.id + 1;
        } else {
            id = 1;
        }

        //getting data from user input and destructuring
        const { name, image, category, new_price, old_price, date, available } = req.body;

        //assigning the destructured data to the product model
        const newProduct = new Product({ id: id, name, image, category, new_price, old_price, date, available });

        const savedProduct = await newProduct.save();
        res.status(200).json({
            success: true,
            savedProduct
        });
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
}

/**METHOD TO DELETE PRODUCT */

export const removeProd = async (req, res) => {
    const removedProd = await Product.findOneAndDelete({ id: req.body.id });
    console.log("removed");
    res.status(200).json({
        success: true,
        removeProd
    });
}

/**METHOD TO GET ALL PRODUCTS */

export const allProd = async (req, res) => {
    let allProducts = await Product.find({})
    console.log(allProducts);
    res.send(allProducts);
}


/**METHOD TO REGISTER A USER FOR THE WEBSITE */
export const signup = async (req, res) => {

    let check = await Users.findOne({ email: req.body.email });

    if (check) {
        return res.status(400).json({
            success: false,
            errors: "existing user found"
        })
    }

    // TO STORE THE MAX NUMBER OF CART ITEMS
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i] = 0;
    }

    const { username, email, password, cartData } = req.body;

    let saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new Users({
        name: username,
        email: email,
        password: hashedPassword,
        cartData: cart
    })
    await user.save();//saving user in the DB
    const secret_key = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ id: user._id }, secret_key);
    res.status(201).json({ success:true,token, user });
}


/**METHOD TO LOGIN A USER FOR THE WEBSITE */
export const login = async (req, res) => {
    try {
        const checkUser = await Users.findOne({ email: req.body.email });

        if (!checkUser) {
            return res.status(400).json({ msg: "User not found" });
        }
        const passwordMatch = bcrypt.compare(req.body.password, checkUser.password);
        if (!passwordMatch) {
            return res.status(400).json({ msg: "Invalid password" });
        }

        const secret_key = process.env.JWT_SECRET_KEY;
        console.log(secret_key);
        const token = jwt.sign({ id: checkUser._id }, secret_key);
        res.status(200).json({ success:"true",token, checkUser });

    } catch (err) {
        res.status(400).json({ msg: err.message });
    }
}

export default addProd;