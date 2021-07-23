import React from "react";
import "./styles/App.css";
import Navbar from "./components/Navbar";
import MainOuterContainer from "./components/Main_outer_container";
import MainOuterMiddleContainer from "./components/MainOuterMiddleContainer";
import MainOuterBottomContainer from "./components/MainOuterBottomContainer";
import Footer from "./components/Footer";
import data_array from "./data/Landing_details.json";
import poster1 from "./assets/landing_page/container_one/container_one.svg";
import poster2 from "./assets/landing_page/container_two/container_two.svg";
import poster3 from "./assets/landing_page/container_three/container_three.svg";
import poster4 from "./assets/landing_page/container_four/container_four.svg";
import poster5 from "./assets/landing_page/bottom_community/bottom_community_2.svg";
import poster6 from "./assets/landing_page/bottom_community/bottom_community.svg";

function App() {
  return (
    <div className="App">
      <Navbar />

      <MainOuterContainer
        Background_color="#FFEFF1"
        data={data_array[0]}
        isLeft
        photo={poster1}
      />
      <MainOuterContainer
        Background_color="#FFFBF2"
        data={data_array[1]}
        photo={poster2}
      />
      <MainOuterContainer
        Background_color="#EBF2FF"
        data={data_array[2]}
        isLeft
        photo={poster3}
      />
      <MainOuterContainer
        Background_color="#EFFFFE"
        data={data_array[3]}
        photo={poster4}
      />

      <MainOuterMiddleContainer
        data={data_array[4]}
        Background_color="#FFFBEE"
      />

      <MainOuterBottomContainer
        Background_color="#FFFFFF"
        isButton
        photo={poster5}
        photoWidth="47vw"
        BottomParaContent={data_array[5].description}
        BottomContainerPadding="3vw"
      />
      <MainOuterBottomContainer
        Background_color="#FEFFE4"
        photo={poster6}
        photoWidth="55vw"
        BottomParaContent={data_array[6].description}
        BottomContainerPadding="10vw"
        isLogo
      />

      <Footer />
    </div>
  );
}

export default App;
