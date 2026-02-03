document.addEventListener("DOMContentLoaded", () => {

  const searchForm = document.querySelector(".search-form");
  const jobCards = document.querySelectorAll(".job-card");

  searchForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const keyword = searchForm
      .querySelector("input[placeholder='Job title or keyword']")
      .value.toLowerCase();

    const location = searchForm
      .querySelector("input[placeholder='City or Location']")
      .value.toLowerCase();

    jobCards.forEach(card => {
      const title = card.querySelector("h3").innerText.toLowerCase();
      const jobLocation = card.querySelector(".location").innerText.toLowerCase();

      if (title.includes(keyword) && jobLocation.includes(location)) {
        card.style.display = "block";
      } else {
        card.style.display = "none";
      }
    });
  });

  const applyButtons = document.querySelectorAll(".apply-btn");

  applyButtons.forEach(button => {
    button.addEventListener("click", () => {
      alert("✅ Application submitted successfully!\nOur team will contact you soon.");
    });
  });

  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const subject = document.getElementById("subject").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !subject || !message) {
      alert("Please fill in all required fields.");
      return;
    }

    alert("Thank you for contacting JobFinder!\nWe will get back to you shortly.");
    contactForm.reset();
  });

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");

  window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (pageYOffset >= sectionTop) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

});
