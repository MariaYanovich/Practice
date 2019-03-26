class PostList {
    constructor(photoPosts) {
        this.pP = photoPosts;
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
        let res = photoPosts.slice();
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


        if (filterConfig.tag && filterConfig.tag.length !== 0) {
            res = res.filter(function (post) {
                for (let i = 0; i < filterConfig.tag.length; i++) {
                    let condition = post.tag.some(function (tag) {
                        return tag === filterConfig.tag[i];
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

    getPostByID(id) {
        let flag = false;
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                flag = true;
                return photoPosts[i];
            }
        }
        if (!flag) {
            console.log("No such ID");
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
        if (this.validatePost(post)) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === post.id) {
                    console.log("Post with the same ID already exists");
                    return false;
                }
            }
            photoPosts.push(post);
            return true;
        } else return false;
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
        let clone = Object.assign({}, this.getPostByID(postID));
        if (post.id) clone.id = post.id;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;

        if (this.validatePost(clone)) {
            for (let i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === postID) {
                    photoPosts[i] = clone;
                    return true;
                }
            }
        } else return false;
    }

    clear(){
        return photoPosts.length=0;
    }

    removePost(id) {
        let index = 0;
        for (let i = 0; i < photoPosts.length; i++) {
            if (photoPosts[i].id === id) {
                index = i;
                break;
            }
        }
        if (index === 0) {
            console.log("No post with such id");
            return false;
        }
        photoPosts.splice(index, 1);
        return true;
    }
}

function Test() {
    let model = new PostList(photoPosts);

    console.log(model.getPhotoPosts(0, 20, ""));
    console.log(model.getPhotoPosts(0, 20, {
        author: "Lana Rey",
        createdAt: new Date("11-08-2018")
    }));

    console.log(model.getPhotoPosts(0, 20, {
        author: "Mara Rey",
        createdAt: ""
    }));
    console.log(model.validatePost(model.getPostByID("12")));

    model.editPost("12", {description: "New description!!!"});

    console.log(model.getPhotoPosts(0, 20, ""));


    console.log(model.getPhotoPosts(0, 20, {
        tag: ["masha"]
    }));

    console.log(model.getPostByID("2"));
    console.log(model.removePost("66"));

    model.addPost({
        id: "21",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("01-07-2018"),
        location: "Beijing, China",
        tag: ['apps', 'sport'],
        author: "Lana Rey",
        photoLink: "images/image-1.jpg"
    });
    console.log(model.removePost("11"));
    console.log(model.getPhotoPosts(0, 21, ""));
    console.log(model.addAll(photoPosts));
    console.log(model.clear());
    console.log(model);

}

Test();