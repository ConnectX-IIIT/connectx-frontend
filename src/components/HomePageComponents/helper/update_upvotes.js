import { upvote } from "./upvote";

const handleUpvotes = async (userDetails, history, dispatch, id, UpvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement) => {
    setUpvoteActive(!UpvoteActive);
    let upvotes = UpvotesHandle;
    if (UpvoteActive) {
        upvotes = upvotes - 1;
        setUpvotesHandle(upvotes);
        await upvote(userDetails, history, dispatch, id, typeOfElement, 2);

    } else {
        upvotes = upvotes + 1;
        setUpvotesHandle(upvotes);
        await upvote(userDetails, history, dispatch, id, typeOfElement, 1);
    }
}

const handleUpvoteDownvote = async (userDetails, history, dispatch, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement) => {
    setUpvoteActive(!UpvoteActive);
    setDownvoteActive(!DownvoteActive);
    UpvotesHandle = UpvotesHandle - 2;
    setUpvotesHandle(UpvotesHandle);
    await upvote(userDetails, history, dispatch, id, typeOfElement, 2);
    await upvote(userDetails, history, dispatch, id, typeOfElement, 3);
}

const handleDownvotes = async (userDetails, history, dispatch, id, DownvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement) => {
    setDownvoteActive(!DownvoteActive);
    let upvotes = UpvotesHandle;
    if (DownvoteActive) {
        upvotes = upvotes + 1;
        setUpvotesHandle(upvotes);
        await upvote(userDetails, history, dispatch, id, typeOfElement, 4);

    } else {
        upvotes = upvotes - 1;
        setUpvotesHandle(upvotes);
        await upvote(userDetails, history, dispatch, id, typeOfElement, 3);
    }
}

const handleDownvoteUpvote = async (userDetails, history, dispatch, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement) => {
    setDownvoteActive(!DownvoteActive);
    setUpvoteActive(!UpvoteActive);
    UpvotesHandle = UpvotesHandle + 2;
    setUpvotesHandle(UpvotesHandle);
    await upvote(userDetails, history, dispatch, id, typeOfElement, 4);
    await upvote(userDetails, history, dispatch, id, typeOfElement, 1);
}

export const updateUpvotes = async (userDetails, history, dispatch, id, UpvoteActive, DownvoteActive, setUpvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, isUpvoted, typeOfElement) => {
    if (DownvoteActive && isUpvoted) {
        await handleDownvoteUpvote(userDetails, history, dispatch, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement);
    } else if (UpvoteActive && !isUpvoted) {
        await handleUpvoteDownvote(userDetails, history, dispatch, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement);
    } else {
        if (isUpvoted) {
            await handleUpvotes(userDetails, history, dispatch, id, UpvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement);
        } else {
            await handleDownvotes(userDetails, history, dispatch, id, DownvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, typeOfElement);
        }
    }
};