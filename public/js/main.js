var menuItems = document.querySelectorAll(".main-nav ul li");
var burger = document.querySelector(".burger");
var menuList = document.querySelector(".main-nav ul");
var active = document.querySelectorAll(".main-nav ul li a");
var activeArr = Array.prototype.slice.call(active);

    menuItems.forEach(function(item, index){
        item.style.animation = `slideIn 0.3s ease forwards ${index /7 }s`
    })

    $(window).resize(function(){
        if ($(window).width() > 950) {
            menuList.classList.remove("main-nav-active")
        }
         else {
        }
    })
    
    menuList.addEventListener("click", function(){
        menuList.classList.remove("main-nav-active")
    })

    burger.addEventListener("click", function(){
        menuList.classList.toggle("main-nav-active")
    })

function urlCheck(){
    if(window.location.pathname == "/") {
        activeArr[0].classList.add("active")
    } else if(window.location.pathname == "/recipes"){
        activeArr[1].classList.add("active")
    }
}

urlCheck()

// Navigation bar scroll effect
$(window).scroll(function(){
    if ($(document).scrollTop() > 50){
        $(".main-nav").addClass("scrollNav");
    } else {
        $(".main-nav").removeClass("scrollNav");
    }
})