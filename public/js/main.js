var burger = document.querySelector(".burger");
var menuList = document.querySelector(".menu-list");
var navLinks = document.querySelectorAll(".menu-list li");


burger.addEventListener("click", function(){
    menuList.classList.toggle("menu-active")

    // Fade Animation
    navLinks.forEach(function(link, index){
        if(link.style.animation){
            link.style.animation = ""
        } else {
            link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`
        }
    });

    // Burger Animation
    burger.classList.toggle("toggle");
})