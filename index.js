const formRef = document.querySelector(".js-form");
const listRef = document.querySelector(".js-list");

const arr = JSON.parse(localStorage.getItem("card")) ?? [];

formRef.addEventListener("submit", onSubmit);
listRef.addEventListener("click", onClick);

function onSubmit(e) {
  e.preventDefault();
  const title = e.target.elements.title.value;
  const description = e.target.elements.descr.value;
  const id = Math.random().toString(36).substring(2);

  const markup = `<li data-id="${id}"><h2>${title}</h2><p>${description}</p><button type="button" class="js-remove">remove</button></li>`;
  listRef.insertAdjacentHTML("afterbegin", markup);

  const object = {
    title,
    description,
    id,
  };
  arr.unshift(object);
  localStorage.setItem("card", JSON.stringify(arr));

  e.target.elements.title.value = "";
  e.target.elements.descr.value = "";
}

function createMarkup(array) {
  return array
    .map(
      ({ title, description, id, complited }) =>
        `<li class="${complited ? "complite" : ""}" data-id="${id}"><h2>${title}</h2><p>${description}</p><button type="button" class="js-remove">remove</button></li>`
    )
    .join("");
}

listRef.insertAdjacentHTML("afterbegin", createMarkup(arr));

function onClick(e) {
  if (e.target === e.currentTarget) {
    return;
  }

  const item = e.target.closest("li");

  if (e.target.classList.contains("js-remove")) {
    const idx = arr.findIndex(({ id }) => id === item.dataset.id);
    arr.splice(idx, 1);
    localStorage.setItem("card", JSON.stringify(arr));
    item.remove();
    return;
  }
  item.classList.add("complite");

  const findElement = arr.find(({ id }) => id === item.dataset.id);
  findElement.complited = true;
  localStorage.setItem("card", JSON.stringify(arr));
}
