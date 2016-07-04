var icons = {
    'arrRight': {
        img: require('../icons/next.svg'),
        class: 'collapse pointer'
    },
    'arrDown': {
        img: require('../icons/expand.svg'),
        class: 'collapse pointer'
    },
    'delete': {
        img: require('../icons/empty_trash.svg'),
        class: 'pointer'
    },
    'moveUp': {
        img: require('../icons/up.svg'),
        class: 'pointer'
    },
    'moveDown': {
        img: require('../icons/down.svg'),
        class: 'pointer'
    },
    'add': {
        img: require('../icons/plus-circle.svg'),
        class: 'pointer'
    },
    'ok': {
        img: require('../icons/checkmark.svg'),
        class: 'pointer'
    },
    'cancel': {
        img: require('../icons/cancel.svg'),
        class: 'pointer'
    },
    'copy': {
        img: require('../icons/copy.svg'),
        class: 'pointer'
    },
    'layout': {
        img: require('../icons/arrows.svg'),
        class: 'pointer'
    },
    'pack': {
        img: require('../icons/four-squares.svg'),
        class: 'pointer'
    },
    'align': {
        img: require('../icons/collect.svg'),
        class: 'pointer'
    },
    'dock': {
        img: require('../icons/rectangle.svg'),
        class: 'pointer'
    },
    'flex': {
        img: require('../icons/process.svg'),
        class: 'pointer'
    },
    'folder': {
        img: require('../icons/opened_folder.svg')
    },
    'document': {
        img: require('../icons/document.svg')
    },
    'image': {
        img: require('../icons/image.svg')
    },
    'clock': {
        img: require('../icons/clock.svg')
    },
    'field': {
        img: require('../icons/row.svg')
    }
};

Object.keys(icons).forEach(d => {
    icons[d] = `<img src="${icons[d].img}" alt="${d}" title="${d}" class="icon ${d} ${icons[d].class||''}"/>`;
});

export { icons };