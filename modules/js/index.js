import '../scss/index.scss'
import * as d3 from './util/d3';
import nodeEJS from '../html/node.html'; 
import addEJS from '../html/add.html'; 
import layoutEJS from '../html/layout.html'; 
import { view, cleanView, addComponent, copyComponent } from './view';
import { icons } from './icons';
import { xtypes, getGroup, layouts } from './extdata';
import { read, write } from './editor';

let treeView = d3.select('#treeView');

export function draw({ view, obj = treeView, updateEditor = true }) {

    updateEditor && write(cleanView(view));

    drawTree(obj, view);
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
            .html(node => nodeEJS({ node, icons, layout: node.extLayout, getGroup }))
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

            treeView
                .selectAll('.modal')
                .remove()

            let add = treeView
                .append('div')
                .attr('class', 'modal')
                .style('left', d3.event.clientX - 25 + 'px')
                .style('top', d3.event.clientY + 10 + 'px')
                .html(addEJS({ xtypes, icons }))

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

    selection
        .select('.layout')
        .on('click', function() {
            treeView
                .selectAll('.modal')
                .remove()

            let layout = treeView
                .append('div')
                .attr('class', 'modal')
                .style('left', d3.event.clientX - 25 + 'px')
                .style('top', d3.event.clientY + 10 + 'px')
                .html(layoutEJS({ icons, layouts }))

            layout.select('.cancel')
                .on('click', function() {
                    layout.remove();
                })
        })


// document layouts take object/string

// have group names in dropdowns
// finish extdata

// different icon for non folders?

// hover on component highlight code (mouseenter/mouseout)
}

draw({view});