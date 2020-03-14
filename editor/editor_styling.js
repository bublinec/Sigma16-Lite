const lang = {
  js: {
    comm: /(\;.*)/g,
    coma: /(\,)/g,
    reg : /(?<=^|\s*)(R10|R11|R12|R13|R14|R15|R0|R1|R2|R3|R4|R5|R6|R7|R8|R9)/g,
    numb: /(\b\d\b)/g,
    data: /(?<=^|\s*)(data)/g,
    rx  : /(?<=^|\s*)(lea|load|store|jumpc0|jumpgt|jumpc1|jumpf|jumpt|jal|jump|testset|nop)/g,
    rrr : /(?<=^|\s*)(add|sub|mul|mul|div|cmplt|cmpeq|cmpgt|cmp|inv|and|xor|nop|trap|EXP|RX)/g, // Declarations
    pare: /(\(|\))/g,
    squa: /(\[|\])/g,
    curl: /(\{|\})/g,

  },

  // Props order matters! Here I rely on "tags:"
  // being already applied in the previous iteration
  html: {
    tags: /(?<=&lt;(?:\/)?)(\w+)(?=\s|\&gt;)/g,
    angl: /(&lt;\/?|&gt;)/g,
    attr: /((?<=<i class=html_tags>\w+<\/i>)[^<]+)/g,
  }
};

const highLite = el => {
  const dataLang = el.dataset.lang; // Detect "js", "html", "py", "bash", ...
  const langObj = lang[dataLang]; // Extract object from lang regexes dictionary
  let html = el.innerHTML;
  Object.keys(langObj).forEach(function(key) {
    html = html.replace(langObj[key], `<i class=${dataLang}_${key}>$1</i>`);
  });
  el.previousElementSibling.innerHTML = html; // Finally, show highlights!
};

const editors = document.querySelectorAll(".highLite_editable");
editors.forEach(el => {
  el.contentEditable = true;
  el.spellcheck = false;
  el.autocorrect = "off";
  el.autocapitalize = "off";
  el.addEventListener("input", highLite.bind(null, el));
  el.addEventListener("input", highLite.bind(null, el));
  highLite(el); // Init!
});