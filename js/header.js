let Btn = document.getElementById("header_riot_btn");
let Box = document.getElementById("header_riot_wrap");

Btn.addEventListener("click", function(){
    Box.style.display = "block";
})

Box.addEventListener("click", function(){
    Box.style.display = "none";
})



let btn2 = document.getElementById("header_w_s_lang_w");
let box2 = document.getElementById("header_w_s_lang_arr");


btn2.addEventListener("click", function(){
    box2.style.display = "block";
})

box2.addEventListener("click", function(){
    box2.style.display = "none";
})



let btn = document.getElementById("menu_btn");
let box = document.getElementById("header_w_s_m_menu_w");
let esc = document.getElementById("header_w_s_m_menu_esc");

btn.addEventListener("click", function(){
    box.style.display = "block";
})
esc.addEventListener("click", function(){
    box.style.display = "none";
})

