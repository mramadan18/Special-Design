let mainColors = localStorage.getItem('color_option');

let backgroundOption = true;

let backgroundInterval;

let backgroundLocalItem = localStorage.getItem('background_option');

if (backgroundLocalItem !== null) {

    if (backgroundLocalItem === "true") {

        backgroundOption = true;

        randomizeImgs();

    } else {

        backgroundOption = false;

        clearInterval(backgroundInterval)
    }

    document.querySelectorAll(".random-background span").forEach(element => {

        element.classList.remove("active");
    });

    if (backgroundLocalItem === "true") {

        document.querySelector(".random-background .yes").classList.add("active");
    } else {

        document.querySelector(".random-background .no").classList.add("active");
    }
};


if (mainColors !== null) {

    document.documentElement.style.setProperty("--main--color", mainColors)

    document.querySelectorAll(".colors-list li").forEach(element => {

        element.classList.remove("active");

        if (element.dataset.color === mainColors) {

            element.classList.add("active");

        };
    });
};

// Toggle Spin Class On Icon
document.querySelector(".fa-gear").onclick = function () {

    this.classList.toggle("fa-spin");
    
    document.querySelector(".settings-box").classList.toggle("open");

};

// Swich Colors
const colorLi = document.querySelectorAll(".colors-list li");

colorLi.forEach(li => {

    li.addEventListener("click", (e) => {

        document.documentElement.style.setProperty("--main--color", e.target.dataset.color);

        localStorage.setItem('color_option', e.target.dataset.color);

        handleActive(e);

    });
});

// Swich Random Background Option
const randomBackEl = document.querySelectorAll(".random-background span");;



randomBackEl.forEach(span => {

    span.addEventListener("click", (e) => {

        e.target.parentElement.querySelectorAll(".active").forEach(element => {
            
            element.classList.remove("active");   
            
        });

        // Add active
        e.target.classList.add("active");

        if (e.target.dataset.background === "yes") {

            backgroundOption = true;

            randomizeImgs();

            localStorage.setItem("background_option", true);


        } else {
            
            backgroundOption = false;

            clearInterval(backgroundInterval);

            localStorage.setItem("background_option", false);
        }
    });
});

// Select Landing Page Element
let landingPage = document.querySelector(".landing-page");

// Get Arrray Of Images
let imgArray = ["01.jpg", "03.jpg", "04.jpg","05.jpg", "07.jpg", "08.jpg", "09.jpg"];

function randomizeImgs() {

    if (backgroundOption === true) {

        backgroundInterval = setInterval(() =>  {
    
            // Get Random Number
            let randomNumber = Math.floor(Math.random() * imgArray.length);
            // Change Background Url
            landingPage.style.backgroundImage = "url('images/" + imgArray[randomNumber] + "')";
        
        }, 10000);
    }
};

randomizeImgs();

let ourskills = document.querySelector(".skills");

window.onscroll = function () {

    let skillsOffsetTop = ourskills.offsetTop;

    let skillsOuterHeight = ourskills.offsetHeight;

    let windowScrollTop = this.pageYOffset;

    if (windowScrollTop > (skillsOffsetTop + skillsOuterHeight - outerHeight)) {

        let allSkills = document.querySelectorAll(".skill-box .skill-progress span");

        allSkills.forEach(skill => {

            skill.style.width = skill.dataset.progress;
        });
    };

};

let ourGallry = document.querySelectorAll(".gallery img");

ourGallry.forEach(img => {

    img.addEventListener("click" ,(e) => {

        let overlay = document.createElement("div");

        overlay.className = 'popup-overlay';

        document.body.appendChild(overlay);
        
        let popupBox = document.createElement("div");

        popupBox.className = 'popup-box';

        if (img.alt !== null) {

            let imgHeading = document.createElement("h3");

            let imgText = document.createTextNode(img.alt);

            imgHeading.appendChild(imgText);

            popupBox.appendChild(imgHeading);

        }

        let popupImage = document.createElement("img");

        popupImage.src = img.src;

        popupBox.appendChild(popupImage);

        document.body.appendChild(popupBox);

        let closeButton = document.createElement("span");

        let closeButtonText = document.createTextNode("X");

        closeButton.appendChild(closeButtonText);

        closeButton.className = 'close-button';

        popupBox.appendChild(closeButton);

    });

});

document.addEventListener("click", (e) => {

    if (e.target.className == "close-button") {

        e.target.parentNode.remove();

        document.querySelector(".popup-overlay").remove();

    }

});

// Select All Bullets

const allBullets = document.querySelectorAll(".nav-bullets .bullet");

// Select All Links

const allLinks = document.querySelectorAll(".links a");


function scrollToSomewhere(element) {

    element.forEach(ele => {

        ele.addEventListener("click", (e) => {
    
            e.preventDefault();
    
            document.querySelector(e.target.dataset.section).scrollIntoView({
    
                behavior: 'smooth'
            });
    
        });
    });
    
};
scrollToSomewhere(allBullets); 

scrollToSomewhere(allLinks);

let bulletsSpan = document.querySelectorAll(".bullets-option span");

let bulletsContainer = document.querySelector(".nav-bullets");

let bulletLocalItem = localStorage.getItem("bullets_option");

if (bulletLocalItem !== null) {

    bulletsSpan.forEach(span => {

        span.classList.remove("active");

    });

    if (bulletLocalItem === 'block') {

        bulletsContainer.style.display = "block";

        document.querySelector(".bullets-option .yes").classList.add("active");

    } else {

            bulletsContainer.style.display = "none";

            document.querySelector(".bullets-option .no").classList.add("active");

    }

}

bulletsSpan.forEach(span => {

    span.addEventListener("click", (e) => {

        if (span.dataset.display === "show") {

            bulletsContainer.style.display = "block";

            localStorage.setItem("bullets_option", 'block');

        } else {

            bulletsContainer.style.display = "none";

            localStorage.setItem("bullets_option", 'none')

        }

        handleActive(e);

    });

    

});

function handleActive(ev) {

    ev.target.parentElement.querySelectorAll(".active").forEach(element => {

        element.classList.remove("active");

    });

    ev.target.classList.add("active");

};

// Reset Button
document.querySelector(".reset-options").onclick = function () {

    localStorage.clear();

    window.location.reload();

};

// Toggle Menu

let toggleBtn = document.querySelector(".toggle-menu");
let tLinks = document.querySelector(".links");

toggleBtn.onclick = function (e) {

    e.stopPropagation();

    this.classList.toggle("menu-active");

    tLinks.classList.toggle("open");

};

document.addEventListener("click", (e) => {

    if (e.target !== toggleBtn && e.target !== tLinks) {

        if (tLinks.classList.contains("open")) {

            toggleBtn.classList.toggle("menu-active");

            tLinks.classList.toggle("open");
        };
    };
});