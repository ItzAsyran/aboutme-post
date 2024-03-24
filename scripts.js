// Select elements once at the start
const elements = {
  overlay: document.querySelector(".overlay"),
  container: document.querySelector(".container"),
  socialLink: document.querySelector(".social a"),
  aboutMeLink: document.querySelector(".aboutme"),
  parallaxElements: document.querySelectorAll('.parallax'),
  trailer: document.getElementById("trailer"),
  trailerIcon: document.getElementById("trailer-icon")
};

// Function to handle the transition
function transition(direction, url) {
  elements.container.style.transform = `translateX(${direction})`;
  elements.overlay.classList.add('fade-out');
  setTimeout(() => window.location.href = url, 500);
}

// Attach event listeners
if (elements.socialLink) {
  elements.socialLink.addEventListener("click", event => {
    event.preventDefault();
    transition("-100vw", "social.html");
  });
}

if (elements.aboutMeLink) {
  elements.aboutMeLink.addEventListener("click", event => {
    event.preventDefault();
    transition("0", "index.html");
  });
}

window.addEventListener("DOMContentLoaded", () => elements.overlay.classList.remove('fade-out'));

window.addEventListener('mousemove', e => {
  let x = (window.innerWidth/2 - e.pageX)/60;
  let y = (window.innerHeight/2 - e.pageY)/60;

  elements.parallaxElements.forEach(element => {
    element.style.transform = `translateX(${x}px) translateY(${y}px)`;
  });

  const interactable = e.target.closest(".interactable"),
        interacting = interactable !== null;
  
  animateTrailer(e, interacting);
  
  elements.trailer.dataset.type = interacting ? interactable.dataset.type : "";
  
  if(interacting) {
    elements.trailerIcon.className = getTrailerClass(interactable.dataset.type);
  }
});

const animateTrailer = (e, interacting) => {
  const x = e.clientX - elements.trailer.offsetWidth / 2,
        y = e.clientY - elements.trailer.offsetHeight / 2;
  
  const keyframes = {
    transform: `translate(${x}px, ${y}px) scale(${interacting ? 8 : 1})`
  }
  
  elements.trailer.animate(keyframes, { 
    duration: 800, 
    fill: "forwards" 
  });
}

// Select all elements with the data-hover attribute
const hoverElements = document.querySelectorAll("[data-hover]");

// Add event listeners to add/remove the data attribute
hoverElements.forEach(element => {
  element.addEventListener("mouseover", () => {
    elements.trailer.dataset.hover = "true";
  });

  element.addEventListener("mouseout", () => {
    elements.trailer.dataset.hover = "false";
  });
});

// Select the social link and container
const socialLink = document.querySelector("#socialLink");
const container = document.querySelector(".container");

// Add event listener to add the class
socialLink.addEventListener("click", event => {
  event.preventDefault();
  container.classList.add("slide-left");
});