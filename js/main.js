window.addEventListener("vite:preloadError", (e) => {
  window.reload();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();

    const target = document.querySelector(this.getAttribute("href"));
    if (!target) return;

    const topOffset = target.offsetTop;
    window.scrollTo({
      top: topOffset,
      behavior: "smooth",
    });
  });
});
/*
const headerOpen = document.querySelector(".header-open");
const headerMenu = document.querySelector(".header__links");*/
const openConsultModal = document.querySelectorAll(".cons-open");
const openCompilationModal = document.querySelectorAll(".compilationOpenModal");
const openChoiceModal = document.querySelector(".openChoiceModal");
const closeAllModal = document.querySelectorAll(".closeAllModal");
const popup = document.querySelectorAll(".popup");
const popupChoiceModal = document.querySelector(".popup-choice");
const consultModal = document.querySelector(".popup-consultation");
const CompilationModal = document.querySelector(".popup-compilation");

document.body.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeAllModals();
  }
});

function closeAllModals() {
  popup.forEach((el) => (el.style.display = "none"));
  document.body.style.overflow = "";
}
/*
function openHeader() {
  headerMenu.style.display = "flex";
}


function clearInputs() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.value = "";
  });
}*/

function openConsultModalFunc() {
  consultModal.style.display = "block";
}

function openChoiceModalFunc() {
  popupChoiceModal.style.display = "block";
}

function openConsultCompilationFunc(title) {
  CompilationModal.style.display = "block";
  const modalTitle = document.querySelector(".modal-title");
  const hiddenInput = document.getElementById("titleHiddenConmpilation");
  hiddenInput.value = title;
  modalTitle.textContent = `Отправьте заявку и получите подборку акустики для ${title}`;
}
/*
headerOpen.addEventListener("click", openHeader);*/

closeAllModal.forEach((el) =>
  el.addEventListener("click", function (e) {
    closeAllModals();
  })
);

openConsultModal.forEach((el) =>
  el.addEventListener("click", function (e) {
    const title =
      e.target.parentNode.parentNode.previousElementSibling.innerHTML;
    const hiddenInput = document.getElementById("titleHiddenConsultation");
    hiddenInput.value = title;
    openConsultModalFunc();
  })
);

openCompilationModal.forEach((el) =>
  el.addEventListener("click", function (e) {
    const title = e.target.dataset.title;
    openConsultCompilationFunc(title);
  })
);

openChoiceModal.addEventListener("click", openChoiceModalFunc);

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("consultForm");
  sendForm(form);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("compilationForm");
  sendForm(form);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("choiceForm");
  sendForm(form);
});

document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("helpForm");
  sendForm(form);
});

document.addEventListener("DOMContentLoaded", function () {
  const url = new URL(window.location.href);
  localStorage.setItem("utm_source", url.searchParams.get("utm_source"));

  localStorage.setItem("utm_medium", url.searchParams.get("utm_medium"));
  localStorage.setItem("utm_campaign", url.searchParams.get("utm_campaign"));
  localStorage.setItem(
    "utm_campaign_name",
    url.searchParams.get("utm_campaign_name")
  );
  localStorage.setItem("utm_content", url.searchParams.get("utm_content"));
  localStorage.setItem("utm_term", url.searchParams.get("utm_term"));
  localStorage.setItem("utm_placement", url.searchParams.get("utm_placement"));
  localStorage.setItem("utm_device", url.searchParams.get("utm_device"));
  localStorage.setItem(
    "utm_region_name",
    url.searchParams.get("utm_region_name")
  );
  localStorage.setItem("utm_position", url.searchParams.get("utm_position"));
  localStorage.setItem(
    "utm_position_type",
    url.searchParams.get("utm_position_type")
  );
  localStorage.setItem(
    "utm_source_type",
    url.searchParams.get("utm_source_type")
  );
  localStorage.setItem("yclid", url.searchParams.get("yclid"));
});

function sendForm(form) {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    try {
      const formData = new FormData(form);
      let object = {};

      formData.append("utm_source", localStorage.getItem("utm_source"));
      formData.append("utm_medium", localStorage.getItem("utm_medium"));
      formData.append("utm_campaign", localStorage.getItem("utm_campaign"));
      formData.append(
        "utm_campaign_name",
        localStorage.getItem("utm_campaign_name")
      );
      formData.append("utm_content", localStorage.getItem("utm_content"));
      formData.append("utm_term", localStorage.getItem("utm_term"));
      formData.append("utm_placement", localStorage.getItem("utm_placement"));
      formData.append("utm_device", localStorage.getItem("utm_device"));
      formData.append(
        "utm_region_name",
        localStorage.getItem("utm_region_name")
      );
      formData.append("utm_position", localStorage.getItem("utm_position"));
      formData.append(
        "utm_position_type",
        localStorage.getItem("utm_position_type")
      );
      formData.append(
        "utm_source_type",
        localStorage.getItem("utm_source_type")
      );
      formData.append("yclid", localStorage.getItem("yclid"));
      const response = await fetch("sendforms.php", {
        method: "POST",
        body: formData,
      });

      formData.forEach((value, key) => (object[key] = value));
      localStorage.setItem("name", object.name);

      console.log(object);
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.status}`);
      }
      closeAllModals();
      window.location.href = "/thanks.html";
    } catch (error) {
      console.error("Произошла ошибка при отправке формы.", error);
      alert("Произошла ошибка при отправке формы.", error);
    }
  });
}
