export const isLikedByReqUser = (reqUserId, post) => {
    if (post && post.liked) {
        for (let user of post.liked) {
            if (user.id === reqUserId) {
                return true;
            }
        }
    }
    return false
}   