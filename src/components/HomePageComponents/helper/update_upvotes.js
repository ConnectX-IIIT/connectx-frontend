import { upvoteDiscussion } from "./upvote_discussion";
import { upvotePost } from "./upvote_post";

const handleUpvotes = async (userDetails, history, id, UpvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost) => {
    setUpvoteActive(!UpvoteActive);
    let upvotes = UpvotesHandle;
    if (UpvoteActive) {
        upvotes = upvotes - 1;
        setUpvotesHandle(upvotes);
        if (isPost) {
            await upvotePost(userDetails, history, id, 2);
        } else {
            await upvoteDiscussion(userDetails, history, id, 2);
        }
    } else {
        upvotes = upvotes + 1;
        setUpvotesHandle(upvotes);
        if (isPost) {
            await upvotePost(userDetails, history, id, 1);
        } else {
            await upvoteDiscussion(userDetails, history, id, 1);
        }
    }
}

const handleUpvoteDownvote = async (userDetails, history, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost) => {
    setUpvoteActive(!UpvoteActive);
    setDownvoteActive(!DownvoteActive);
    UpvotesHandle = UpvotesHandle - 2;
    setUpvotesHandle(UpvotesHandle);
    if (isPost) {
        await upvotePost(userDetails, history, id, 2);
        await upvotePost(userDetails, history, id, 3);
    } else {
        await upvoteDiscussion(userDetails, history, id, 2);
        await upvoteDiscussion(userDetails, history, id, 3);
    }
}

const handleDownvotes = async (userDetails, history, id, DownvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, isPost) => {
    setDownvoteActive(!DownvoteActive);
    let upvotes = UpvotesHandle;
    if (DownvoteActive) {
        upvotes = upvotes + 1;
        setUpvotesHandle(upvotes);
        if (isPost) {
            await upvotePost(userDetails, history, id, 4);
        } else {
            await upvoteDiscussion(userDetails, history, id, 4);
        }
    } else {
        upvotes = upvotes - 1;
        setUpvotesHandle(upvotes);
        if (isPost) {
            await upvotePost(userDetails, history, id, 3);
        } else {
            await upvoteDiscussion(userDetails, history, id, 3);
        }
    }
}

const handleDownvoteUpvote = async (userDetails, history, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost) => {
    setDownvoteActive(!DownvoteActive);
    setUpvoteActive(!UpvoteActive);
    UpvotesHandle = UpvotesHandle + 2;
    setUpvotesHandle(UpvotesHandle);
    if (isPost) {
        await upvotePost(userDetails, history, id, 4);
        await upvotePost(userDetails, history, id, 1);
    } else {
        await upvoteDiscussion(userDetails, history, id, 4);
        await upvoteDiscussion(userDetails, history, id, 1);
    }
}

export const updateUpvotes = async (userDetails, history, id, UpvoteActive, DownvoteActive, setUpvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, isUpvoted, isPost) => {
    if (DownvoteActive && isUpvoted) {
        await handleDownvoteUpvote(userDetails, history, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost);
    } else if (UpvoteActive && !isUpvoted) {
        await handleUpvoteDownvote(userDetails, history, id, DownvoteActive, UpvoteActive, setDownvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost);
    } else {
        if (isUpvoted) {
            await handleUpvotes(userDetails, history, id, UpvoteActive, setUpvoteActive, UpvotesHandle, setUpvotesHandle, isPost);
        } else {
            await handleDownvotes(userDetails, history, id, DownvoteActive, setDownvoteActive, UpvotesHandle, setUpvotesHandle, isPost);
        }
    }
};