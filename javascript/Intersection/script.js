const navBarSticky = document.querySelector(".follow");
const navBarTop = document.querySelector(".stuck");
window.addEventListener("scroll", (el) => {
  if (el.path[1].scrollY > 100) {
    navBarSticky.style.top = "0";
    // navBarTop.style.display = "none";
  } else if (el.path[1].scrollY <= 100) {
    navBarSticky.style.top = "-200px";
  }
  // console.log(el);
});
const sections = document.querySelectorAll("section");
const aside = document.querySelector("aside");
const asideLinks = aside.querySelectorAll("li");
// NEXT EXPERIMENT
const options = {
  root: null,
  threshold: 0.4, //bestämmer hur mycket av elementet som måste intersecta innan den firar
  rootMargin: "-100px", //minskar hur stor viewporten är som kollar intersections
};
const testObserver = new IntersectionObserver((entries, testObserver) => {
  entries.forEach((entry, i) => {
    const id = entry.target.getAttribute("id");
    if (entry.isIntersecting == true) {
      console.log(entry);
      entry.target.classList.add("exampleTarget");
      document.querySelector(`a[href="#${id}"]`).classList.add("whereWeAre");
    } else {
      entry.target.classList.remove("exampleTarget");
      document.querySelector(`a[href="#${id}"]`).classList.remove("whereWeAre");
    }
  });
}, options);

sections.forEach((section) => testObserver.observe(section));
