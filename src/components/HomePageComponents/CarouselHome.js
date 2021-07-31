import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/CarouselHome.css";
import Carousel from "react-bootstrap/Carousel";

function CarouselHome() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  return (
    <div>
      <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
        <Carousel.Item>
          <img
            className="d-block w-100 ImgCarouselHome"
            src="https://source.unsplash.com/random"
            alt="First slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ImgCarouselHome"
            src="https://source.unsplash.com/random"
            alt="Second slide"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img
            className="d-block w-100 ImgCarouselHome"
            src="https://source.unsplash.com/random"
            alt="Third slide"
          />
        </Carousel.Item>
      </Carousel>
    </div>
  );
}

export default CarouselHome;
