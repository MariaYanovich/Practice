localStorage.setItem('current_user', JSON.stringify('Lana Rey'));

class Viewer{
    constructor(){
        this.postsCollection = new PostsActionsClass(JSON.parse(localStorage.getItem('posts')));
        this.numOfPosts = JSON.parse(localStorage.getItem('posts_number'));
        this.currentUser=JSON.parse(localStorage.getItem('current_user'));
        for(let i = 0; i < this.numOfPosts; i++){
            let post = this.postsCollection._photoPosts[i];
            document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
        }
        this.updateLent();

    }

    createHTMLPost(post){
        if(post.author === this.currentUser){
            return`
            <div class="post">
            <p class="name-of-user" align="left">${post.author}</p>
            <img class="main-img" src="${post.photoLink}" alt=""/>
            <div class="header-row">
                <ul >
                    <li>
                        <a class="photo-icon" target="_blank" href=""><i class="fa fa-edit"></i></a>
                    </li>
                    <li>
                        <a class="photo-icon" target="_blank" href=""><i class="fa fa-heart-o"></i></a>
                    </li>
                    <li>
                        <a class="photo-icon" target="_blank" href=""><i class="fa fa-trash"></i></a>
                    </li>
                </ul>
            </div>
            <p class="likes" align="left"><b>${post.likes}</b></p>
            <p class="tags" align="left">${post.tag}</p>
            <p class="description" align="left">${post.description}</p>
            <p class="location" align="left"><em>${post.location}</em></p>
            <p class="data" align="left"><em>${post.createdAt}</em></p>
            <div class="line">
            </div>
        </div>`
        }
        return`
        <div class="post">
            <p class="name-of-user" align="left">${post.author}</p>
            <img class="main-img" src="${post.photoLink}" alt=""/>
            <div class="header-row">
                <ul >
                    
                    <li>
                        <a class="photo-icon" target="_blank" href=""><i class="fa fa-heart-o"></i></a>
                    </li>
                    
                </ul>
            </div>
            <p class="likes" align="left"><b>${post.likes}</b></p>
            <p class="tags" align="left">${post.tag}</p>
            <p class="description" align="left">${post.description}</p>
            <p class="location" align="left"><em>${post.location}</em></p>
            <p class="data" align="left"><em>${post.createdAt}</em></p>
            <div class="line">
            </div>
        </div>`
    }

    getPostById(postID){
        return this.postsCollection.getPostByID(postID);
    }

    updateLent(){
        document.getElementById('posts').innerHTML='';
        let post;
        for(let i = 0; i < this.numOfPosts; i++){
            post = this.postsCollection._photoPosts[i];
            if (this.postsCollection.validatePost(post)){
                document.getElementById('posts').innerHTML = this.createHTMLPost(post) + document.getElementById('posts').innerHTML;
            }
        }
    }

    createNewId(){
        let nID = this.numOfPosts+1;
        if(this.getPostById(nID)){
            nID = nID+'9';
        }
        return nID;
    }

    addPhotoPost(post){
        if(this.postsCollection.validatePost(post) && this.postsCollection._photoPosts.findIndex((item)=>(item.id===post.id)) ===-1){
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

    removePhotoPost(id){
        if(this.postsCollection.getPostByID(id).author === this.currentUser) {
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
        let post = this.getPostById(id);
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



let View = new Viewer();

View.addPhotoPost({id: "20",
    description: "Figure skating at the Olympiad-2018!",
    createdAt: new Date("04-12-2018"),
    location:"Beijing, China",
    author: "Siri Rey",
    tag: ['apps', "sport"],
    photoLink: "images/image-2.jpg",
    likes: 1220});

View.removePhotoPost("2");

View.editPost("1", {description: "dfbjshfbwerfjnqkjfhbergu"});