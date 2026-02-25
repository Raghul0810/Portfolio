/* ========= Smooth scroll ========= */
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  a.addEventListener("click", (e) => {
    const target = document.querySelector(a.getAttribute("href"));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

/* ========= Typing effect ========= */
(function typingEffect() {
  const el = document.querySelector(".typing-text");
  if (!el) return;

  const words = [
    "Production Support Manager",
    "Technical Operations Leader",
    "Incident Management & RCA",
    "SLA/KPI Ownership",
    "SaaS Reliability & Scale"
  ];

  let w = 0, i = 0, deleting = false;

  function tick() {
    const word = words[w];
    if (!deleting) {
      i++;
      el.textContent = word.substring(0, i);
      if (i === word.length) {
        deleting = true;
        setTimeout(tick, 1200);
        return;
      }
    } else {
      i--;
      el.textContent = word.substring(0, i);
      if (i === 0) {
        deleting = false;
        w = (w + 1) % words.length;
      }
    }
    setTimeout(tick, deleting ? 45 : 80);
  }

  tick();
})();

/* ========= Skills (Jigar-style tiles) ========= */
async function loadSkills() {
  const skillsRow = document.querySelector(".skills .container .row");
  if (!skillsRow) return;

  try {
    const res = await fetch("./skills.json", { cache: "no-store" });
    const data = await res.json();

    // supports either { skills: [] } or [] directly
    const skills = Array.isArray(data) ? data : (data.skills || []);

    if (!skills.length) {
      skillsRow.innerHTML = `<p style="color:#fff;text-align:center;width:100%;">No skills found in skills.json</p>`;
      return;
    }

    skillsRow.innerHTML = skills.map((s) => {
      const icon = s.icon || "fas fa-star";
      const name = s.name || "Skill";
      return `
        <div class="bar">
          <div class="info">
            <i class="${icon}"></i>
            <span>${name}</span>
          </div>
        </div>
      `;
    }).join("");

  } catch (e) {
    console.error("Skills load failed:", e);
    skillsRow.innerHTML = `<p style="color:#fff;text-align:center;width:100%;">Skills failed to load. Use GitHub Pages (not double-click) and ensure skills.json is in repo root.</p>`;
  }
}

loadSkills();
