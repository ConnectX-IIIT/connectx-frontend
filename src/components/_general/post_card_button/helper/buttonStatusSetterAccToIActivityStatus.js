function setStatusAccToIActivityStatus(iActive, setCurrentButtonColorsState) {
  if (iActive) {
    setCurrentButtonColorsState("ACTIVE");
  } else {
    setCurrentButtonColorsState("INACTIVE");
  }
}

export default setStatusAccToIActivityStatus;