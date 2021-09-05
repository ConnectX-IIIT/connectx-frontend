function setInputImageDimensions(
  listPositionIndex,
  imageNaturalHeight,
  imageNaturalWidth,
  inputImagesDimensionsList,
  setInputImagesDimensionsList
) {
  let tempArrForImagesDimensions = inputImagesDimensionsList.slice();
  tempArrForImagesDimensions[listPositionIndex] = {
    width: imageNaturalWidth,
    height: imageNaturalHeight,
  };
  setInputImagesDimensionsList(tempArrForImagesDimensions);
}

export default setInputImageDimensions;
