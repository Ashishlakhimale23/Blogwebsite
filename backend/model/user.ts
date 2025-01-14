import mongoose from "mongoose";

const user = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      unique: true,
    },
    pfplink: {
      type: String,
      default:
        "https://play-lh.googleusercontent.com/ki_oNQS0vtmA2eah8qbnjEhQ_ZP_f6llQ5CkNhTqvVfxRV6wtQaAxQDmq2CkjHFbeUA=w526-h296-rw",
    },
    about: {
      type: String,
      default: "",
    },
    
    techstack: {
      type: [String],
    },
   
      twitter: {
        type: String,
        default: "",
      },
      github: {
        type: String,
        default: "",
      },
      
    draft: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    blogs: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
bookmarks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Blog",
      },
    ],
    
  },
  {
    timestamps: {
      createdAt: "joinedOn",
    },
  }
);
 const User = mongoose.model("User",user)
export default User
