
class FilterHelper {
    author(list, author) {
        return list.filter(element => element.author.toLowerCase().includes(author.toLowerCase()));
    }



    hashTags(photoList, hashTagsList) {
        return photoList.filter(elem => hashTagsList.every(hashTag => elem.hashTags.includes(hashTag)));  }
}

class PostCollection {
    constructor(posts) {
        this._photoPosts = posts.slice(0);
    }

    getPage(filterConfig, numOfElems, skipNumber) {
        const fHelper = new FilterHelper();
        const skipNum = skipNumber || 0;
        const numReturn = numOfElems || 10;
        let arr = [];
        arr = this._photoPosts.slice(0);
        arr = arr.filter(elem => elem.isDeleted == false);
        Object.keys(filterConfig).forEach((field) => {
            arr = fHelper[field](arr, filterConfig[field]);
        });
        arr = arr.slice(skipNum, skipNum + numReturn);
        return arr;
    }

    edit(id, obj) {
        const index = this._photoPosts.findIndex(elem => elem.id === id);
        if (index === -1) {
            return false;
        }
        if (obj.description && !PostCollection._checkDescription(obj.description)) {
            return false;
        }
        if (obj.photoLink && !PostCollection._checkLink(obj.photoLink)) {
            return false;
        }
        if (obj.hashTags && !Array.isArray(obj.hashTags)) {
            return false;
        }

        this._photoPosts[index].description = obj.description || this._photoPosts[index].description;
        this._photoPosts[index].photoLink = obj.photoLink || this._photoPosts[index].photoLink;
        if (obj.hashTags) {
            this._photoPosts[index].hashTags = obj.hashTags.slice(0);
        }
        return true;
    }

    get(id) {
        return this._photoPosts.find((elem) => {
            if (elem.id === id) {
                return true;
            }
            return false;
        });
    }

    addLike(id, username) {
        return this._photoPosts.find((elem) => {
            if (elem.id === id) {
                elem.likes.push(username);
                return true;
            }
            return false;
        });
    }
    removeLike(id, user){
        return this._photoPosts.find((elem) => {
            if (elem.id === id) {
                let delIndex = elem.likes.indexOf(user);
                elem.likes.splice(delIndex,1);
                return true;
            }
            return false;
        });
    }
    add(photoPost) {
        photoPost.createdAt = new Date();
        photoPost.isDeleted = false;
        photoPost.id = photoPost.createdAt.getTime() + '';
        photoPost.likes = [];
        if (PostCollection._validate(photoPost)) {
            this._photoPosts.push(photoPost);
            return photoPost;
        }
        return false;
    }
    addAll(posts) {
        const f2 = this.add.bind(this);
        return posts.filter(elem => !f2(elem));
    }

    remove(id) {
        var ind = this._photoPosts.findIndex(elem => elem.id === id);
        if (ind !== -1) {
            this._photoPosts[ind].isDeleted = true;
            return true;
        }
        return false;
    }

    static _validate(elem) {
        if (elem === undefined) {
            return false;
        }
        if (!elem.id || typeof elem.id !== 'string') {
            return false;
        }
        if (!elem.description || !PostCollection._checkDescription(elem.description)) {
            return false;
        }
        if (!elem.createdAt || !PostCollection._checkData(elem.createdAt)) {
            return false;
        }
        if (!elem.author || !PostCollection._checkAuthor(elem.author)) {
            return false;
        }
        if (!elem.likes || !Array.isArray(elem.likes)) {
            return false;
        }
        if (!elem.hashTags || !Array.isArray(elem.hashTags)) {
            return false;
        }
        return elem.photoLink && PostCollection._checkLink(elem.photoLink);
    }

    static _checkAuthor(elem) {
        return typeof elem === 'string' && elem.length >= 0;
    }

    static _checkData(elem) {
        return typeof elem === 'object' && elem.getTime();
    }

    static _checkDescription(elem) {
        return typeof elem === 'string' && elem.length <= PostCollection._MAX_SIZE;
    }

    static _checkLink(elem) {
        return typeof elem === 'string' && elem.length >= 0;
    }
    static _sortAllPostsByDate(posts){
        posts = posts.sort(function(a,b){
            if(a.createdAt < b.createdAt){
                return 1;
            }
            if(a.createdAt > b.createdAt){
                return -1;
            }
            else
                return 0;
        });
        return posts;
    }
}
PostCollection._MAX_SIZE = 200;