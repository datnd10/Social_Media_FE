export const isSavedByReqUser = (reqUserId, post) => {
    if (post && post.savedBy) {
        for (let user of post.savedBy) {
            if (user.id === reqUserId) {
                return true;
            }
        }
    }
    return false
}   