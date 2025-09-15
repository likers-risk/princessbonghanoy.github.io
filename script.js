const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const body = document.body;

const currentTheme = localStorage.getItem("theme") || "light";
body.setAttribute("data-theme", currentTheme);

function updateIcon(theme) {
  if (theme === "dark") {
    themeIcon.className = "bx bx-sun";
  } else {
    themeIcon.className = "bx bx-moon";
  }
}

updateIcon(currentTheme);

themeToggle.addEventListener("click", () => {
  const currentTheme = body.getAttribute("data-theme");
  const newTheme = currentTheme === "dark" ? "light" : "dark";

  body.style.transition = "all 0.3s ease";
  body.setAttribute("data-theme", newTheme);
  localStorage.setItem("theme", newTheme);
  updateIcon(newTheme);

  showThemeNotification(newTheme);

  setTimeout(() => {
    body.style.transition = "";
  }, 300);
});

function showThemeNotification(theme) {
  const notification = document.createElement("div");
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${theme === "dark" ? "#21262d" : "#ffffff"};
    color: ${theme === "dark" ? "#f0f6fc" : "#24292f"};
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    z-index: 1001;
    font-size: 14px;
    font-weight: 500;
    animation: slideInRight 0.3s ease;
    border: 1px solid ${theme === "dark" ? "#30363d" : "#d1d9e0"};
  `;
  notification.textContent = `${theme === "dark" ? "🌙" : "☀️"} ${
    theme.charAt(0).toUpperCase() + theme.slice(1)
  } mode activated`;
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

function updateScrollProgress() {
  const scrollProgress = document.getElementById("scrollProgress");
  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;
  const progress = (window.scrollY / totalHeight) * 100;
  scrollProgress.style.width = Math.min(progress, 100) + "%";
}

window.addEventListener("scroll", updateScrollProgress);

function updateActiveNavLink() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll('.nav a[href^="#"]');

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100;
    if (window.scrollY >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
}

window.addEventListener("scroll", updateActiveNavLink);

function animateSections() {
  const sections = document.querySelectorAll(".section");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        }
      });
    },
    { threshold: 0.1 }
  );

  sections.forEach((section) => {
    observer.observe(section);
  });
}

function initializeSkills() {
  const skillItems = document.querySelectorAll("#skillsList li");

  skillItems.forEach((skill) => {
    skill.addEventListener("click", function () {
      this.classList.add("clicked");
      setTimeout(() => this.classList.remove("clicked"), 600);

      const progressBar = this.querySelector(".skill-progress");
      const level = this.getAttribute("data-level");
      progressBar.style.width = level + "%";
    });
  });

  const skillsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const skills = entry.target.querySelectorAll("li");
          skills.forEach((skill, index) => {
            setTimeout(() => {
              const progressBar = skill.querySelector(".skill-progress");
              const level = skill.getAttribute("data-level");
              progressBar.style.width = level + "%";
            }, index * 200);
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  const skillsSection = document.getElementById("skills");
  if (skillsSection) {
    skillsObserver.observe(skillsSection);
  }
}

function initializeProjectModal() {
  const cards = document.querySelectorAll(".card");
  const modal = document.getElementById("projectModal");
  const modalTitle = document.getElementById("modalTitle");
  const modalDescription = document.getElementById("modalDescription");
  const modalLink = document.getElementById("modalLink");
  const closeModal = document.getElementById("closeModal");

  const projectData = {
    "HTML & CSS": {
      description:
        "A comprehensive project showcasing fundamental HTML and CSS skills. Features semantic markup, responsive design principles, and clean styling techniques.",
      link: "https://likers-risk.github.io/simpleproject123.github.io/",
    },
    ReTrack: {
      description:
        "A sophisticated transaction tracking dashboard built for Software Engineering 1. Features modern UI/UX design, intuitive navigation, and comprehensive data visualization.",
      link: "images/Transaction Dashboard.png",
    },
    "Final Project": {
      description:
        "A complete digital music streaming service interface. Demonstrates advanced HTML/CSS techniques, responsive design, and user-centered design principles.",
      link: "https://likers-risk.github.io/finalproject12.github.io/",
    },
  };

  cards.forEach((card) => {
    card.addEventListener("click", () => {
      const title = card.querySelector("h3").textContent;
      const data = projectData[title];

      if (data) {
        modalTitle.textContent = title;
        modalDescription.textContent = data.description;
        modalLink.href = data.link;
        modal.style.display = "flex";
      }
    });
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.style.display === "flex") {
      modal.style.display = "none";
    }
  });
}

function initializeTypingAnimation() {
  const titleElement = document.getElementById("intro-title");
  const originalText = titleElement.textContent;
  titleElement.textContent = "";

  let i = 0;
  function typeWriter() {
    if (i < originalText.length) {
      titleElement.textContent += originalText.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    } else {
      titleElement.classList.add("typing-complete");
    }
  }

  setTimeout(typeWriter, 1000); // Start after 1 second
}

function initializeCardEffects() {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      this.style.transform = "translateY(-10px) scale(1.02)";
    });

    card.addEventListener("mouseleave", function () {
      this.style.transform = "translateY(0) scale(1)";
    });
  });
}

function showSaveNotification() {
  const notification = document.createElement("div");
  const theme = body.getAttribute("data-theme");
  notification.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    background: #4caf50;
    color: white;
    padding: 12px 20px;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(76, 175, 80, 0.3);
    z-index: 1001;
    font-size: 14px;
    font-weight: 500;
    animation: slideInUp 0.3s ease;
  `;
  notification.innerHTML = "✅ Changes saved successfully!";
  document.body.appendChild(notification);

  setTimeout(() => {
    notification.remove();
  }, 2000);
}

