import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'

const App = () => {
  const [photos, setPhotos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showSlideshow, setShowSlideshow] = useState(false);
  const [photoIndex, setPhotoIndex]= useState();
  const [totalPage, setTotalPage]= useState();



  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`/api/image?page=${currentPage}`);
    
      setPhotos(response.data.image);
      setTotalPage(response.data.totalPages)
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };



  useEffect(() => {
    fetchPhotos();
  }, [currentPage]);




  return (
    <div className='appContainer'>
      <h1>Photo Listing with Pagination and SlideShow</h1>
      <div className='photoGallery'>
        {
          photos?.map((photo, index)=><img src={photo.image} alt='' key={photo._id} className='imagesLogo' onClick={()=> { setShowSlideshow(!showSlideshow) ; setPhotoIndex(index)}} />)
        }
      </div>
      <div className='pages'>
        {
          Array.from({length:totalPage},(_, index)=>(<button key={index+1} onClick={()=> setCurrentPage(index+1)}>{index+1}</button>))
        }
      </div>
        
        {showSlideshow && <SlideShow photoIndex={photoIndex} setPhotoIndex={setPhotoIndex} photos={photos} setShowSlideshow={setShowSlideshow} totalPage={totalPage}/>}

    </div>
  );
};

export default App;



const SlideShow = ({photoIndex, setPhotoIndex, photos, setShowSlideshow, totalPage}) => {

  const[prevBtn, setprevBtn]=useState(false);
  const[nextBtn, setnextBtn]=useState(false);

function handleImageIndex(idx, direction){

  if(idx >=0  && idx<totalPage){
    if(direction==="prev"){
    
      setprevBtn(false)
      setnextBtn(false)
      setPhotoIndex(idx)
    }else{
      console.log("next", idx)
      setnextBtn(false)
      setprevBtn(false)
      setPhotoIndex(idx)
    }
  }
 
  if(idx<=0){
    setprevBtn(true)
    setnextBtn(false);
  }
  if(idx>=totalPage){
    setnextBtn(true)
    setprevBtn(false)
  }
  
}


  return (
    <div className='slideshowContainer'>
      <div className='slideshowBox'>
        <button onClick={()=> handleImageIndex(photoIndex-1, "prev") }  disabled={prevBtn} className='prevnext'><span >{"<"}</span></button>
        <img src={photos[photoIndex]?.image} alt={photoIndex} />
        <button onClick={()=> handleImageIndex(photoIndex+1, "next")}  disabled={nextBtn} className='prevnext'><span >{">"}</span></button>
      </div>
      <button onClick={()=>setShowSlideshow(false)}>Close</button>
    </div>
  )
}

