function removePreviewImage(
  index,
  inputImagesSrcList,
  setInputImagesSrcList,
  inputImagesFilesList,
  setInputImagesFilesList,
  inputImagesDimensionsList,
  setInputImagesDimensionsList
) {
  let tempSrcListArr = inputImagesSrcList.slice();
  let tempFilesListArr = inputImagesFilesList.slice();
  let tempDimensionsListArr = inputImagesDimensionsList.slice();

  tempSrcListArr.splice(index, 1);
  tempFilesListArr.splice(index, 1);
  tempDimensionsListArr.splice(index, 1);

  setInputImagesSrcList(tempSrcListArr);
  setInputImagesFilesList(tempFilesListArr);
  setInputImagesDimensionsList(tempDimensionsListArr);
}

export default removePreviewImage;
