const posts2=[
    {
        id: "1",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-08-2018"),
        location:"Beijing, China",
        hashTags: ['masha'],
        author: "Lana Rey",
        photoLink: "images/image-1.jpg",
        likes: '100'
    },

    {
        id: "2",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-07-2018"),
        location:"Beijing, China",
        hashTags: ['apps', 'sport'],
        author: "Lana Rey",
        photoLink: "images/image-2.jpg",
        likes: '100'
    },

    {
        id: "3",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("07-12-2019"),
        location:"Beijing, China",
        hashTags: ['apps', "sport"],
        author: "Mara Rey",
        photoLink: "images/image-3.jpg",
        likes: '107'

    },

    {
        id: "4",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-02-2018"),
        location:"Beijing, China",
        author: "Vera Rey",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-4.jpg",
        likes: '100'
    },

    {
        id: "5",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("05-12-2018"),
        location:"Beijing, China",
        author: "Le Kel",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-1.jpg",
        likes: '100'
    },

    {
        id: "6",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-03-2018"),
        location:"Beijing, China",
        author: "Mara Rey",
        hashTags: ['apps', "masha"],
        photoLink: "images/image-5.jpg",
        likes: '100'
    },

    {
        id: "7",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("01-11-2018"),
        location:"Beijing, China",
        author: "Lana Heko",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-6.jpeg",
        likes: '100'
    },

    {
        id: "8",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-12-2018"),
        location:"Beijing, China",
        author: "Katy Sa",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-7.jpg",
        likes: '100'
    },

    {
        id: "9",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-12-2018"),
        location:"Beijing, China",
        author: "Sara Li",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-8.jpg",
        likes: '100'
    },

    {
        id: "10",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("08-12-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-9.jpg",
        likes: '100'
    },
    {
        id: "11",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-08-2018"),
        location:"Beijing, China",
        hashTags: ['masha'],
        author: "Mi Hao",
        photoLink: "images/image-1.jpg",
        likes: '100'
    },

    {
        id: "12",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-07-2018"),
        location:"Beijing, China",
        hashTags: ['apps', 'sport'],
        author: "Mi Hao",
        photoLink: "images/image-2.jpg",
        likes: '100'
    },

    {
        id: "13",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("07-12-2019"),
        location:"Beijing, China",
        hashTags: ['apps', "sport"],
        author: "Mi Hao",
        photoLink: "images/image11.jpg",
        likes: '107'

    },

    {
        id: "14",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-02-2018"),
        location:"Beijing, China",
        author: "Vera Rey",
        hashTags: ['apps', "sport"],
        photoLink: "images/image13.jpg",
        likes: '100'
    },

    {
        id: "15",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("05-12-2018"),
        location:"Beijing, China",
        author: "Le Kel",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-1.jpg",
        likes: '100'
    },

    {
        id: "16",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-03-2018"),
        location:"Beijing, China",
        author: "Mara Rey",
        hashTags: ['apps', "masha"],
        photoLink: "images/image16.jpg",
        likes: '100'
    },

    {
        id: "17",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("01-11-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        hashTags: ['apps', "sport"],
        photoLink: "images/image-6.jpeg",
        likes: '100'
    },

    {
        id: "18",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-12-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        hashTags: ['apps', "sport"],
        photoLink: "images/image18.png",
        likes: '100'
    },

    {
        id: "19",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-12-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        hashTags: ['apps', "sport"],
        photoLink: "images/image20.jpg",
        likes: '100'
    },

    {
        id: "20",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("08-12-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        hashTags: ['apps', "sport"],
        photoLink: "images/image19.jpg",
        likes: '100'
    }

];

if(localStorage.getItem(('posts')) === null){
    localStorage.setItem('posts', JSON.stringify(posts2));
    let arr = [];
    localStorage.setItem('likedPosts', JSON.stringify(arr));
    localStorage.setItem('posts_number', JSON.stringify(posts2.length));
}


