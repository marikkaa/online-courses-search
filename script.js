const options = document.querySelectorAll(".option");
const select = document.querySelectorAll(".select-input");
const selectContainer = document.querySelectorAll(".select-container");
const optionsContainer = document.querySelectorAll(".select-options");

// Select option
options.forEach((opt) => {
  opt.addEventListener("click", (ev) => {
    ev.target.parentElement.previousElementSibling.value = ev.target.innerHTML;
    ev.target.parentElement.parentElement.classList.toggle("active");
    ev.target.parentElement.classList.toggle("active-options");
    filterCards();
  });
});

// Toggle select
select.forEach((el) => {
  el.addEventListener("click", (ev) => {
    ev.target.parentElement.classList.toggle("active");
    ev.target.nextElementSibling.classList.toggle("active-options");
  });
});

// Arrow click
selectContainer.forEach((el) => {
  el.addEventListener("click", (ev) => {
    ev.target.classList.toggle("active");
    ev.target.lastElementChild.classList.toggle("active-options");
  });
});

// Hide on click outside

document.addEventListener("click", (ev) => {
  if (
    !ev.target.matches(".select-container") &&
    !ev.target.matches(".select-input")
  ) {
    selectContainer.forEach((c) => {
      c.classList.remove("active");
    });
    optionsContainer.forEach((opt) => {
      opt.classList.remove("active-options");
    });
  }
});

const cards = document.getElementsByClassName("card-content");
const levelInput = document.getElementById("level-filter");
const catInput = document.getElementById("category-filter");
const lengthInput = document.getElementById("length-filter");

// Filter cards

const noResult = document.getElementById("no-result");

function filterCards() {
  let levelVal = levelInput.value.toUpperCase();
  let catVal = catInput.value.toUpperCase();
  let lengthVal = lengthInput.value;

  let a, b;
  let counter = 0;
  if (lengthVal === "1-4 weeks") {
    a = 1;
    b = 4;
  } else if (lengthVal === "4+ weeks") {
    a = 5;
    b = 100;
  } else {
    a = 0;
    b = 100;
  }
  for (let i = 0; i < cards.length; i++) {
    if (
      cards[i].children[4].innerText.toUpperCase().indexOf(catVal) > -1 &&
      cards[i].children[2].innerText.toUpperCase().indexOf(levelVal) > -1 &&
      cards[i].children[3].children[0].innerText <= b &&
      cards[i].children[3].children[0].innerText >= a
    ) {
      cards[i].parentElement.style.display = "";
      console.log(cards[i].children[3].children[0].innerText);
      counter++;
    } else {
      cards[i].parentElement.style.display = "none";
    }
  }

  if (counter < 1) {
    noResult.style.display = "flex";
  } else {
    noResult.style.display = "";
  }
}

// Filter by name
const textInput = document.getElementById("name-input");
const searchName = document.getElementById("search-name");
searchName.addEventListener("click", filterTextInput);

function filterTextInput() {
  let nameVal = textInput.value.toUpperCase();
  for (let i = 0; i < cards.length; i++) {
    if (cards[i].children[1].innerText.toUpperCase().indexOf(nameVal) > -1) {
      cards[i].parentElement.style.display = "";
    } else {
      cards[i].parentElement.style.display = "none";
    }
  }
}

// Filter on Enter

textInput.addEventListener("keydown", onEnter);

function onEnter(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    filterTextInput();
  }
  levelInput.value = "";
  catInput.value = "";
  lengthInput.value = "";
}

// Open responsive menu

const resMenuBtn = document.getElementById("responsive-menu");
const menu = document.getElementById("menu");

resMenuBtn.addEventListener("click", () => {
  menu.classList.toggle("menu-responsive");
});
