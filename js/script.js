/* ==  ABOUT SECTION TABS  == */
(() => {
    const aboutSection = document.querySelector(".about-section"),
    tabsContainer = document.querySelector(".about-tabs");

    tabsContainer.addEventListener("click", (event) => {
        /* if event.target contains 'tab-item' class and not contains
            'active' class */
        if (event.target.classList.contains("tab-item") &&
            !event.target.classList.contains("active")) {
                const target = event.target.getAttribute("data-target");
                // deactivate existing active 'tab-item'
                tabsContainer.querySelector(".active").classList.remove("outer-shadow","active");
                // activate new 'tab-item'
                event.target.classList.add("active","outer-shadow");
                // deactivate existing active 'tab-content'
                aboutSection.querySelector(".tab-content.active").classList.remove("active");
                // activate new 'tab-content'
                aboutSection.querySelector(target).classList.add("active");
        }
    })
})();

function bodyScrollingToggle() {
    document.body.classList.toggle("hidden-scrolling");
}


/* ==  PROJECTS FILTER AND POPUP  == */
(() =>{
    const filterContainer = document.querySelector(".projects-filter"),
    projectsItemsContainer = document.querySelector(".projects-items"),
    projectsItems = document.querySelectorAll(".projects-item"),
    popup = document.querySelector(".projects-popup"),
    prevBtn = popup.querySelector(".pp-prev"),
    nextBtn = popup.querySelector(".pp-next"),
    closeBtn = popup.querySelector(".pp-close"),
    projectDetailsContainer = popup.querySelector(".pp-details"),
    projectDetailsBtn = popup.querySelector(".pp-project-details-button");
    let itemIndex, slideIndex, screenshots;

    /* filter projects items */
    filterContainer.addEventListener("click", (event)=>{
        if(event.target.classList.contains("filter-item") && !event.target.classList.contains("active")){
            console.log("true");
            // deactivate existing active 'filter-item'
            filterContainer.querySelector(".active").classList.remove("outer-shadow", "active");
            // activate new 'filter-item'
            event.target.classList.add("active", "outer-shadow");
            const target = event.target.getAttribute("data-target");
            projectsItems.forEach((item) => {
                if(target === item.getAttribute("data-category") || target === 'all'){
                    item.classList.remove("hide");
                    item.classList.add("show");
                }
                else{
                    item.classList.remove("show");
                    item.classList.add("hide");
                }
            })

        }
    })

    projectsItemsContainer.addEventListener("click", (event) =>{
        if(event.target.closest(".projects-item-inner")){
            const projectsItem = event.target.closest(".projects-item-inner").parentElement;
            // get the projectsItem index
            itemIndex = Array.from(projectsItem.parentElement.children).indexOf(projectsItem);
            screenshots = projectsItems[itemIndex].querySelector(".projects-item-img img").getAttribute("data-screenshots");
            // convert screenshots into Array
            screenshots = screenshots.split(",");
            if(screenshots.length === 1){
                prevBtn.style.display="none";
                nextBtn.style.display="none";
            }
            else{
                prevBtn.style.display="block";
                nextBtn.style.display="block";
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener("click", () =>{
        popupToggle();
        if(projectDetailsContainer.classList.contains("active")){
            popupDetailsToggle();
        }
    })

    function popupToggle(){
        popup.classList.toggle("open");
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector(".pp-image");
        // activate loader until the popImg loads
        popup.querySelector(".pp-loader").classList.add("active");
        popupImg.src = imgSrc;
        popupImg.onload = () =>{
            // deactivate loader after the popImg loads
            popup.querySelector(".pp-loader").classList.remove("active");
        }
        popup.querySelector(".pp-counter").innerHTML = (slideIndex+1) + " of " + screenshots.length;
    }

    // next slide
    nextBtn.addEventListener("click", () =>{
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
    })

    // previous slide
    prevBtn.addEventListener("click", () =>{
        if(slideIndex === 0){
            slideIndex = screenshots.length-1;
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
    })

    function popupDetails(){
        // if projects-item-details not existing
        if(!projectsItems[itemIndex].querySelector(".projects-item-details")){
            projectDetailsBtn.style.display = "none";
            return; /* end function execution */
        }
        projectDetailsBtn.style.display = "block";
        // get the project details
        const details = projectsItems[itemIndex].querySelector(".projects-item-details").innerHTML;
        // set the project details
        popup.querySelector(".pp-project-details").innerHTML = details;
        // get the project title
        const title = projectsItems[itemIndex].querySelector(".projects-item-title").innerHTML;
        // set the project title
        popup.querySelector(".pp-title h2").innerHTML = title;
        // get the project category
        const category = projectsItems[itemIndex].getAttribute("data-category");
        // set the project category
        popup.querySelector(".pp-project-category").innerHTML = category.split("-").join(" ");
    }

    projectDetailsBtn.addEventListener("click", () =>{
        popupDetailsToggle();
    })

    function popupDetailsToggle() {
        if(projectDetailsContainer.classList.contains("active")){
            projectDetailsBtn.querySelector("i").classList.remove("fa-minus");
            projectDetailsBtn.querySelector("i").classList.add("fa-plus");
            projectDetailsContainer.classList.remove("active");
            projectDetailsContainer.style.maxHeight = 0 + "px";
        }
        else{
            projectDetailsBtn.querySelector("i").classList.remove("fa-plus");
            projectDetailsBtn.querySelector("i").classList.add("fa-minus");
            projectDetailsContainer.classList.add("active");
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + "px";
            popup.scrollTo(0, projectDetailsContainer.offsetTop);
        }
    }

})();
