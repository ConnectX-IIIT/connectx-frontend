import React from "react";
import "./styles/App.css";
import MainOuterContainer from "./components/Main_outer_container";

function App() {
  return (
    <div className="App">
      <>
        <MainOuterContainer
          Background_color="#FFEFF1"
          isNavbar
        ></MainOuterContainer>
        <MainOuterContainer Background_color="#FFFBF2" />
      </>
    </div>
  );
}

export default App;
