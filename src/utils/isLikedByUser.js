export const isLikedByReqUser = (reqUserId, post) => {
    console.log(reqUserId,post);
    for(let user of post.liked) {
        if(user.id === reqUserId) {
            return true
        }
    }
    return false
}   