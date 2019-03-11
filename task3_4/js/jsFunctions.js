var postsActions = (function () {
    var tags = [];

    function sortPostsByDate(somePost) {
        somePost.sort(function (a, b) {
            if (a.createdAt - b.createdAt < 0) {
                return 1;
            } else {
                return -1;
            }
        });
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig, filterStringAuthor, filterStringDate, filterStringTag) {
        var res = manyPosts;
        sortPostsByDate(res);
        if (filterConfig === "author") {
            res = res.filter(function (post) {
                return post.author.toLowerCase() === filterStringAuthor.toLowerCase();
            });
        }
        if (filterConfig === "date") {
            res = res.filter(function (post) {
                return post.createdAt.getMonth() === new Date(filterStringDate).getMonth();
            });
        }
        if (filterConfig === "tag") {
            if (tags.find(function (tag) {
                return checkTagForExistanceIn(tag.tag, filterStringTag);
            })) {
                result = result.filter(function (article) {
                    var didFind = false;
                    filterStringTag.forEach(function (someTag) {
                        if (checkTagForExistanceIn(someTag, article.tag)) {
                            didFind = true;
                        }
                    });
                    return didFind;
                });
            } else {
                return undefined;
            }
        }
        res = res.slice(skip, skip + top);

        return res;
    }

    function checkTagForExistanceIn(someTag, place) {
        var didFind = false;
        place.forEach(function (someString) {
            if (someString.toLowerCase().trim() === someTag.trim().toLowerCase()) {
                didFind = true;
            }
        });
        return didFind;

    }


    function getPostByID(id) {
        var flag=false;
        for (var i=0; i<manyPosts.length; i++) {
            if (manyPosts[i].id === id) {
                flag=true;
                return manyPosts[i];
            }
        }
        if (!flag){
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
        }
        else {
            if (post.description.length >= 200 ) {
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
        }
        else if (post.author.length === 0) {
            console.log("wrong post author length");
            return false;
        }
        if(!post.location){
            console.log("wrong post location");
            return false;
        }
        if(!post.photoLink){
            console.log("wrong post photoLink");
            return false;
        }
        return true;
    }

    function addPost(post) {
        if (validatePost(post)) {
            for(var i = 0; i < manyPosts.length; i++){
                if(manyPosts[i].id === post.id){
                    console.log("post with the same id already exists");
                    return false;
                }
            }
            manyPosts.push(post);
        }
        else return false;
    }

    function editPost(postID, post) {
        var clone = getPostByID(postID);
        if (post.id) clone.id = post.id;
        if (post.title) clone.title = post.title;
        if (post.description) clone.description = post.description;
        if (post.createdAt) clone.createdAt = post.createdAt;
        if (post.location) clone.location = post.location;
        if (post.author) clone.author = post.author;
        if (post.photoLink) clone.photoLink = post.photoLink;

        if (validatePost(clone)) {
            for (var i = 0; i < manyPosts.length; i++) {
                if (manyPosts[i].id === postID) {
                    manyPosts[i] = clone;
                    return true;
                }
            }
        }
        else return false;
    }

    function removePost(id) {
        var index = 0;
        for (var i = 0; i < manyPosts.length; i++) {
            if (manyPosts[i].id === id) {
                index = i;
                break;
            }
        }
        if(index === 0){
            console.log("no post with such id");
            return;
        }
        manyPosts.splice(index, 1)
    }

    return {
        editPost:editPost,
        getPhotoPosts: getPhotoPosts,
        getPostByID: getPostByID,
        removePost: removePost,
        addPost: addPost
    }



}());


console.log(postsActions.getPhotoPosts(0, 20, "date", "", new Date("01-12-2018"), ""));
console.log(postsActions.getPhotoPosts(0,20,"author","Lana Rey" ,"", ""));
//console.log(postsActions.getPhotoPosts(0,20,"tag", "","","apps"));
console.log(postsActions.getPostByID("2"));
console.log(postsActions.removePost("6"));
postsActions.addPost({
    id: "21",
    description: "Figure skating at the Olympiad-2018!",
    createdAt: new Date("01-07-2018"),
    location:"Beijing, China",
    tag: ['apps', 'sport'],
    author: "Lana Rey",
    photoLink: "images/image-1.jpg"
} );
console.log(postsActions.getPhotoPosts(0, 21, "", "", "", ""));