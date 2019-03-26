var postsActions = (function () {

    function sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig) {
        var res = photoPosts.slice();
        sortPostsByDate(res);
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
                for (var i = 0; i < filterConfig.tag.length; i++) {
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



    function getPostByID(id) {
        var flag = false;
        for (var i = 0; i < photoPosts.length; i++) {
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

    function validatePost(post) {
        if (!post.id) {
            console.log("no post id");
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
            console.log("wrong post id");
            return false;
        }

        if (!post.author) {
            console.log("wrong post author");
            return false;

        } else if (post.author.length === 0) {
            console.log("wrong post author length");
            return false;
        }

        if (!post.location) {
            console.log("wrong post location");
            return false;
        }

        if (!post.photoLink) {
            console.log("wrong post photoLink");
            return false;
        }
        return true;
    }

    function addPost(post) {
        if (validatePost(post)) {
            for (var i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === post.id) {
                    console.log("Post with the same ID already exists");
                    return false;
                }
            }
            photoPosts.push(post);
            return true;
        } else return false;
    }

    function editPost(postID, post) {
        var clone = Object.assign({}, getPostByID(postID));
        if (post.id) clone.id = post.id;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;

        if (validatePost(clone)) {
            for (var i = 0; i < photoPosts.length; i++) {
                if (photoPosts[i].id === postID) {
                    photoPosts[i] = clone;
                    return true;
                }
            }
        } else return false;
    }


    function removePost(id) {
        var index = 0;
        for (var i = 0; i < photoPosts.length; i++) {
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

    return {
        getPhotoPosts: getPhotoPosts,

        getPostByID: getPostByID,

        validatePost: validatePost,

        addPost: addPost,

        editPost: editPost,

        removePost: removePost
    }


}());


console.log(postsActions.getPhotoPosts(0, 20, ""));
console.log(postsActions.getPhotoPosts(0, 20, {
    author: "Lana Rey",
    createdAt: new Date("11-08-2018")
}));

console.log(postsActions.getPhotoPosts(0, 20, {
    author: "Mara Rey",
    createdAt: ""
}));

console.log(postsActions.validatePost(postsActions.getPostByID("12")));

postsActions.editPost("12", {description: "New description!!!"});

console.log(postsActions.getPhotoPosts(0, 20, ""));


console.log(postsActions.getPhotoPosts(0,20,{
    tag: ["masha"]
}));

console.log(postsActions.getPostByID("2"));
console.log(postsActions.removePost("66"));

postsActions.addPost({
    id: "21",
    description: "Figure skating at the Olympiad-2018!",
    createdAt: new Date("01-07-2018"),
    location: "Beijing, China",
    tag: ['apps', 'sport'],
    author: "Lana Rey",
    photoLink: "images/image-1.jpg"
});
console.log(postsActions.removePost("11"));
console.log(postsActions.getPhotoPosts(0, 21, ""));

