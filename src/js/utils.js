export function createNewItem(value) {
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
