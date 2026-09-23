import algWmsImage from "./assets/alg-wms.png";
import algShopImage from "./assets/algshop.png";
import algMusicImage from "./assets/algmusic.png";
import algMoviesImage from "./assets/algmovies.png";
import weddingImage from "./assets/wedding.png";

export const projects = [
    {
        number: '01',
        title: 'Alg-WMS',
        category: 'Warehouse Management System',
        description:
            'A full-stack warehouse management system built for managing products, inventory, and operational workflows.',
        technologies: ['React', 'Node.js', 'Prisma', 'TiDB'],
        type: 'wms',
        url: 'https://alg-wms.vercel.app',
        image: algWmsImage,
        featured: true,
    },
    {
        number: '02',
        title: 'AlgShop',
        category: 'E-Commerce Platform',
        description:
            'A modern e-commerce platform with product management, shopping flow, authentication, and order functionality.',
        technologies: ['Laravel', 'PHP', 'MySQL', 'React'],
        type: 'shop',
        url: 'https://algshop.vercel.app/',
        image: algShopImage,
        featured: true,
    },
    {
        number: '03',
        title: 'AlgMusic',
        category: 'Music Platform',
        description:
            'A music discovery and playback experience with search, playlists, library features, and an interactive player.',
        technologies: ['React', 'FastAPI', 'Python', 'MySQL'],
        type: 'music',
        url: 'https://algmusic.vercel.app/',
        image: algMusicImage,
        featured: true,
    },
    {
        number: '04',
        title: 'AlgMovies',
        category: 'Movie Catalog Platform',
        description:
            'A full-stack movie catalog with authentication, watchlists, search, and an admin content management system.',
        technologies: ['React', 'Node.js', 'Express', 'MySQL'],
        type: 'movies',
        url: 'https://algmovies.vercel.app',
        image: algMoviesImage,
        featured: false,
    },
    {
        number: '05',
        title: 'WeddingDyahAji',
        category: 'Interactive Wedding Invitation',
        description:
            'An interactive wedding invitation focused on visual design, animation, personalization, and guest interaction.',
        technologies: ['HTML', 'CSS', 'JavaScript', 'Firebase'],
        type: 'wedding',
        url: 'https://hamdoserfina-lab.github.io/WeddingDyahAji/',
        image: weddingImage,
        featured: false,
    },
];
