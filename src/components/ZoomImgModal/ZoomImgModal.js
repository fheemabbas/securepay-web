import React, { useRef, useEffect } from 'react';
import Slider from "react-slick";
import './ZoomImgModal.scss';
import { filter } from "lodash";
const ZoomImgModal = (props) => {
  let { title, ZoomImg, indexZoom, ShowImage } = props
  const carouselRef = useRef(null);
  const images = filter(ZoomImg.images, function (img) {
    let ext = img.split('.').pop()
    return ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'JPG' || ext === 'JPEG' || ext === 'PNG' || ext === 'SVG' || ext === 'svg';
  });
  useEffect(() => {
    if (carouselRef.current ?.slickGoTo)
      carouselRef.current.slickGoTo(images.indexOf(ShowImage));
  }, [ShowImage, images]);
  return (
    <div className='messageSection'>
      <p className='title'>{title}</p>
      <div className='zoomImg' >
        <Slider
          className='customeSlider'
          slidesToShow={1}
          swipeToSlide={true}
          focusOnSelect={false}
          dots={true}
          ref={carouselRef}
        >
          {images.map((image, index) => {
            let ext = image.split('.').pop()
            return <>
              {(ext === 'jpg' || ext === 'jpeg' || ext === 'png' || ext === 'JPG' || ext === 'JPEG' || ext === 'PNG' || ext === 'SVG' || ext === 'svg') &&
                <div className="slide_item">
                  <img src={process.env.REACT_APP_CLOUDINARY_URL + image} alt='img'>
                  </img>
                </div>
              }</>
          })}
        </Slider>
      </div>
    </div>
  )
}
export default (ZoomImgModal);