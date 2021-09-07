function setStatusAccToIActivityStatus(iActive, isBeingHovered, setCurrentButtonColorsState) {
  if (iActive) {
    setCurrentButtonColorsState("ACTIVE");
  } else if (isBeingHovered) {
    setCurrentButtonColorsState("HOVER");
  } else {
    setCurrentButtonColorsState("INACTIVE");
  }
}

function setStatusAccToIActivityStatusForMouseLeave(
  iActive,
  setCurrentButtonColorsState
) {
  if (iActive) {
    setCurrentButtonColorsState("ACTIVE");
  } else {
    setCurrentButtonColorsState("INACTIVE");
  }
}

export {
  setStatusAccToIActivityStatus,
  setStatusAccToIActivityStatusForMouseLeave,
};
