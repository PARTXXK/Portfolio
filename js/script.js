// for Javascript files, if needed
/*===== Menu Show y hidden =====*/
const navMenu = document.getElementById('nav-menu'),
    toggleMenu = document.getElementById('nav-toggle'),
    closeMenu = document.getElementById('nav-close')

// Show
toggleMenu.addEventListener('click', ()=>{
    navMenu.classList.toggle('show')
})

// Hide
closeMenu.addEventListener('click', ()=>{
    navMenu.classList.remove('show')
})

/*===== Remove Manu =====*/
const navLink = document.querySelectorAll('.nav_link')

function  linkAction(){
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*===== Scroll Sections Active Link =====*/
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive(){
    const scrollY = window.pageYOffset

    sections.foreach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50
        sectionId = current.getAttribute('id')

        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight){
            document.querySelector('.nav_menu a[href*='+ sectionId +']').classList.add('active')
        }else{
            document.querySelector('.nav_menu a[href*='+ sectionId +']').classList.remove('active')
        }
    })
}
