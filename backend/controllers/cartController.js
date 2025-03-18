import userModel from "../models/userModel.js"

// add to user cart  
const addToCart = async (req, res) => {
   try {
      let userData = await userModel.findOne({_id:req.body.userId});
      let cartData = await userData.cartData;
      if (!cartData[req.body.itemId]) {
         cartData[req.body.itemId] = 1;
      }
      else {
         cartData[req.body.itemId] += 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Added To Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }
}

// remove food from user cart
const removeFromCart = async (req, res) => {
   try {
      let userData = await userModel.findById(req.body.userId);
      let cartData = await userData.cartData;
      if (cartData[req.body.itemId] > 0) {
         cartData[req.body.itemId] -= 1;
      }
      await userModel.findByIdAndUpdate(req.body.userId, {cartData});
      res.json({ success: true, message: "Removed From Cart" });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Error" })
   }

}

// get user cart
const getCart = async (req, res) => {
   try {
      const { userId } = req.body;

      // Validate ObjectId format
      if (!mongoose.Types.ObjectId.isValid(userId)) {
         return res.status(400).json({ success: false, message: "Invalid user ID" });
      }

      const userData = await userModel.findById(userId);

      // Check if user exists
      if (!userData) {
         return res.status(404).json({ success: false, message: "User not found" });
      }

      // Initialize cartData if it doesn't exist
      const cartData = userData.cartData || {};
      res.json({ success: true, cartData });
   } catch (error) {
      console.log(error);
      res.status(500).json({ success: false, message: "Server error" });
   }
};



export { addToCart, removeFromCart, getCart }