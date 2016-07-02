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
        img: require('../icons/empty_trash.svg'),
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
    "add": {
        img: require('../icons/plus.svg'),
        class: 'pointer'
    },
    "ok": {
        img: require('../icons/checkmark.svg'),
        class: 'pointer'
    },
    "cancel": {
        img: require('../icons/cancel.svg'),
        class: 'pointer'
    },
    "copy": {
        img: require('../icons/copy.svg'),
        class: 'pointer'
    },
    "document": {
        img: require('../icons/document.svg'),
    },
    "image": {
        img: require('../icons/image.svg'),
    },
    "clock": {
        img: require('../icons/clock.svg'),
    },
    "field": {
        img: require('../icons/row.svg'),
    },
};

Object.keys(icons).forEach(d => {
    icons[d] = `<img src="${icons[d].img}" alt="${d}" class="icon ${d} ${icons[d].class||''}"/>`;
})

export { icons };