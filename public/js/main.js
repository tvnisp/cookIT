var menuItems  = document.querySelectorAll(".main-nav ul li"),
    burger     = document.querySelector(".burger"),
    menuList   = document.querySelector(".main-nav ul"),
    activePage = Array.prototype.slice.call(document.querySelectorAll(".main-nav ul li a")),
    scroll     = document.querySelector(".scrollTop")


// Burger - Menu

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

// Check and add Active class to active page
function urlCheck(){
    if(window.location.pathname == "/") {
        activePage[0].classList.add("active")
    } else if(window.location.pathname.includes("recipes")){
        activePage[1].classList.add("active")
    } else if (window.location.pathname.includes("register")){
        activePage[3].classList.add("active")
    } else if (window.location.pathname.includes("login")){
        activePage[2].classList.add("active")
    }
}
urlCheck();

// Navigation bar scroll effect
$(window).scroll(function(){
    if ($(document).scrollTop() > 50){
        $(".main-nav").addClass("scrollNav");
    } else {
        $(".main-nav").removeClass("scrollNav");
    }
})


// ScrollTop effect
scroll.addEventListener("click", function(){
    $("html, body").animate({
        scrollTop: 0
    }, 800)
})


