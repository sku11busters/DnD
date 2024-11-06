import { createNewItem } from "./utils";
import { dragNDrop } from "./tasks";

export function saveState() {
  const columns = document.querySelectorAll(".column__item");
  const state = [];

  columns.forEach((column) => {
    const items = [];
    const list = column.querySelector(".list");
    const listItems = list.querySelectorAll(".list__item");
    listItems.forEach((item) => {
      items.push(item.querySelector("span").textContent);
    });
    state.push(items);
  });

  localStorage.setItem("tasks", JSON.stringify(state));
}

export function restoreState() {
  const savedState = JSON.parse(localStorage.getItem("tasks"));
  if (savedState) {
    const columns = document.querySelectorAll(".column__item");
    columns.forEach((column, columnIndex) => {
      const list = column.querySelector(".list");
      list.innerHTML = "";
      savedState[columnIndex].forEach((text) => {
        const newItem = createNewItem(text);
        list.appendChild(newItem);
      });
    });
    dragNDrop();
  }
}
