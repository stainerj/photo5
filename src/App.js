import React, { useEffect, useState } from 'react';
import './App.css';

//image array
const images = [
  { id: '1', imageName: '013_beinn_dòrain.JPG', tag: 'free' },
  { id: '2', imageName: '016_buachaille_etive_mòr.JPG', tag: 'free' },
  { id: '3', imageName: '027_eigg_and_rùm_from_camusdarach.JPG', tag: 'free' },
  { id: '4', imageName: '123_binnian_summit_view.JPG', tag: 'free' },
  { id: '5', imageName: '271_lough_gouragh.JPG', tag: 'free' },
  { id: '6', imageName: 'DSC_0508.JPG', tag: 'new' },
  { id: '7', imageName: 'DSC_0562.JPG', tag: 'new' },
  { id: '8', imageName: 'DSC_0682edit1.JPG', tag: 'new' }
];

//application component
function App() {
  return (
    <div className="App">
      <h1>Photo Gallery 5</h1>
      <ImageGallery />
    </div>
  );
}

//lightbox function
function ImageGallery() {
  const [tag, setTag] = useState('all');
  const [filteredImages, setFilteredImages] = useState([]);
  const [imageToShow, setImageToShow] = useState("");
  const [lightboxDisplay, setLightBoxDisplay] = useState(false);

  //function to show a specific image in the lightbox, amd make lightbox visible
  const showImage = (image) => {
    setImageToShow(image);
    setLightBoxDisplay(true);
  }

  //hide lightbox
  const hideLightBox = () => {
    setLightBoxDisplay(false);
  };

  //show next image in lightbox
  const showNext = (e) => {
    e.stopPropagation();
    let currentIndex = filteredImages.indexOf(imageToShow);
    if (currentIndex >= filteredImages.length - 1) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = filteredImages[currentIndex + 1];
      setImageToShow(nextImage);
    }
  };

  //show previous image in lightbox
  const showPrev = (e) => {
    e.stopPropagation();
    let currentIndex = filteredImages.indexOf(imageToShow);
    if (currentIndex <= 0) {
      setLightBoxDisplay(false);
    } else {
      let nextImage = filteredImages[currentIndex - 1];
      setImageToShow(nextImage);
    }
  };

  //filter according to tag
  useEffect( () => {
    tag === 'all' ? setFilteredImages(images) : setFilteredImages(images.filter(image => image.tag === tag))
  }, [tag])

  return (
    <div className="App" handleSetTag={setTag}>
      <div className="tags">
        <TagButton name="all" handleSetTag={setTag} tagActive={tag === 'all' ? true : false}/>
        <TagButton name="new" handleSetTag={setTag} tagActive={tag === 'new' ? true : false}/>
        <TagButton name="free" handleSetTag={setTag} tagActive={tag === 'free' ? true : false}/>
        <TagButton name="pro" handleSetTag={setTag} tagActive={tag === 'pro' ? true : false}/>
      </div>
      <div className="container">
      {filteredImages.map(image => 
          <div key={image.id} className="image-card">
            <img className="image" 
                 onClick={() => showImage(image)} 
                 src={`/images/${image.imageName}`} 
                 alt="" />
          </div>)
      }
      {
        lightboxDisplay ? 
        <div id="lightbox" onClick={hideLightBox}>
          <button onClick={showPrev}>←</button>
          <img id="lightbox-img" src={`/images/${imageToShow.imageName}`}></img>
          <button onClick={showNext}>→</button>
        </div>
       : ""
      }
      </div> 
    </div>
  );

}//end ImageGallery

const TagButton = ( {name, handleSetTag, tagActive} ) => {
  return <button className={ `tag ${ tagActive ? 'active': null}`} onClick={ () => handleSetTag(name)}>
    {name.toUpperCase() }</button>
}

export default App;
