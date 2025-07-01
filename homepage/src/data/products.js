// homepage/src/data/products.js

export const products = [
  {
    id: 'book-1',
    type: 'Book',
    name: 'The Fiddler\'s Fakebook',
    author: 'David Kaynor',
    price: 2499, // in cents
    image: '/images/fiddlers-fakebook.jpg',
    description: 'The ultimate resource for folk fiddlers. Contains nearly 500 tunes.',
    inventory: 15,
  },
  {
    id: 'book-2',
    type: 'Book',
    name: 'Irish Fiddle Solos',
    author: 'Pete Cooper',
    price: 1999,
    image: '/images/irish-fiddle-solos.jpg',
    description: '64 classic tunes for the solo fiddler, with guitar chords.',
    inventory: 25,
  },
  {
    id: 'cd-1',
    type: 'CD',
    name: 'The High Lonesome Sound',
    artist: 'Bill Monroe',
    price: 1499,
    image: '/images/high-lonesome-sound.jpg',
    description: 'The foundational sound of bluegrass fiddle from the master himself.',
    inventory: 30,
  },
  {
    id: 'cd-2',
    type: 'CD',
    name: 'Now That\'s What I Call Fiddlin\'',
    artist: 'Various Artists',
    price: 1299,
    image: '/images/now-thats-fiddlin.jpg',
    description: 'A compilation of the greatest fiddle tracks of all time.',
    inventory: 50,
  },
]; 