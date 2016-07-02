import { getGroup } from './extdata';
import { draw } from './index';

function getExtLayout(parent) {
    return {
        collapsed: false,
        parent
    }
}

function addMetadata(view) {
    view.forEach(d => {
        d.extLayout = getExtLayout(view);
        if (d.items) {
            addMetadata(d.items);
        }
    })
}

export function cleanView(data) {

    return JSON.stringify(data, function(key, value) {
        if (key == 'extLayout') {
            return;
        }
        return value;
    }, 4);

}

export function loadView(data) {

    let view = JSON.parse(data);

    addMetadata(view);

    draw({ view, updateEditor: false });

}

export function addComponent(data, xtype) {

    let node = data.items || data.extLayout.parent;

    let obj = {
        xtype,
        extLayout: getExtLayout(node)
    };

    if (getGroup(xtype) == 'folder') {
        obj.items = [];
    }

    node.unshift(obj);
}

export function copyComponent(data, i) {

    let node = data.extLayout.parent;

    let obj = JSON.parse(cleanView(data));

    addMetadata([obj]);

    node.splice(i, 0, obj);
}

let view = [{
    xtype: 'container',
    cls: 'main-panel',
    height: '100%',

    layout: {
        type: 'vbox',
        pack: 'stretch',
        align: 'stretch'
    },

    items: [
        // form
        {
            xtype: 'container',
            layout: 'hbox',
            cls: 'logo',

            items: [
                {
                    xtype: 'image',
                    itemId: 'image',
                    src: 'resources/images/logo.png',
                    docked: 'right'
                },
                {
                    itemId: 'venueSelection',
                    html: 'Select a Venue',
                    style: 'height: 35px;line-height: 35px;margin-left: 20px;'
                },
                {
                    xtype: 'image',
                    src: 'resources/images/icon-cog.png',
                    cls: 'cog',
                    itemId: 'cog',
                    docked: 'left'
                }
            ]
        },
        {
            xtype: 'container',
            height: 50,
            items: []
        },
        {
            xtype: 'fieldset',
            items: [
                {
                    xtype: 'selectfield',
                    name: 'title',
                    label: 'Title',
                    cls: 'text-input',
                    options: [
                        {text: 'Mr',  value: 'Mr'},
                        {text: 'Mrs',  value: 'Mrs'},
                        {text: 'Ms',  value: 'Ms'},
                        {text: 'Other',  value: ''}
                    ]
                },
                {
                    xtype: 'textfield',
                    name : 'name',
                    label: 'Name',
                    cls: 'text-input'
                },
                {
                    xtype: 'textfield',
                    name : 'postcode',
                    label: 'Post Code',
                    cls: 'text-input'
                },
                {
                    xtype: 'emailfield',
                    name : 'email',
                    label: 'Email',
                    cls: 'text-input'
                },
                {
                    xtype: 'datepickerfield',
                    name : 'dob',
                    label: 'Date Of Birth',
                    cls: 'text-input',
                    picker: {
                        yearFrom: 1900,
                        value: new Date(1990, 0, 1)
                    }
                },
                {
                    xtype: 'container',
                    cls: 'checkbox',

                    layout: {
                       type: 'hbox',
                       align: 'left',
                       pack: 'left'
                    },

                    items: [
                        {
                            xtype: 'checkboxfield',
                            name: 'checkTerms'
                        },
                        {
                            xtype: 'label',
                            cls: 'oneline',
                            html: 'I agree to the'
                        },
                        {
                            xtype: 'button',
                            text: 'terms and conditions',
                            itemId: 'showTerms',
                            cls: 'show-terms'
                        }
                    ]
                },
                {
                    xtype: 'container',
                    cls: 'checkbox',

                    layout: {
                       type: 'hbox',
                       align: 'left',
                       pack: 'left'
                    },

                    items: [
                        {
                            xtype: 'checkboxfield',
                            name : 'signup'
                        },
                        {
                            xtype: 'label',
                            cls: 'signup',
                            html: 'Please sign me up to emails so I can be the first to know about offers, special treats, events and news!'
                        }
                    ]
                }
            ]
        },
        // reset / next
        {
            xtype: 'container',
            cls: 'nav',
            layout: 'hbox',
            docked: 'bottom',

            items: [
                {
                    xtype: 'button',
                    text: 'Reset',
                    itemId: 'reset',
                    docked: 'left'
                },
                {
                    xtype: 'button',
                    text: 'Next',
                    itemId: 'startLoop',
                    docked: 'right'
                }
            ]
        }
    ]
}];

addMetadata(view);

export { view };