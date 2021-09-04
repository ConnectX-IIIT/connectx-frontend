function setInputImageDimensions(
  listPositionIndex,
  imageNaturalHeight,
  imageNaturalWeight,
  inputImagesDimensionsList,
  setInputImagesDimensionsList
) {
  let tempArrForImagesDimensions = inputImagesDimensionsList.slice();
  tempArrForImagesDimensions[listPositionIndex] = {
    width: imageNaturalWeight,
    height: imageNaturalHeight,
  };
  setInputImagesDimensionsList(tempArrForImagesDimensions);
}

export default setInputImageDimensions;
