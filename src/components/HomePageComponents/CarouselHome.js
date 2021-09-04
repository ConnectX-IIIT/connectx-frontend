import React, { useState } from "react";
import "../../styles/HomePage/HomeMainContainer/CarouselHome.css";
import Carousel from "react-bootstrap/Carousel";
import { handlePhoto } from "./helper/handle_photo";

function CarouselHome({ CarouselImgs }) {

  let carouselLenght = CarouselImgs.length;
  if (carouselLenght > 1) carouselLenght = false;
  else carouselLenght = true;

  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex, e) => {
    setIndex(selectedIndex);
  };

  const CarouselList = CarouselImgs.map((img, index) => {
    return (
      <Carousel.Item key={`carousel ${index}`}>
        <img
          key={img.toString()}
          className="d-block w-100 ImgCarouselHome"
          src={handlePhoto(img, 0)}
          alt="slide"
        />
      </Carousel.Item>
    );
  });

  return (
    <div
      style={{
        marginBottom: "1vw",
      }}
    >
      {carouselLenght ? (
        <img
          className="d-block w-100 ImgCarouselHome"
          src={handlePhoto(CarouselImgs[0], 0)}
          alt="slide"
          style={{
            height: "auto",
          }}
        />
      ) : (
        <Carousel interval={null} activeIndex={index} onSelect={handleSelect}>
          {CarouselList}
        </Carousel>
      )}
    </div>
  );
}

export default CarouselHome;
