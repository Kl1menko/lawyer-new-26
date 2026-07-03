// Адвокат Клименко І.Ф. — мінімальний JS: мобільне меню + поява секцій при скролі
(function () {
  "use strict";

  // Мобільне меню
  var toggle = document.querySelector(".nav-toggle");
  var header = document.querySelector(".site-header");
  var nav = document.querySelector(".site-nav");

  if (toggle && header && nav) {
    // Блок контактів унизу повноекранного меню (видимий лише на мобільних)
    var contacts = document.createElement("div");
    contacts.className = "nav-contacts";
    contacts.innerHTML =
      '<a class="btn" href="tel:+380679649515">Подзвонити: +38 (067) 964-95-15</a>' +
      '<a class="btn btn-outline" href="viber://chat?number=%2B380679649515">Написати у Viber</a>' +
      "<p>Пн–Пт: 10:00–17:00 · м. Ладижин, вул. Процишина, 10г</p>";
    nav.appendChild(contacts);

    function closeMenu() {
      header.classList.remove("nav-open");
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    }

    toggle.addEventListener("click", function () {
      var open = header.classList.toggle("nav-open");
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });

    // Закривати меню після переходу по пункту та по Escape
    nav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeMenu);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });
  }

  // М'яка поява секцій нижче першого екрана.
  // Елементи ховаються лише тут, у JS: без JS (боти, старі браузери) все видно одразу.
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var items = document.querySelectorAll(".reveal");

  if (!reduced && "IntersectionObserver" in window && items.length) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            entry.target.classList.remove("will-reveal");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    items.forEach(function (el) {
      // Ховаємо тільки те, що зараз за межами екрана
      if (el.getBoundingClientRect().top > window.innerHeight * 0.9) {
        el.classList.add("will-reveal");
        io.observe(el);
      }
    });
  }
})();
