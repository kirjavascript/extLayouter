let programmaticEdit = false;

import { loadView } from './view';

let editor = ace.edit("editor");

    editor.$blockScrolling = Infinity;
    editor.getSession().setUseWorker(false);
    editor.setTheme("ace/theme/kuroir");
    editor.getSession().setMode("ace/mode/json");
    editor.setOptions({fontSize: "12pt", wrap: true});
    editor.getSession().on('change', function() {

        !programmaticEdit &&
        loadView(editor.getValue());

    });

export function read() {
    return ace.edit("editor").getValue();
}

export function write(str, mode='html') {
    programmaticEdit = true;
    editor.setValue(str, -1);
    programmaticEdit = false;
}


