/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/utils.js
function createNewItem(value) {
  const newItem = document.createElement("li");
  newItem.classList.add("list__item");
  newItem.draggable = true;
  const textSpan = document.createElement("span");
  textSpan.textContent = value;
  newItem.appendChild(textSpan);
  const deleteBtn = document.createElement("div");
  deleteBtn.innerHTML = "✕";
  deleteBtn.classList.add("delete__item-btn");
  newItem.appendChild(deleteBtn);
  return newItem;
}
;// CONCATENATED MODULE: ./src/js/state.js


function saveState() {
  const columns = document.querySelectorAll(".column__item");
  const state = [];
  columns.forEach(column => {
    const items = [];
    const list = column.querySelector(".list");
    const listItems = list.querySelectorAll(".list__item");
    listItems.forEach(item => {
      items.push(item.querySelector("span").textContent);
    });
    state.push(items);
  });
  localStorage.setItem("tasks", JSON.stringify(state));
}
function restoreState() {
  const savedState = JSON.parse(localStorage.getItem("tasks"));
  if (savedState) {
    const columns = document.querySelectorAll(".column__item");
    columns.forEach((column, columnIndex) => {
      const list = column.querySelector(".list");
      list.innerHTML = "";
      savedState[columnIndex].forEach(text => {
        const newItem = createNewItem(text);
        list.appendChild(newItem);
      });
    });
    dragNDrop();
  }
}
;// CONCATENATED MODULE: ./src/js/tasks.js


function addTask(column) {
  const lists = column.querySelectorAll(".list");
  const btn = column.querySelector(".add__btn");
  const addBtn = column.querySelector(".add__item-btn");
  const cancelBtn = column.querySelector(".cancel__item-btn");
  const form = column.querySelector(".form");
  const textArea = column.querySelector(".textarea");
  let value = "";
  btn.addEventListener("click", () => {
    form.style.display = "block";
    btn.style.display = "none";
    textArea.focus();
  });
  cancelBtn.addEventListener("click", () => {
    resetForm();
  });
  addBtn.addEventListener("click", () => {
    const newItem = createNewItem(value);
    lists[0].appendChild(newItem);
    saveState();
    resetForm();
    dragNDrop();
  });
  function resetForm() {
    textArea.value = "";
    value = "";
    form.style.display = "none";
    btn.style.display = "block";
  }
  textArea.addEventListener("input", e => {
    value = e.target.value;
  });
  document.addEventListener("click", event => {
    const isClickInsideForm = form.contains(event.target);
    const isClickInsideBtn = btn.contains(event.target);
    const isClickInsideTextArea = textArea.contains(event.target);
    const isClickInsideAddBtn = addBtn.contains(event.target);
    const isClickInsideCancelBtn = cancelBtn.contains(event.target);
    if (!isClickInsideForm && !isClickInsideBtn && !isClickInsideTextArea && !isClickInsideAddBtn && !isClickInsideCancelBtn) {
      resetForm();
    }
  });
  dragNDrop();
}
function dragNDrop() {
  const lists = document.querySelectorAll(".list");
  const listItems = document.querySelectorAll(".list__item");
  listItems.forEach(item => {
    item.addEventListener("dragstart", () => {
      item.classList.add("dragging");
    });
    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });
    item.addEventListener("click", e => {
      if (e.target.classList.contains("delete__item-btn")) {
        e.target.parentNode.remove();
        saveState();
      }
    });
  });
  lists.forEach(list => {
    list.addEventListener("dragover", e => {
      e.preventDefault();
      const draggingItem = document.querySelector(".dragging");
      const afterElement = getDragAfterElement(list, e.clientY);
      if (afterElement === null) {
        list.appendChild(draggingItem);
      } else {
        list.insertBefore(draggingItem, afterElement);
      }
      saveState();
    });
  });
}
function getDragAfterElement(list, y) {
  const draggableElements = [...list.querySelectorAll(".list__item:not(.dragging)")];
  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect();
    const offset = y - box.top - box.height / 2;
    if (offset < 0 && offset > closest.offset) {
      return {
        offset,
        element: child
      };
    }
    return closest;
  }, {
    offset: Number.NEGATIVE_INFINITY
  }).element;
}
;// CONCATENATED MODULE: ./src/js/app.js


document.addEventListener("DOMContentLoaded", () => {
  restoreState();
});
const columns = document.querySelectorAll(".column__item");
columns.forEach(addTask);
;// CONCATENATED MODULE: ./src/index.js


/******/ })()
;