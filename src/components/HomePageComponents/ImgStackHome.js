import React, { useEffect, useState } from "react";
import "../../styles/HomePage/ImgStackHome.css";

function ImgStackHome({
  normalImageSrc,
  hoverImageSrc,
  activeImageSrc,
  isActive,
  styleImgStack,
  styleImgContainer,
  onClickFunction,
}) {
  const displayImage = "ImgStackPhoto ImgStackVisible";
  const hideImage = "ImgStackPhoto ImgStackHidden";

  const [hoverClass, setHoverClass] = useState(hideImage);
  const [activeClass, setActiveClass] = useState(hideImage);
  const [normalClass, setNormalClass] = useState(displayImage);

  useEffect(() => {
    if (isActive) {
      setActiveClass(displayImage);
      setHoverClass(hideImage);
      setNormalClass(hideImage);
    } else {
      if (!isActive) {
        setActiveClass(hideImage);
        setHoverClass(displayImage);
        setNormalClass(hideImage);
        setActiveClass(hideImage);
        setHoverClass(hideImage);
        setNormalClass(displayImage);
      }
    }
  }, [isActive]);

  return (
    <div
      className="ImgStackHomeContainer"
      style={styleImgContainer}
      onMouseOver={() => {
        if (!isActive) {
          setActiveClass(hideImage);
          setHoverClass(displayImage);
          setNormalClass(hideImage);
        }
      }}
      onMouseOut={() => {
        if (!isActive) {
          setActiveClass(hideImage);
          setHoverClass(hideImage);
          setNormalClass(displayImage);
        }
      }}
      onClick={onClickFunction}
    >
      <img
        src={normalImageSrc}
        className={normalClass}
        alt="normal"
        style={styleImgStack}
      />
      <img
        src={hoverImageSrc}
        className={hoverClass}
        alt="hoverImage"
        style={styleImgStack}
      />
      <img
        src={activeImageSrc}
        className={activeClass}
        alt="activeImage"
        style={styleImgStack}
      />
    </div>
  );
}

export default ImgStackHome;
