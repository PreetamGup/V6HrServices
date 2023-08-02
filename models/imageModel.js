const mongoose = require("mongoose")

const ImageSchema= mongoose.Schema({
    image:{
        type:String,
        required: true
    }
})

const ImageModel= mongoose.model("Images", ImageSchema);

module.exports=ImageModel;