
//-------------------------------------------------------------------------------
// Editor styling
//-------------------------------------------------------------------------------

const lang = {
  js: {
    comm: /(\;.*)/g,
    coma: /(\,)/g,
    reg : /(?<=^|\s*)(R10|R11|R12|R13|R14|R15|R0|R1|R2|R3|R4|R5|R6|R7|R8|R9)/g,
    numb: /(\b\d\b)/g,
    data: /(?<=^|\s*)(data)/g,
    rx  : /(?<=^|\s*)(lea|load|store|jumpc0|jumpgt|jumpc1|jumpf|jumpt|jal|jump|testset|nop)/g,
    rrr : /(?<=^|\s*)(add|sub|mul|mul|cmplt|cmpeq|cmpgt|cmp|inv|xor|nop|trap|EXP|RX)/g,
    squa: /(\[|\])/g,
  },
};

const highLite = editor => {
  const dataLang = editor.dataset.lang; 
  const langObj = lang[dataLang]; // Extract object from lang regexes dictionary
  let html = editor.innerHTML;
  Object.keys(langObj).forEach(function(key) {
    html = html.replace(langObj[key], `<i class=${dataLang}_${key}>$1</i>`);
  });
  editor.previousElementSibling.innerHTML = html; // Finally, show highlights!
};

const editor = document.querySelector(".highLite_editable");

editor.contentEditable = true;
editor.spellcheck = false;
editor.autocorrect = "off";
editor.autocapitalize = "off";
editor.addEventListener("input", highLite.bind(null, editor));
editor.addEventListener("input", highLite.bind(null, editor));
highLite(editor); 


//-------------------------------------------------------------------------------
// Other:
//-------------------------------------------------------------------------------

// Color adjust -website form input
function changeColor () {
  var color_input = document.querySelector("input[type=color]")
  var new_color = color_input.value
  document.querySelector("body").style.setProperty('--main', new_color);    
}


// Load local file
function readSingleFile(e) {
  console.log("neemssssssssssssssssss");
  
  var file = e.target.files[0];
  if (!file) {
    return;
  }
  var reader = new FileReader();
  reader.onload = function(e) {
    var contents = e.target.result;
    displayContents(contents);
  };
  reader.readAsText(file);
}

function displayContents(contents) {
  document.querySelector(".highLite_colors").textContent = contents;
  document.querySelector(".highLite_editable").textContent = contents;
  highLite(editor);
  var filename = document.querySelector("#file_input").value.split(/(\\|\/)/g).pop().split('.')[0];
  document.querySelector("#file_name").value = filename;
}


//-------------------------------------------------------------------------------
// KEYBOARD SHORTCUTS - using shortcut library (mostly):
//-------------------------------------------------------------------------------

// TAB - prevent from leaving editor, insert spaces instead
editor.addEventListener("keydown", function onKeyDown(e) {
  if (e.keyCode === 9) { // tab key
      e.preventDefault();  // this will prevent us from tabbing out of the editor

      // now insert four non-breaking spaces for the tab key
      var doc = editor.ownerDocument.defaultView;
      var sel = doc.getSelection();
      var range = sel.getRangeAt(0);

      var tabNode = document.createTextNode("    ");
      range.insertNode(tabNode);

      range.setStartAfter(tabNode);
      range.setEndAfter(tabNode); 
      sel.removeAllRanges();
      sel.addRange(range);

      // higlite when spaces inserted
      highLite(editor); 
  }
})



// Save
shortcut.add("Ctrl+S",function() {
	editorDownload();
});

// Assemble and Boot
shortcut.add("Ctrl+B",function() {
	boot(emulatorState);
});

// Run
shortcut.add("Ctrl+R",function() {
  procRun(emulatorState);
});

// Step
shortcut.add("Ctrl+E",function() {
  procStep(emulatorState)
});

// Pause
shortcut.add("Ctrl+P",function() {
  procPause(emulatorState)
});

// Resize - right
shortcut.add("Ctrl+right",function() {
  user_guide_resize(20)
});

// Resize - left
shortcut.add("Ctrl+left",function() {
  user_guide_resize(-20)
});

// Guide
shortcut.add("Ctrl+G",function() {
  welcome_pane_button()
});

// Examples
shortcut.add("Ctrl+Q",function() {
  examples_pane_button()
});

// Open file
shortcut.add("Ctrl+O",function() {
  document.querySelector("#file_input").click()
});