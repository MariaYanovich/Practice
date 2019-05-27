let tmp = document.getElementById('posts');
tmp.onclick = function(event) {
    if (event.target.classList.contains('fa fa-heart-o')) {
        postButtonsController.likeButtonHandle(event);
    }
    if(event.target.classList.contains('fa fa-trash')){
        postButtonsController.deleteButtonHandle(event);
    }
    if(event.target.classList.contains('fa fa-edit')){
        postButtonsController.editButtonHandle(event);
    }
};