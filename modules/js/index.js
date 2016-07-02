import '../scss/index.scss'
import * as d3 from './util/d3';
import nodeEJS from '../html/node.html'; 
import { view } from './data';
import { icons } from './icons';

let treeView = d3.select('#treeView');

function draw(obj, data) {

    let branch = obj.selectAll('.item').data(data)

    branch.exit().remove();

    branch
        .enter()
        .append('div')
        .attr('class', d => `item${' xtype-'+d.xtype||''}`)
        .each(function(d) {d.extLayout.node = this})
        .merge(branch)
        .call(drawMenu)
        .each(function (d) {
            d.items &&
            d3.select(this)
                .call(draw, d => d.items)
        })
        .call(collapse)
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
            .html(node => nodeEJS({node, icons, layout: node.extLayout}))
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
    let collapse = selection
        .select('.collapse')
        .on('click', function(d) {
            d.extLayout.collapsed = !d.extLayout.collapsed;
            draw(treeView, view);
        })

    // add id to nodes?
    // selection sort
    // checkbox?
    // don't allow changing xtype
    // post processor for output stripping _extLayouter & unchecked

    // slide in editor

    // on end, add
}

// load view
// edit via databind (!)

draw(treeView, view);