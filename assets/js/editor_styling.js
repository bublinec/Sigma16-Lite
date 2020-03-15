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
  const dataLang = editor.dataset.lang; // Detect "js", "html", "py", "bash", ...
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

