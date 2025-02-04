const headerMenu = document.querySelector(".header__menu");
const mainMenu = document.querySelector(".main__menu");
const menuClose = document.querySelector(".menu__close");

function openHeader() {
  mainMenu.style.display = "block";
}

function closeHeader() {
  mainMenu.style.display = "none";
}

headerMenu.addEventListener("click", openHeader);
menuClose.addEventListener("click", closeHeader);

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
