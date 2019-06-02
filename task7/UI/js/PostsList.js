const photoPosts=[
    {
        id: "1",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-08-2018"),
        location:"Beijing, China",
        tag: ['masha'],
        author: "Lana Rey",
        photoLink: "images/image-1.jpg",
        likes: 100
    },

    {
        id: "2",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-07-2018"),
        location:"Beijing, China",
        tag: ['apps', 'sport'],
        author: "Lana Rey",
        photoLink: "images/image-2.jpg",
        likes: 110
    },

    {
        id: "3",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("07-12-2019"),
        location:"Beijing, China",
        tag: ['apps', "sport"],
        author: "Mara Rey",
        photoLink: "images/image-3.jpg"
    },

    {
        id: "4",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-02-2018"),
        location:"Beijing, China",
        author: "Vera Rey",
        tag: ['apps', "sport"],
        photoLink: "images/image-4.jpg",
        likes: 100
    },

    {
        id: "5",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("05-12-2018"),
        location:"Beijing, China",
        author: "Le Kel",
        tag: ['apps', "sport"],
        photoLink: "images/image-1.jpg",
        likes: 100
    },

    {
        id: "6",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("11-03-2018"),
        location:"Beijing, China",
        author: "Mara Rey",
        tag: ['apps', "masha"],
        photoLink: "images/image-5.jpg",
        likes: 100
    },

    {
        id: "7",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("01-11-2018"),
        location:"Beijing, China",
        author: "Lana Heko",
        tag: ['apps', "sport"],
        photoLink: "images/image-6.jpeg",
        likes: 100
    },

    {
        id: "8",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("03-12-2018"),
        location:"Beijing, China",
        author: "Katy Sa",
        tag: ['apps', "sport"],
        photoLink: "images/image-7.jpg",
        likes: 100
    },

    {
        id: "9",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("10-12-2018"),
        location:"Beijing, China",
        author: "Sara Li",
        tag: ['apps', "sport"],
        photoLink: "images/image-8.jpg",
        likes: 100
    },

    {
        id: "10",
        description: "Figure skating at the Olympiad-2018!",
        createdAt: new Date("08-12-2018"),
        location:"Beijing, China",
        author: "Mi Hao",
        tag: ['apps', "sport"],
        photoLink: "images/image-9.jpg",
        likes: 100
    }


];

if(localStorage.getItem(('posts')) === null){
    localStorage.setItem('posts', JSON.stringify(photoPosts));
    localStorage.setItem('posts_number', JSON.stringify(photoPosts.length));
}