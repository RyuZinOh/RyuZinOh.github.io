//--------------//
//script for faq opening closing
//--------------//
document.querySelectorAll(".faq-question").forEach((question) => {
  question.addEventListener("click", () => {
    const faqItem = question.parentElement;
    faqItem.classList.toggle("open");

    // Close other open items
    document.querySelectorAll(".faq-item").forEach((item) => {
      if (item !== faqItem) {
        item.classList.remove("open");
      }
    });
  });
});

//--------------//
//model for how it works?
//--------------//
const modal = document.getElementById("how-it-works-modal");
const openModalBtn = document.getElementById("how-it-works-btn");
const closeModalBtn = document.getElementById("close-modal-btn");

//opening modal
openModalBtn.addEventListener("click", (event) => {
  event.preventDefault();
  modal.style.display = "flex";
});

// closing the model
closeModalBtn.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

window.addEventListener("click", (event) => {
  if (event.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});
