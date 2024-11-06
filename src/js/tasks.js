import { createNewItem } from "./utils";
import { saveState } from "./state";

export function addTask(column) {
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

  textArea.addEventListener("input", (e) => {
    value = e.target.value;
  });

  document.addEventListener("click", (event) => {
    const isClickInsideForm = form.contains(event.target);
    const isClickInsideBtn = btn.contains(event.target);
    const isClickInsideTextArea = textArea.contains(event.target);
    const isClickInsideAddBtn = addBtn.contains(event.target);
    const isClickInsideCancelBtn = cancelBtn.contains(event.target);

    if (
      !isClickInsideForm &&
      !isClickInsideBtn &&
      !isClickInsideTextArea &&
      !isClickInsideAddBtn &&
      !isClickInsideCancelBtn
    ) {
      resetForm();
    }
  });

  dragNDrop();
}

export function dragNDrop() {
  const lists = document.querySelectorAll(".list");
  const listItems = document.querySelectorAll(".list__item");

  listItems.forEach((item) => {
    item.addEventListener("dragstart", () => {
      item.classList.add("dragging");
    });

    item.addEventListener("dragend", () => {
      item.classList.remove("dragging");
    });

    item.addEventListener("click", (e) => {
      if (e.target.classList.contains("delete__item-btn")) {
        e.target.parentNode.remove();
        saveState();
      }
    });
  });

  lists.forEach((list) => {
    list.addEventListener("dragover", (e) => {
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

export function getDragAfterElement(list, y) {
  const draggableElements = [
    ...list.querySelectorAll(".list__item:not(.dragging)"),
  ];
  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      }
      return closest;
    },
    { offset: Number.NEGATIVE_INFINITY },
  ).element;
}
