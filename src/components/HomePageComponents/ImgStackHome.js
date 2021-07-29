import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams,
  useRouteMatch,
} from "react-router-dom";
import "../../styles/HomePage/ImgStackHome.css";

function ImgStackHome({
  normalImageSrc,
  hoverImageSrc,
  activeImageSrc,
  isActive,
  urlPath,
}) {
  let { path, url } = useRouteMatch();

  const displayImage = "commonImgHome ImgStackVisible";
  const hideImage = "commonImgHome ImgStackHidden";

  const [hoverClass, setHoverClass] = useState(hideImage);
  const [activeClass, setActiveClass] = useState(hideImage);
  const [normalClass, setNormalClass] = useState(displayImage);

  useEffect(() => {
    if (isActive) {
      setActiveClass(displayImage);
      setHoverClass(hideImage);
      setNormalClass(hideImage);
    }
  }, [isActive]);
  // else {
  // let imageStackContainer = document.getElementsByClassName(
  //   "ImgStackHomeContainer"
  // )[0];
  // imageStackContainer.addEventListener("mouseover", () => {
  //   setActiveClass(hideImage);
  //   setHoverClass(displayImage);
  //   setNormalClass(hideImage);
  // });
  // imageStackContainer.addEventListener("mouseout", () => {
  //   setActiveClass(hideImage);
  //   setHoverClass(hideImage);
  //   setNormalClass(displayImage);
  // });
  // }

  return (
    <div
      className="ImgStackHomeContainer"
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
    >
      <img src={normalImageSrc} className={normalClass} alt="normal" />
      <img src={hoverImageSrc} className={hoverClass} alt="hoverImage" />
      <img src={activeImageSrc} className={activeClass} alt="activeImage" />
    </div>
  );
}

export default ImgStackHome;
