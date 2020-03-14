raw_code = `; Progra;m H;ello, world!
; A simple starter program for Sigma16

; Calculate result := 6 * x, where x = 7

     lea    R1,6[R0]       ; R1 := 6
     load   R2,x[R0]       ; R2 := x (variable initialized to 7)
     mul    R3,R1,R2       ; R3 := 6 * x = 42 (hex 002a)
     store  R3,result[R0]  ; result := 6 * x
     trap   R0,R0,R0       ; halt

; How to run the program:
;   (1) Click Assemble and Boot - circle-arrow button in the processor tab
;   (2) Run it - click Run button or Step for each instruction
;   (3) Have Fun!


; When the program halts, we should see the following:
;   R1 contains  6 (0006)
;   R2 contains  7 (0007)
;   R3 contains 42 (002a)
;   result contains 42 (002a)
;   result is in memory, and the assembly listing shows its address

; Variables are defined  after the program
x         data   7         ; initial value of x = 7
result    data   0         ; initial value of result = 0
`;


function add_class(str, class_name){
    // Return str with html span tag with given class
    return "<span class=\""+class_name+"\">"+str+"</span>";
}

function colorize (raw_code) {
    // Take Sigma16 code and return html styled code - with colors.
    lines = raw_code.split('\n')
    styled_lines = []
    for(var i=0; i<lines.length; i++){
        line_arr = lines[i].split(';')
        // Comment
        comment = ';' + line_arr.slice(1).join(';');
        comment = add_class(comment, "FIELDCOMMENT");
        // 


        styled_lines.push(line_arr[0]+comment);
    }
    return styled_lines.join('\n');
}

console.log(colorize(raw_code));

// document.querySelector("#peter_button").addEventListener("click", function(){
//     var editor = document.getElementById('EditorTextArea');
//     var raw_code = editor.textContent;
//     editor.innerHTML = colorize(raw_code);
//     console.log(colorize(raw_code));
    
// })


var editor = document.getElementById('EditorTextArea');
editor.addEventListener("input", function() {
    var raw_code = editor.textContent;
    editor.innerHTML = colorize(raw_code);
}, false);
