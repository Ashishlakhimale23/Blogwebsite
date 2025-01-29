import mongoose from "mongoose";
const TagsSchema = new mongoose.Schema({
    title : {
        unique:true,
        type: String
    },
    blogs :[{
        type:mongoose.Types.ObjectId ,ref : "Blogs"
    }]
})
export const Tags = mongoose.model('Tags',TagsSchema)