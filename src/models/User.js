import mongoose from "mongoose";
import bcrypt from "bcryptjs";



const userSchema = new mongoose.Schema({
     companyId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",   
        required: true,
    },
    username: {
        type: String,
        required: true, 

    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
    role: {
        type: String,
        default: 'user',
    },
    isActive: {
        type: Boolean,
        default: true,
    }, 
},
    {
    timestamps: true,
    collection : 'users',
    },
);

userSchema.pre("save", async function (next) {
  // Only hash if password is new or changed
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 10);
});

// Compare password method
userSchema.methods.comparePassword = async function (enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;