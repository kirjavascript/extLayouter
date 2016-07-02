var icons = {
    "folder": {
        img: require('../icons/folder.svg')
    },
    "arrRight": {
        img: require('../icons/next.svg'),
        class: 'collapse pointer'
    },
    "arrDown": {
        img: require('../icons/expand.svg'),
        class: 'collapse pointer'
    },
    "edit": {
        img: require('../icons/edit.svg'),
        class: 'pointer'
    },
    "delete": {
        img: require('../icons/delete.svg'),
        class: 'pointer'
    },
    "moveUp": {
        img: require('../icons/up.svg'),
        class: 'pointer'
    },
    "moveDown": {
        img: require('../icons/down.svg'),
        class: 'pointer'
    },
};

Object.keys(icons).forEach(d => {
    icons[d] = `<img src="${icons[d].img}" alt="${d}" class="icon ${d} ${icons[d].class||''}"/>`;
})

export { icons };