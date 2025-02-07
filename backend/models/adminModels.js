import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    identityID: { type: String, unique: true },  // Removed `required: true`
    password: { type: String, required: true },
    infoData: { type: Object, default: {} }
}, { minimize: false });

// Pre-validate middleware to generate identityID
adminSchema.pre("validate", async function (next) {
    if (!this.identityID) {
        // Count total admins to generate serial number
        const count = await mongoose.model("admin").countDocuments() + 1;
        const formattedName = this.name.replace(/\s+/g, "-").toLowerCase(); // Convert name to lowercase with dashes
        this.identityID = `${formattedName}-MY-R-admin-${count}`;
    }
    next();
});

const adminModel = mongoose.models.admin || mongoose.model("admin", adminSchema);
export default adminModel;