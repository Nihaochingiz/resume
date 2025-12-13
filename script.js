// Анимация появления секций при прокрутке
document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section");

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  sections.forEach((section) => {
    observer.observe(section);
  });

  // Динамическое обновление года в футере
  const currentYear = new Date().getFullYear();
  const currentDate = new Date();
  const formattedDate = `${currentDate.getDate()} ${getMonthName(
    currentDate.getMonth()
  )} ${currentYear} в ${currentDate.getHours()}:${currentDate
    .getMinutes()
    .toString()
    .padStart(2, "0")}`;
  document.querySelector(
    "footer p"
  ).textContent = `Фофанов Илья • Резюме обновлено ${formattedDate}`;

  // Плавная прокрутка для якорей
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // Добавление кнопки для печати
  const printButton = document.createElement("button");
  printButton.textContent = "Распечатать резюме";
  printButton.style.cssText = `
        display: block;
        margin: 20px auto;
        padding: 12px 24px;
        background: #4a69bd;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background 0.3s ease;
    `;

  printButton.addEventListener("mouseenter", function () {
    this.style.background = "#2c3e50";
  });

  printButton.addEventListener("mouseleave", function () {
    this.style.background = "#4a69bd";
  });

  printButton.addEventListener("click", function () {
    window.print();
  });

  document.querySelector("footer .container").prepend(printButton);

  // Заглушка для отсутствующего изображения
  const profilePhoto = document.querySelector(".profile-photo");
  profilePhoto.addEventListener("error", function () {
    this.src =
      "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTUwIiBoZWlnaHQ9IjE1MCIgdmlld0BveD0iMCAwIDE1MCAxNTAiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxyZWN0IHdpZHRoPSIxNTAiIGhlaWdodD0iMTUwIiBmaWxsPSIjNGE2OWJkIi8+Cjx0ZXh0IHg9Ijc1IiB5PSI4MCIgZG9taW5hbnQtYmFzZWxpbmU9Im1pZGRsZSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZm9udC1mYW1pbHk9IkFyaWFsLCBzYW5zLXNlcmlmIiBmb250LXNpemU9IjQwcHgiIGZpbGw9IndoaXRlIj5JRjwvdGV4dD4KPC9zdmc+";
    this.alt = "Фото не загружено";
  });

  // Вспомогательная функция для получения названия месяца
  function getMonthName(monthIndex) {
    const months = [
      "января",
      "февраля",
      "марта",
      "апреля",
      "мая",
      "июня",
      "июля",
      "августа",
      "сентября",
      "октября",
      "ноября",
      "декабря",
    ];
    return months[monthIndex];
  }
});

// Стили для печати
const style = document.createElement("style");
style.textContent = `
    @media print {
        body {
            font-size: 12pt;
            line-height: 1.4;
            color: #000;
            background: #fff;
        }
        
        header {
            background: #fff !important;
            color: #000 !important;
            padding: 20px 0 !important;
        }
        
        .low-code-title {
            color: #000 !important;
        }
        
        .profile-photo {
            border: 2px solid #ccc !important;
            filter: grayscale(100%);
        }
        
        section {
            box-shadow: none !important;
            border: 1px solid #ddd !important;
            page-break-inside: avoid;
        }
        
        a {
            color: #000 !important;
            text-decoration: underline;
        }
        
        .container {
            width: 100% !important;
            max-width: 100% !important;
        }
        
        button {
            display: none !important;
        }
        
        footer {
            background: #fff !important;
            color: #000 !important;
        }
        
        .project-item {
            border-left: 2px solid #ccc !important;
        }
    }
`;
document.head.appendChild(style);
