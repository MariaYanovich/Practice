let p = (function () {
  var countOfPosts = 0;
  return {

    addPosts() {
      if (posts = collection.getPage({}, 10, countOfPosts)) {
        h.addPosts(posts);
        countOfPosts += 10;
      }
    },
    deletePost(id) {
      if (collection.remove(id)) {
        h.deletePost(id);
      }
    },
    editPost(id, obj) {
      if (collection.edit(id, obj)) {
        h.editPostFormActivate(id, obj);
      }
    },
    enter(username) {
      document.querySelector(".authorizationForm").style.display = "none";
      h.setUser(username);
      h.reloadPage(collection.getPage({}, 10, countOfPosts));
      countOfPosts = 0;
    },
    exit() {
      h.logOut();
    },
    authorizationFormActivate(){
      document.querySelector(".content").style.display = "none";
      document.querySelector(".authorizationForm").style.display = "flex";
    }

  }
}());

class View {
  constructor() {

    this._currentUsername = false;

  }

  addPost(post) {
    if(!post.isDeleted) {
      var postElem = this.createPost(post);
      const container = document.querySelector('.content');
      container.insertBefore(postElem, container.firstElementChild);
    }
  }

  addPosts(posts) {
    let createPost = this.createPost.bind(this);
    const container = document.querySelector('.content');
    posts.forEach(function(elem){
      if(!posts.isDeleted) {
        let post = createPost(elem);
        container.appendChild(post);
      }
    });
  }

  createPost(post) {
    let template = document.getElementById('postTemplate');
    template.content.querySelector('h2').textContent = post.author;
    let dataAndTimeClass = template.content.querySelector('h3')
    dataAndTimeClass.textContent = this._formatDate(post.createdAt);
    template.content.querySelector('img').src = post.photoLink;
    template.content.querySelector('p.description').textContent = post.description;
    template.content.querySelector('div').setAttribute('id', post.id);
    let newPost = document.importNode(template.content, true);
    if (post.hashTags && post.hashTags.length !== 0) {
      let tags = document.createElement('p');
      tags.className = 'hashTag';
      tags.innerHTML = post.hashTags.join(' ');
      newPost.querySelector('div.post').appendChild(tags);
    }
    if (post.author === this._currentUsername) {
      let delBtn = newPost.querySelector('.deletePostButton');
      delBtn.style.visibility = 'visible';
      let editBtn = newPost.querySelector('.settings');
      editBtn.style.visibility = 'visible';
    }
    if(post.likes.find(elem =>{
      if(elem == this._currentUsername) {
        return true;
      }
      return false;
    })){
      let likeBtn = newPost.querySelector(".like_button").firstElementChild;
      likeBtn.style="color:red";
    }
    return newPost;
  }

  reloadPage(photoPosts) {
    let f2 = this.createPost.bind(this);
    let content = document.createElement('div');
    content.setAttribute('class', 'content');
    photoPosts.forEach(elem => content.appendChild(f2(elem)));
    document.body.replaceChild(content, document.querySelector('div.content'));
  }

  deletePost(id) {
    let elem = document.getElementById(id);
    elem.style.display = "none";
  }

  editPost(id, obj) {
    let elem = document.getElementById(id);
    if (elem) {
      if (obj.description) {
        elem.querySelector('.description').innerHTML = obj.description;
      }
      if (obj.hashTags) {
        elem.querySelector('.hashTag').innerHTML = obj.hashTags.join(" ");
      }
      if (obj.photoLink) {
        elem.querySelector('img').src = obj.photoLink;
      }

    }
  }

  _formatDate(date) {
    date = new Date(date);
    var dd = date.getDate();
    if (dd < 10) dd = '0' + dd;

    var mm = date.getMonth() + 1;
    if (mm < 10) mm = '0' + mm;

    var yy = date.getFullYear() % 100;
    if (yy < 10) yy = '0' + yy;

    return dd + '.' + mm + '.' + yy;
  }

  setUser(username) {
    this._currentUsername = username;
    document.getElementById('log_in').style.display = "none";
    let exit_btn = document.getElementById('exit_button');
    exit_btn.innerHTML = username;
    exit_btn.style.display = "inline-block";
    document.querySelector(".new_Post").style.visibility = "visible";
    document.querySelector(".More_posts").style.display = "block";

  }
  exit(){
    this.removeLikes();
    document.getElementById('exit_button').style.display = "none";
    document.getElementById('log_in').style.display = "inline-block";
    document.querySelector(".new_Post").style.visibility = "hidden";
    let delBtn = document.querySelectorAll(".deletePostButton");
    let posts = document.querySelectorAll('.post');
    Array.prototype.forEach.call(posts, (elem) => {
      elem.querySelector('.deletePostButton').style.visibility = 'hidden';
      elem.querySelector('.settings').style.visibility = 'hidden';
    });
    localStorage.removeItem("user");
    this._currentUsername=false;
  }
  removeLikes(){
    let likes = document.querySelectorAll(".fa.fa-heart");
    Array.prototype.forEach.call(likes,(elem)=>{
      elem.style="color:#9E9C9C";
    })
  }
}