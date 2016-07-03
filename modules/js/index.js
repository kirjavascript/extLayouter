import '../scss/index.scss'
import * as d3 from './util/d3';
import nodeEJS from '../html/node.html'; 
import addEJS from '../html/add.html'; 
//import layoutEJS from '../html/layout.html'; 
import { view, cleanView, addComponent, copyComponent } from './view';
import { icons } from './icons';
import { xtypes, getGroup, layouts } from './extdata';
import { read, write } from './editor';

let treeView = d3.select('#treeView');

export function draw({ view, obj = treeView, updateEditor = true, JSONError }) {

    JSONErrorUI(JSONError);

    if (!JSONError) {
        updateEditor && write(cleanView(view));
        drawTree(obj, view);
    }
}

function drawTree(obj, data) {

    let branch = obj.selectAll('.item').data(data)

    branch.exit().remove();

    branch
        .enter()
        .append('div')
        .attr('class', 'item')
        .style('background-color', d => {
            return getGroup(d.xtype) == 'folder'?'#ffffe6':'#FFF'
        })
        //.each(function(d) {d.extLayout.node = this})
        .merge(branch)
        .call(drawMenu)
        .each(function (d) {
            d.items &&
            d3.select(this)
                .call(drawTree, d => d.items)
        })
        .call(collapse)
        .order()
}

function drawMenu(selection) {

    if (selection.select('.menu').empty()) {
        let menu = selection
            .append('div')
            .classed('menu',1)
            .call(setMenu)
    }
    else {
        selection.select('.menu')
            .call(setMenu);
    }
        
    function setMenu(selection) {
        selection
            .html(node => nodeEJS({ node, icons, layout: node.extLayout, getGroup, layoutData: getLayoutData(node) }))
            .call(addEvents);
    }
}

function collapse(selection) {
    selection
        .each(function(d) {
            if (d.extLayout.collapsed) {
                d3.select(this)
                    .selectAll('.item')
                    .remove()
            }
        })
}

function JSONErrorUI(error) {
    let selection = treeView.selectAll('.JSONError')
        .data(error?[error]:[]);
    selection.exit().remove();
    selection.enter()
        .insert('div','div')
        .attr('class', 'JSONError')
        .merge(selection)
        .html(d => d);
}

function getLayoutData(node) {
    if (typeof node.layout == 'undefined') {
        return {};
    }
    else if (typeof node.layout == "string") { 
        return { type: node.layout };
    }
    else {
        return node.layout;
    }
}

function setLayoutData(node, property, value) {
    if (property == 'type' && value == 'none') {
        delete node.layout;
    }
    else if (typeof node.layout == 'undefined' && property == 'type') {
        node.layout = value;
    }
    else if (typeof node.layout == 'undefined') {
        node.layout = {};
        node.layout[property] = value;
    }
    else if (typeof node.layout == 'string' && property == 'type') {
        node.layout = value;
    }
    else if (typeof node.layout == 'string') {
        node.layout = { type: node.layout };
        node.layout[property] = value;
    }
    else {
        node.layout[property] = value;
    }
}

function addEvents(selection) {
    selection
        .select('.collapse')
        .on('click', function(d) {
            d.extLayout.collapsed = !d.extLayout.collapsed;
            draw({view});
        })

    selection
        .select('.delete')
        .on('click', function(d,i) {
            d.extLayout.parent.splice(i,1);
            draw({view});
        })

    selection
        .select('.moveUp')
        .on('click', function(d,i) {
            if (i != 0) {
                [d.extLayout.parent[i-1],d.extLayout.parent[i]] = [d.extLayout.parent[i],d.extLayout.parent[i-1]];
                draw({view});
            }
        })

    selection
        .select('.moveDown')
        .on('click', function(d,i) {
            if (i != d.extLayout.parent.length-1) {
                [d.extLayout.parent[i+1],d.extLayout.parent[i]] = [d.extLayout.parent[i],d.extLayout.parent[i+1]];
                draw({view});
            }
        })

    selection
        .select('.copy')
        .on('click', function(d,i) {
            copyComponent(d, i);
            draw({view});
        })

    selection
        .select('.add')
        .on('click', function(d) {

            let add = treeView
                .selectAll('.modal')
                .data([1]);

            add = add.enter()
                .append('div')
                .attr('class', 'modal')
                .html(addEJS({ xtypes, icons }))
                .merge(add)
                .style('left', d3.event.clientX - 25 + 'px')
                .style('top', d3.event.clientY + 10 + 'px')

            add.select('.cancel')
                .on('click', function() {
                    add.remove();
                })

            let xtype = add.select('.xtype');

            let xtypeLookup = add.select('.xtypeLookup')
                .on('change', function() {
                    let value = xtypeLookup.property('value');
                    xtype.property('value', value)
                    xtypeLookup.node().selectedIndex = 0;
                })

            add.select('.ok')
                .on('click', function() {
                    addComponent(d, xtype.property('value'))
                    add.remove();
                    draw({view});
                })
        })

    let layout = selection.select('.layoutData');

    layout.select('.type')
        .on('click', function(d) {
            let type = d3.select(this).selectAll('.dropdown')
                .data([1]);

                console.log(this)

            type.enter()
                .insert('div','div')
                .attr('class', 'dropdown')
                .selectAll('.option')
                .data(layouts.type)
                .enter()
                .append('div')
                .attr('class','option')
                .html(d => d)
                .on('click', function(opt) {
                    setLayoutData(d, 'type', opt);
                    draw({view});
                })

            type = type.merge(type);

            outerClick('.dropdown');
        })

    layout.select('.pack')
        .on('click', function(d) {
            let type = d3.select(this).selectAll('.dropdown')
                .data([1]);

            type.enter()
                .insert('div','div')
                .attr('class', 'dropdown')
                .selectAll('.option')
                .data(layouts['pack'])
                .enter()
                .append('div')
                .attr('class','option')
                .html(d => d)
                .on('click', function(opt) {
                    setLayoutData(d, 'pack', opt);
                    draw({view});
                })

            type = type.merge(type);

            outerClick('.dropdown');
        })

    layout.select('.align')
        .on('click', function(d) {
            let type = d3.select(this).selectAll('.dropdown')
                .data([1]);

            type.enter()
                .insert('div','div')
                .attr('class', 'dropdown')
                .selectAll('.option')
                .data(layouts['align'])
                .enter()
                .append('div')
                .attr('class','option')
                .html(d => d)
                .on('click', function(opt) {
                    setLayoutData(d, 'align', opt);
                    draw({view});
                })

            type = type.merge(type);

            outerClick('.dropdown');
        })

// GENERICISE THE DROPDOWN, FFS

// document layout take object/string

// have group names in dropdowns
// finish extdata
// view JSON modal

// different icon for non folders?
// cleanView set order keys

// hover on component highlight code (mouseenter/mouseout)
}

//let dropClick = false;

function outerClick(selector) {
    let dropClick = true;

    let body = d3.select(document.body);
    
    body.on('click', function() {
        if (!dropClick) {
            d3.selectAll(selector).remove();
            body.on('click', null)
        }
        dropClick = false;
    })
}

draw({view});