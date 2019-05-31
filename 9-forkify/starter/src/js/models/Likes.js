export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1)
    }

    isLiked(id) {
        // if we cannot find an item with the id that we passed in, then this will be -1. the entire expression will be false. this is what we want bc it means the recipe that contains the id has not been liked 
        // if we can find the item with the id passed in which means it will not equal to -1, the expression returns true (which means it is in the likes array)
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }
}