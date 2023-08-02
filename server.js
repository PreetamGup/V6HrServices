const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const dotenv = require('dotenv')
const Images = require("./models/imageModel")
require('colors')
const connectDb = require('./config/config')

//dotenv config
dotenv.config();

//db config
connectDb();



const app= express();

//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'));


app.get('/api/image', async (req, res) => {
    const { page } = req.query;
    const limit = 5; // Number of image per page
    const currentPage = Number(page) || 1;
  
    try {
      const totalImages = await Images.countDocuments();
      const totalPages = Math.ceil(totalImages / limit);
      const image = await Images.find()
        .skip((currentPage - 1) * limit)
        .limit(limit);
  
      res.json({
        image,
        totalPages,
      });
    } catch (error) {
      console.error('Error fetching images', error);
      res.status(500).json({ error: 'Server error' });
    }
  });

app.post("/add", async(req, res)=>{
    const image= req.body.image;
    try {
        
        const newImage= new Images({image});

        await newImage.save()
        res.send("Image added")

    } catch (error) {
        console.log(error)
    }

    
})



//port
const PORT=process.env.PORT || 8080

//listen
app.listen(PORT, ()=>{
    console.log(`Server Running on ${PORT}`.bgCyan.white);
})