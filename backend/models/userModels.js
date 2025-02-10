import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    identityID: { type: String, unique: true },  // Removed `required: true`
    password: { type: String, required: true },
    cartData: { type: Object, default: {} }
}, { minimize: false });

// Pre-validate middleware to generate identityID
userSchema.pre("validate", async function (next) {
    if (!this.identityID) {
        // Count total users to generate serial number
        const count = await mongoose.model("user").countDocuments() + 1;
        const formattedName = this.name.replace(/\s+/g, "-").toLowerCase(); // Convert name to lowercase with dashes
        this.identityID = `${formattedName}-MY-R-user-${count}`;
    }
    next();
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
