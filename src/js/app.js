import { addTask } from "./tasks";
import { restoreState } from "./state";

document.addEventListener("DOMContentLoaded", () => {
  restoreState();
});

const columns = document.querySelectorAll(".column__item");
columns.forEach(addTask);
