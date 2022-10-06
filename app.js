let toTop = document.querySelector(".to-top");
let nav = document.querySelector("header nav");
let links = document.querySelector("header nav .links");
let lis = document.querySelectorAll(".link a");
let menu = document.querySelector(".menu");
let close = document.querySelector(".close");
let accToggle = document.querySelectorAll(".accordion .toggle");
let arrowUp = document.querySelectorAll(".accordion .toggle i");
let courses = document.querySelector(".courses");
let instructorImg = document.querySelector(".courses .instructor .img");
let instructor = document.querySelector(".courses .instructor");
let ready = document.querySelector(".ready");
let circleOne = document.querySelector(".circle-one");
let circleTwo = document.querySelector(".circle-two");
let circleThree = document.querySelector(".circle-three");
let numbers = document.querySelectorAll(".count .num");
let startcounter = false;

let navLinks = document.querySelectorAll(".nav_link");
let sections = document.querySelectorAll(".sec");
let current;
window.addEventListener("scroll", () => {
  sections.forEach(sec => {
    let secTop = sec.offsetTop;
    if (pageYOffset >= secTop) {
      current = sec.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.classList.contains(current)) {
      link.classList.add("active");
    }
  });
});
accToggle.forEach(acc => {
  acc.addEventListener("click", function() {
    this.parentElement.classList.toggle("active");
    this.children[0].classList.toggle("flip");
  });
});
toTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});
function counter(el) {
  let goal = el.dataset.goal;
  let count = setInterval(() => {
    el.textContent++;
    if (el.textContent == goal) {
      clearInterval(count);
    }
  }, 7000 / goal);
}
window.addEventListener("scroll", function() {
  if (this.scrollY >= 40) {
    toTop.classList.add("show");
    nav.classList.add("fixed");
  } else {
    toTop.classList.remove("show");
    nav.classList.remove("fixed");
  }
  if (this.scrollY >= courses.getBoundingClientRect().top) {
    if (!startcounter) {
      numbers.forEach(num => counter(num));
    }
    startcounter = true;
  }
  if (this.scrollY >= courses.getBoundingClientRect().top) {
    circleOne.style.left = "-40px";
    circleTwo.style.right = "-225px";
  }
  if (this.scrollY >= instructor.offsetTop + 400) {
    instructorImg.classList.add("move");
  }
  if (this.scrollY >= ready.offsetTop) {
    circleThree.style.right = "-225px";
  }
});
menu.addEventListener("click", function() {
  links.classList.toggle("active");
});
close.addEventListener("click", function() {
  links.classList.toggle("active");
});
lis.forEach(li => {
  li.addEventListener("click", function() {
    removeActive();
    this.classList.add("active");
    links.classList.remove("active");
  });
});
function removeActive() {
  lis.forEach(li => {
    li.classList.remove("active");
  });
}
//------------------Map section----------------------------//
if (navigator.geolocation) {
  const pos = [30.560668, 31.018417];
  navigator.geolocation.getCurrentPosition(
    function(position) {
      const { latitude, longitude } = position.coords;
      const coords = [latitude, longitude];
      const map = L.map("mapLocation").setView(coords, 11);
      L.tileLayer("https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);
      L.marker(coords).addTo(map).bindPopup("This is your Location");
      L.marker(pos).addTo(map).bindPopup("This is our Location").openPopup();
    },
    function() {
      alert("cannot get current position");
    }
  );
}
