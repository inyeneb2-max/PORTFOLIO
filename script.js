document.addEventListener("DOMContentLoaded", () => {
  lucide.createIcons();

  // 1. Theme Toggle with Bounce
  const themeBtn = document.getElementById("theme-toggle");
  themeBtn.addEventListener("click", () => {
    document.documentElement.classList.toggle("dark");
    themeBtn.classList.add("bounce");
    setTimeout(() => themeBtn.classList.remove("bounce"), 500);
  });

  // Typing Animation for Intro Section
  const typingTextElement = document.getElementById("typing-text");
  const phrases = [
    "Software Engineer",
    "Web Developer",
    "Problem Solver",
    "Javascript engineer", // Added to align with portfolio focus
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  const typingSpeed = 100; // milliseconds per character
  const deletingSpeed = 50; // milliseconds per character
  const delayBetweenPhrases = 1500; // milliseconds

  function typeWriter() {
    if (!typingTextElement) return; // Exit if element not found

    const currentPhrase = phrases[phraseIndex];
    if (isDeleting) {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      typingTextElement.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    let speed = isDeleting ? deletingSpeed : typingSpeed;
    if (!isDeleting && charIndex === currentPhrase.length) {
      speed = delayBetweenPhrases;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      speed = 500;
    }

    setTimeout(typeWriter, speed);
  }
  if (typingTextElement) typeWriter(); // Start animation if element exists

  // 1. Tech Stack Explorer (Filtering)
  const filterBtns = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // UI Active State
      filterBtns.forEach((b) =>
        b.classList.remove("active", "bg-blue-600", "text-white"),
      );
      btn.classList.add("active", "bg-blue-600", "text-white");

      const filter = btn.getAttribute("data-tech");

      projects.forEach((card) => {
        const techStack = card.getAttribute("data-stack") || "";
        if (filter === "all" || techStack.includes(filter)) {
          // Show card: first remove final hidden state, then allow transition
          card.classList.remove("hidden-final");
          setTimeout(() => {
            // Small delay to ensure display property is set before transition starts
            card.classList.remove("hidden");
            card.classList.add("bounce");
            setTimeout(() => card.classList.remove("bounce"), 500);
          }, 10);
        } else {
          // Hide card: first trigger opacity/transform transition
          card.classList.add("hidden");
          // Listen for the end of the transition to apply display: none
          card.addEventListener(
            "transitionend",
            function handler(e) {
              // Ensure it's the opacity or transform transition that ended
              if (
                e.propertyName === "opacity" ||
                e.propertyName === "transform"
              ) {
                if (card.classList.contains("hidden")) {
                  // Only apply display: none if still hidden
                  card.classList.add("hidden-final");
                }
                card.removeEventListener("transitionend", handler); // Remove listener after it fires once
              }
            },
            { once: true },
          ); // The { once: true } option ensures the listener is removed automatically
        }
      });
    });
  });

  // 2. Architecture Map Interactions
  // This section is commented out as the HTML for the architecture map was not provided in the context.
  // If you add the HTML for the architecture map, uncomment this section.
  // const nodes = document.querySelectorAll(".architecture-node");
  // const flowInfo = document.getElementById("flow-description");

  // if (nodes.length > 0 && flowInfo) {
  //   nodes.forEach((node) => {
  //     node.addEventListener("mouseenter", () => {
  //       const info = node.getAttribute("data-info");
  //       node.classList.add("highlight");
  //       if (flowInfo) flowInfo.innerText = info;
  //     });
  //     node.addEventListener("mouseleave", () => {
  //       node.classList.remove("highlight");
  //     });
  //   });
  // }

  // 3. Live Market Widget (API Driven)
  const btcPriceEl = document.getElementById("btc-price");
  async function fetchMarketData() {
    try {
      const response = await fetch(
        "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT",
      );
      const data = await response.json();
      if (btcPriceEl) {
        const price = parseFloat(data.price).toLocaleString(undefined, {
          minimumFractionDigits: 2,
        });
        btcPriceEl.innerText = `$${price}`;
        btcPriceEl.classList.add("bounce");
        setTimeout(() => btcPriceEl.classList.remove("bounce"), 500);
      }
    } catch (error) {
      console.error("Market API Error:", error);
    }
  }
  if (btcPriceEl) setInterval(fetchMarketData, 60000); // Update every minute
  fetchMarketData();

  // 2. Intersection Observer (Reveal & Skills)
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");

          // Skill Bar specific logic
          if (entry.target.classList.contains("skill-item")) {
            const bar = entry.target.querySelector(".skill-bar");
            const counter = entry.target.querySelector(".counter");
            const target = entry.target.getAttribute("data-percent");

            if (bar) bar.style.width = target + "%";
            if (counter) animateCounter(counter, target);
          }
        }
      });
    },
    { threshold: 0.1 },
  );

  document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));

  // 3. Number Counter Logic
  function animateCounter(el, target) {
    let current = 0;
    const interval = setInterval(() => {
      current++;
      el.innerText = current + "%";
      if (current >= target) clearInterval(interval);
    }, 20);
  }

  // 4. WhatsApp Form
  window.sendToWhatsApp = () => {
    const phone = "2347039068285";
    const sub = document.getElementById("wa-subject").value;
    const msg = document.getElementById("wa-message").value;
    const text = encodeURIComponent(`*Subject:* ${sub}\n*Message:* ${msg}`);
    window.open(`https://wa.me/${phone}?text=${text}`, "_blank");
  };

  // 5. Email Form
  window.sendEmail = () => {
    const subEl = document.getElementById("wa-subject");
    const emailEl = document.getElementById("email-id");
    const msgEl = document.getElementById("wa-message");

    if (!subEl || !emailEl || !msgEl) {
      console.error("Form elements missing!");
      return;
    }

    const sub = subEl.value;
    const email = emailEl.value;
    const msg = msgEl.value;
    const recipient = "inyeneb2@gmail.com";

    if (!email || !msg) return alert("Please fill in your email and message.");

    const bodyText = `From: ${email}\n\nMessage:\n${msg}`;
    const mailtoUrl = `mailto:${recipient}?subject=${encodeURIComponent(sub || "Portfolio Inquiry")}&body=${encodeURIComponent(bodyText)}`;

    window.location.href = mailtoUrl;
  };
});
