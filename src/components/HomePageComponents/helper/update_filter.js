
export const updateFilter = (postFilter, setIndex) => {
    if (postFilter.jobs === postFilter.projects && postFilter.projects === postFilter.blogs) {
        return setIndex(1);
    }
    if (postFilter.jobs && !postFilter.projects && !postFilter.blogs) {
        return setIndex(5);
    }
    if (!postFilter.jobs && postFilter.projects && !postFilter.blogs) {
        return setIndex(7);
    }
    if (!postFilter.jobs && !postFilter.projects && postFilter.blogs) {
        return setIndex(6);
    }
    if (postFilter.jobs && postFilter.projects && !postFilter.blogs) {
        return setIndex(2);
    }
    if (postFilter.jobs && !postFilter.projects && postFilter.blogs) {
        return setIndex(3);
    }
    if (!postFilter.jobs && postFilter.projects && postFilter.blogs) {
        return setIndex(4);
    }
}