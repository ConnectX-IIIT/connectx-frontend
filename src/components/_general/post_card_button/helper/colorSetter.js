function setButtonColorsHook(currentState, colorSet, setCurrentColorsFun) {
  let tempColorsObj = {};
  switch (currentState) {
    case "ACTIVE":
      tempColorsObj = {
        primary: colorSet.activeColors.primary,
        secondary: colorSet.activeColors.secondary,
      };
      break;
    case "INACTIVE":
      tempColorsObj = {
        primary: colorSet.inactiveColors.primary,
        secondary: colorSet.inactiveColors.secondary,
      };
      break;
    case "HOVER":
      tempColorsObj = {
        primary: colorSet.hoverColors.primary,
        secondary: colorSet.hoverColors.secondary,
      };
      break;

    default:
      tempColorsObj = {
        primary: colorSet.inactiveColors.primary,
        secondary: colorSet.inactiveColors.secondary,
      };
      break;
  }

  setCurrentColorsFun(tempColorsObj);
}

export default setButtonColorsHook;
