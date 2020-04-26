/*
  Helper functions to assist with templating
*/

const fs = require('fs');

// Helpful for debugging, console.log our data
exports.dump = (obj) => JSON.stringify(obj, null, 2);

// inserting an SVG
exports.icon = (name) => fs.readFileSync(`./public/images/icons/${name}.svg`);

// Some details about the site
exports.siteName = `One More Lamore(aux)`;

exports.menu = [
    { slug: '/albums', title: 'Albums', icon: 'photo', },
    { slug: '/stories', title: 'Stories', icon: 'stories', },
    { slug: '/registry', title: 'Registry', icon: 'gift', },
];