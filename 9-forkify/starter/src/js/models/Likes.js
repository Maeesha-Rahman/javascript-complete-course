export default class Likes {
    constructor() {
        this.likes = [];
    }

    addLike(id, title, author, img) {
        const like = { id, title, author, img };
        this.likes.push(like);

        // persist data in localStorage
        this.persistData();
        return like;
    }

    deleteLike(id) {
        const index = this.likes.findIndex(el => el.id === id);
        this.likes.splice(index, 1);

         // persist data in localStorage
         this.persistData();
    }

    isLiked(id) {
        // if we cannot find an item with the id that we passed in, then this will be -1. the entire expression will be false. this is what we want bc it means the recipe that contains the id has not been liked 
        // if we can find the item with the id passed in which means it will not equal to -1, the expression returns true (which means it is in the likes array)
        return this.likes.findIndex(el => el.id === id) !== -1;
    }

    getNumLikes() {
        return this.likes.length;
    }

    persistData() {
        // localstorage is a built-in function that takes in key value pairs that must be in a string. convert the likes array to string using json.stringify 
        localStorage.setItem('likes', JSON.stringify(this.likes));
    }

    readStorage() {
        const storage = JSON.parse(localStorage.getItem('likes'));

        // restore likes from the localStorage 
        if (storage) this.likes = storage;
    }
}