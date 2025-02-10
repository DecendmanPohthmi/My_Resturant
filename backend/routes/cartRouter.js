import express from 'express'
import { addToCart, removeFromCart, getCart } from '../controllers/cartController.js'
import authetication from '../middleware/auth.js';

const cartRouter= express.Router();

cartRouter.post("/add",authetication,addToCart);
cartRouter.post("/remove",authetication,removeFromCart);
cartRouter.post("/get",authetication,getCart);

export default cartRouter;