document.addEventListener("DOMContentLoaded", function () {
  const editBtn = document.getElementById("editBtn");
  const aboutMe = document.getElementById("aboutMe");
  const editIndicator = aboutMe?.querySelector(".edit-indicator");

  if (editBtn && aboutMe) {
    editBtn.addEventListener("click", function () {
      const isEditing = aboutMe.contentEditable === "true";

      if (isEditing) {
        // Save mode
        aboutMe.contentEditable = "false";
        editBtn.textContent = "Edit About Me";
        editBtn.classList.remove("editing");
        if (editIndicator) editIndicator.style.display = "none";

        localStorage.setItem("aboutMeContent", aboutMe.innerHTML);
        showSaveNotification();

        aboutMe.style.position = "relative";
      } else {
        // Edit mode
        aboutMe.contentEditable = "true";
        aboutMe.focus();
        editBtn.textContent = "Save Changes";
        editBtn.classList.add("editing");
        if (editIndicator) editIndicator.style.display = "block";

        aboutMe.style.position = "relative";

        const range = document.createRange();
        const selection = window.getSelection();
        range.selectNodeContents(aboutMe);
        selection.removeAllRanges();
        selection.addRange(range);
      }
    });

    const savedContent = localStorage.getItem("aboutMeContent");
    if (savedContent) {
      aboutMe.innerHTML = savedContent;
    }

    aboutMe.addEventListener("blur", function () {
      if (this.contentEditable === "true") {
        localStorage.setItem("aboutMeContent", this.innerHTML);
      }
    });

    aboutMe.addEventListener("keydown", function (e) {
      if (e.ctrlKey || e.metaKey) {
        if (e.key === "s") {
          e.preventDefault();
          editBtn.click(); // Trigger save
        }
      }
    });
  }

  // Initialize all new interactive features
  animateSections();
  initializeSkills();
  initializeProjectModal();
  initializeTypingAnimation();
  initializeCardEffects();
  updateActiveNavLink();
});

let scrollTimeout;
window.addEventListener("scroll", () => {
  if (scrollTimeout) {
    window.cancelAnimationFrame(scrollTimeout);
  }

  scrollTimeout = window.requestAnimationFrame(() => {
    updateScrollProgress();
    updateActiveNavLink();
  });
});
