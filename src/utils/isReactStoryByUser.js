export const isReactStoryByReqUser = (reqUserId, story) => {
    if (story && story.likes) {
        for (let user of story.likes) {
            if (user.id === reqUserId) {
                return true;
            }
        }
    }
    return false
}   