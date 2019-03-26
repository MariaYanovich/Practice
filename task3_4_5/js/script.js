'use strict';

var modul = (function () {
    var postArray = [];

    var currentUser = null;

    function rebuild() {
        document.getElementById("postsle").innerHTML = '';

        for (let i = 0; i < postArray.length; i++) {
            if (postArray[i].display === true) {
                document.getElementById("postsle").innerHTML += print(postArray[i]);
            }
        }
    }

    function add(post) {
        if (valid(post)) {
            postArray.push(post);
            document.getElementById("postsle").innerHTML += print(post);
            return true;
        }
        console.log('invalid post');
        return false;
    }

    function get(id) {
        return postArray.find((post) => {
            if (post.id === id) {
                return true;
            }
            return false;
        });
    }

    function valid(post) {
        return !(!(typeof(post.id) === 'string') ||
            !(typeof(post.description) === 'string') ||
            !(post.createdAt instanceof Date) ||
            !(typeof(post.author) === 'string'));
    }

    function hide(id) {
        let post = postArray.find((post) => {
            if (post.id === id) {
                return true;
            }
            return false;
        });

        if (post) {
            post.display = false;
            rebuild();
            return true;
        }
        return false;
    }

    function edit(id, config) {
        let post = postArray.find((post) => {
            if (post.id === id) {
                return true;
            }
            return false;
        });

        if (post && post.author === currentUser) {
            post.descriprion = config.description;
            // postArray[i].createdAt = new Date();
            // postArray[i].path = config.path;

            rebuild();
            return true;
        }
        return false;
    }

    function getPhotoPosts(skip = 0, top = 10, filterConfig){
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

    function print(post){
        if (currentUser === post.author) {
            return `<div class="post">
                    <header class="post_header_current">
                        <img class = "av" src= "pictures/${post.author}.jpeg">
                        <h3 class="author_name">${post.author}</h3>
                        <a>edit</a><button>X</button>
                    </header>
                    
                    <img class = "content" src= "${post.path}">
                    <nav>
                        <img class="like" src="pictures/liked.png" title="like">
                        ${(post.likers).length} likes + ${hashtags(post)}
                    </nav> 
                   ${post.description} ${post.createdAt}
                </div>`;
        }
        return `<div class="post">
                    <header class="post_header">
                        <img class = "av" src= "pictures/${post.author}.jpeg">
                        <h3 class="author_name">${post.author}</h3>
                    </header>
                    <img class = "content" src= "${post.path}">
                    <nav>
                        <img class="like" src="pictures/unliked.png" title="like">
                        ${(post.likers).length} likes + ${hashtags(post)}
                    </nav> 
                   ${post.description} ${post.createdAt}
                </div>`;
    }

    function ifLiked(post) {
        let t = (post.likers).findIndex((str) => {
            if (str === currentUser) {
                return true;
            }
            return false;
        });

        if (t!==-1){
            return true;
        }
        return false;
    }


    function hashtags(post) {
        let buf = '';

        for (let i = 0; i < (post.tag).length; i++) {
            buf += ' #';
            buf += post.tag[i];
        }
        return buf;
    }

    function change(user) {
        if(typeof(user) === 'string'){
            currentUser = user;
            rebuild();
            return true;
        }
        return false;

    }

    return {
        getPhotoPosts: getPhotoPosts,
        validatePhotoPost: valid,
        removePhotoPost: hide,
        editPhotoPost: edit,
        addPhotoPost: add,
        changeUser: change,
    }
})();


//добавление постов
modul.addPhotoPost({
    id: '0000001',
    description: 'Если кот живет у одинокой женщины, ему достаются вся ее нерастраченная нежность и забота. Если кот живет у одинокого холостяка, он отгребает по полной за все и за всех…',
    createdAt: new Date(),
    author: 'Murrrzik',
    path: 'https://cdn.fishki.net/upload/post/2017/03/19/2245758/tn/02-funny-cat-wallpapercat-wallpaper.jpg',
    display: true,
    tag: ['meow', 'murrr', 'ksskssss'],
});
modul.addPhotoPost({
    id: '0000002',
    description: 'Если ты открываешь дверь коту, но он не хочет выходить, значит он впускает к тебе кого-то еще.\n' +
        ' Того, на кого он смотрит ночью, уставясь в пустой угол.\n',
    createdAt: new Date(),
    author: 'ProstoVaSya',
    path: 'https://img03.rl0.ru/713339df632eda7df596ba65d6a38e69/765x525/news.rambler.ru/img/2018/01/24190213.165055.1818.jpg',
    display: true,
    tag: ['meow', 'murrr', 'ksskssss'],
});
modul.addPhotoPost({
    id: '0000003',
    description: 'На ресепшене кошачьего отеля:\n' +
        '- У нас есть картонная коробка за 30$, корзина для белья за 50$. Также у нас есть верх холодильника - наш пентхаус за 125$.',
    createdAt: new Date(),
    author: 'BadCat',
    path: 'https://medialeaks.ru/wp-content/uploads/2017/10/catbread-03-600x400.jpg',
    display: true,
    tag: ['meow', 'murrr', 'ksskssss'],
});
modul.addPhotoPost({
    id: '0000004',
    description: 'В магазин "Твоя личная жизнь" завезли 40 кошек.',
    createdAt: new Date(),
    author: 'ServelatMyslytel',
    path: 'http://cdn.tvc.ru/pictures/mood/o/149/60.jpg',
    display: true,
    tag: ['meow', 'murrr', 'ksskssss'],
});
modul.addPhotoPost({
    id: '0000005',
    description: 'У нас в семье есть такое понятие "котолич" - это значит к тебе на ручки пришёл кот, и потому ты временно недееспособен.',
    createdAt: new Date(),
    author: 'MurRRka',
    path: 'https://img.tsn.ua/cached/1448032823/tsn-e7757395fe937525edc97f670924f9cf/thumbs/1200x630/68/dd/bc7b14f35f677b3c6aa6c383516add68.jpg',
    display: true,
    tag: ['meow', 'murrr', 'ksskssss'],
});
modul.changeUser('ProstoVaSya');
modul.editPhotoPost('0000002', {
    description: 'Если ты открываешь дверь коту, но он не хочет выходить, значит он впускает к тебе кого-то еще.\n' +
        ' Того, на кого он смотрит ночью, уставясь в пустой угол++++++++++.\n'
});
modul.removePhotoPost('0000003');
modul.toLike(modul.getPhotoPosts('0000001'));
modul.toLike(modul.getPhotoPosts('0000005'));