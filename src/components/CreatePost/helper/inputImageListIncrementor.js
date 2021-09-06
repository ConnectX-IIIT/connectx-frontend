const incrementInputImageList = (
  event,
  inputImagesFilesList,
  setInputImagesFilesList,
  inputImagesSrcList,
  setInputImagesSrcList
) => {
  if (event.target.files[0]) {
    let readerObjForCreatePost = new FileReader();

    readerObjForCreatePost.readAsDataURL(event.target.files[0]);

    let tempArrForInputImagesFilesList = inputImagesFilesList.slice();
    tempArrForInputImagesFilesList[tempArrForInputImagesFilesList.length] =
      event.target.files[0];
    setInputImagesFilesList(tempArrForInputImagesFilesList);

    readerObjForCreatePost.onloadend = function () {
      let tempArrForInputImagesSrcsList = inputImagesSrcList.slice();
      tempArrForInputImagesSrcsList[tempArrForInputImagesSrcsList.length] =
        readerObjForCreatePost.result;
      // setInputImagesSrcList([]);
      setInputImagesSrcList(tempArrForInputImagesSrcsList);
    };
  }
};

export default incrementInputImageList;
