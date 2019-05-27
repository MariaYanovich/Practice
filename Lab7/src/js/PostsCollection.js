

class PostsCollection {
    constructor(photoPosts) {
        this._photoPosts = photoPosts;
    }

    sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    getPhotoPosts(skip = 0, top = 10, filterConfig) {
        let res = this._photoPosts.slice();
        this.sortPostsByDate(res);
        if (filterConfig.author) {
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterConfig.author.toLowerCase();
            });
        }

        if (filterConfig.createdAt) {
            res = res.filter(function (post) {
                return post.createdAt.getDate() === new Date(filterConfig.createdAt).getDate();
            });
        }


        if (filterConfig.hashTags && filterConfig.hashTags.length !== 0) {
            res = res.filter(function (post) {
                for (let i = 0; i < filterConfig.hashTags.length; i++) {
                    let condition = post.hashTags.some(function (tag) {
                        return tag === filterConfig.hashTags[i];
                    });
                    if (!condition) {
                        return false;
                    }
                }
                return true;
            })
        }
        res = res.slice(skip, skip + top);
        return res;
    }

    getPostById(id) {
        let flag = false;
        for (let i = 0; i < this._photoPosts.length; i++) {
            if (this._photoPosts[i].id === id) {
                flag = true;
                return this._photoPosts[i];
            }
        }
        if (!flag) {
            //console.log("No such ID");
            return flag;
        }

    }

     validatePost(post) {
        if (!post.id) {
            console.log("No post id");
            return false;
        }

        if (!post.description) {
            return false;
        } else {
            if (post.description.length >= 200) {
                console.log("wrong post:" + post.id + " description length: " + post.description.length);
                return false;
            }
        }

        if (!post.createdAt) {
            console.log("Wrong post id");
            return false;
        }

        if (!post.author) {
            console.log("Wrong post author");
            return false;

        } else if (post.author.length === 0) {
            console.log("Wrong post author length");
            return false;
        }

        if (!post.location) {
            console.log("Wrong post location");
            return false;
        }

        if (!post.photoLink) {
            console.log("Wrong post photoLink");
            return false;
        }
        return true;
    }

    addPost(post) {
        try {
            if (this.validatePost(post)) {
                this._photoPosts.push(post);
                return true;
            }
        }
        catch (e) {
            console.log("addPost error. " + e);
            return false;
        }
    }

    addAll(pP) {
        this.photoPostsForAdding = [];
        let invalidPhotoPosts = [];
        for (let i = 0; i < pP.length; i++) {
            if (this.validatePost(pP[i])) {
                this.photoPostsForAdding.push(pP[i]);
            } else {
                invalidPhotoPosts.push(pP[i])
            }
        }
        return invalidPhotoPosts;
    }

    editPost(postID, post) {
        let clone = Object.assign({}, this.getPostById(postID));
        if (post.id) clone.id = post.id;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;
        if (post.likes) clone.likes = post.likes;

        if (this.validatePost(clone)) {
            for (let i = 0; i < this._photoPosts.length; i++) {
                if (this._photoPosts[i].id === postID) {
                    this._photoPosts[i] = clone;
                    return true;
                }
            }
        } else return false;
    }

    clear(){
        return this._photoPosts.length=0;
    }

    removePost(id) {
        let index = this._photoPosts.findIndex((item)=>(item.id === id));
        if (index === -1) {
            console.log("no post with such id");
            return false;
        }
        this._photoPosts.splice(index, 1);
        return true;
    }
}

