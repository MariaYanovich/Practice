localStorage.setItem('current_user', JSON.stringify('Mi Hao'));

class Viewer {
    constructor() {
        this.postsCollection = new PostsCollection(JSON.parse(localStorage.getItem('posts')));
        this.numOfPosts = JSON.parse(localStorage.getItem('posts_number'));
        this.currentUser = JSON.parse(localStorage.getItem('current_user'));
        for (let i = 0; i < this.numOfPosts; i++) {
            let post = this.postsCollection._photoPosts[i];
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
        }
        this.updateLent();

    }

    createHTMLPost(post) {
        if (this.currentUser === post.author) {
            return `
            <div class="post" id="${post.id}">
            <p class="name-of-user" align="left">${post.author}</p>
            <img class="main-img" src="${post.photoLink}" alt=""/>
            <div class="post_buttons">
                
                    <button class="like"></button>
                    <button class="edit"></button>
                    <button class="delete"></button>
               
            </div>
            <p class="likes" align="left"><b>${post.likes}</b></p>
            <p class="tags" align="left">${post.hashTags}</p>
            <p class="description" align="left">${post.description}</p>
            <p class="location" align="left"><em>${post.location}</em></p>
            <p class="data" align="left"><em>${post.createdAt}</em></p>
            <div class="line">
            </div>
        </div>`
        }
        return `
            <div class="post" id="${post.id}">
            <p class="name-of-user" align="left">${post.author}</p>
            <img class="main-img" src="${post.photoLink}" alt=""/>
            <div class="post_buttons">
                
                        <button class="like"></button>      
                                    
            </div>
            <p class="likes" align="left"><b>${post.likes}</b></p>
            <p class="tags" align="left">${post.hashTags}</p>
            <p class="description" align="left">${post.description}</p>
            <p class="location" align="left"><em>${post.location}</em></p>
            <p class="data" align="left"><em>${post.createdAt}</em></p>
            <div class="line">
            </div>
        </div>`
    }

    getPostByID(postID) {
        return this.postsCollection.getPostById(postID);
    }

    updateLent() {
        document.getElementById('posts').innerHTML = '';
        let post;
        for (let i = 0; i < 10; i++) {
            post = this.postsCollection._photoPosts[i];
            if (this.postsCollection.validatePost(post)) {
                document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            }
        }
    }


    createNewID() {
        let nID = this.numOfPosts + 1;
        if (this.getPostByID(nID)) {
            nID = nID + '9';
        }
        return nID;
    }

    addPhotoPost(post) {
        if (this.postsCollection.validatePost(post) && this.postsCollection._photoPosts.findIndex((item) => (item.id === post.id)) === -1) {
            this.numOfPosts++;
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            this.postsCollection.addPost(post);
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
            this.updateLent();
            return true;
        }
        return false;
    }

    removePhotoPost(id) {
        if (this.postsCollection.getPostById(id).author === this.currentUser) {
            this.numOfPosts--;
            this.postsCollection.removePost(id);
            localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
            localStorage.setItem('posts_number', JSON.stringify(this.numOfPosts));
            this.updateLent();
            return true;
        }
        return false;
    }



    editPost(id, config) {
        let post = this.getPostByID(id);
        if ((post && post.author === this.currentUser) || config.likes) {
            if (this.postsCollection.editPost(id, config)) {
                localStorage.setItem('posts', JSON.stringify(this.postsCollection._photoPosts));
                this.updateLent();
                return true;
            }
            return false;
        }
    }
}

class CurrentUserInfoView {
    viewCurrentUserName() {
        document.getElementById('current_user').innerHTML =
            `<p id="user_name">${localStorage.getItem("current_user")}</p>`;
    }

}

const User = new CurrentUserInfoView();
User.viewCurrentUserName();
localStorage.setItem('current_user', JSON.stringify('Mi Hao'));
let Posts = new Viewer();

