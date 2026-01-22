// TAB SWITCHING
document.querySelectorAll(".tab").forEach(tab=>{
  tab.addEventListener("click", ()=>{
    document.querySelectorAll(".tab").forEach(t=>t.classList.remove("active"));
    document.querySelectorAll(".tab-content").forEach(c=>c.classList.remove("active"));

    tab.classList.add("active");
    document.getElementById(tab.dataset.tab).classList.add("active");
  });
});

// FAQ TOGGLE
document.querySelectorAll(".faq-question").forEach(q=>{
  q.addEventListener("click", ()=>{
    const answer = q.nextElementSibling;
    const arrow = q.querySelector("span");

    document.querySelectorAll(".faq-answer").forEach(a=>a.style.display="none");
    document.querySelectorAll(".faq-question span").forEach(s=>s.textContent="›");

    if(answer.style.display !== "block"){
      answer.style.display="block";
      arrow.textContent="⌄";
    }
  });
});