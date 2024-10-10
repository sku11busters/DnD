const boardState = JSON.parse(localStorage.getItem("boardState")) || {
  columns: [
    { id: 1, cards: [] },
    { id: 2, cards: [] },
    { id: 3, cards: [] },
  ],
};

function renderBoard() {
  const boardElement = document.getElementById("board");
  boardElement.innerHTML = "";

  boardState.columns.forEach((column) => {
    const columnElement = document.createElement("div");
    columnElement.className = "column";

    column.cards.forEach((card) => {
      const cardElement = document.createElement("div");
      cardElement.className = "card";
      cardElement.textContent = `Card ${card.index}`;
      cardElement.draggable = true;

      cardElement.addEventListener("dragstart", (e) => {
        dragStart(e, card);
      });
      cardElement.addEventListener("dragend", () => {
        dragEnd();
      });
      cardElement.addEventListener("dragover", (e) => {
        dragOver(e, card);
      });
      cardElement.addEventListener("drop", (e) => {
        drop(e, card);
      });

      const deleteButton = document.createElement("button");
      deleteButton.className = "delete-button";
      deleteButton.textContent = "×";
      deleteButton.addEventListener("click", () => {
        deleteCard(card);
      });

      cardElement.addEventListener("mouseover", () => {
        deleteButton.style.display = "block";
      });
      cardElement.addEventListener("mouseout", () => {
        deleteButton.style.display = "none";
      });

      cardElement.appendChild(deleteButton);
      columnElement.appendChild(cardElement);
    });

    const addCardButton = document.createElement("button");
    addCardButton.textContent = "Add another card";
    addCardButton.addEventListener("click", () => {
      addCard(column);
    });

    columnElement.appendChild(addCardButton);
    boardElement.appendChild(columnElement);
  });
}

function addCard(column) {
  const newCard = { text: "card", index: column.cards.length + 1 };
  column.cards.push(newCard);
  saveBoardState();
  renderBoard();
}

function deleteCard(card) {
  const columnIndex = boardState.columns.findIndex((column) =>
    column.cards.includes(card)
  );
  const cardIndex = boardState.columns[columnIndex].cards.indexOf(card);
  boardState.columns[columnIndex].cards.splice(cardIndex, 1);
  saveBoardState();
  renderBoard();
}

function saveBoardState() {
  localStorage.setItem("boardState", JSON.stringify(boardState));
}

renderBoard();

function dragStart(e, card) {
  boardState.draggingCard = card;

  e.dataTransfer.effectAllowed = "move";
  e.dataTransfer.setData("text", card.text);

  e.target.style.opacity = 0.5;
}

function dragEnd() {
  const cardElement = document.querySelector(".card[draggable=true]");
  cardElement.style.opacity = 1;

  boardState.draggingCard = null;
}

function dragOver(e, card) {
  e.preventDefault();
}

function drop(e, card) {
  e.preventDefault();

  const columnIndex = boardState.columns.findIndex((column) =>
    column.cards.includes(boardState.draggingCard)
  );
  const cardIndex = boardState.columns[columnIndex].cards.indexOf(
    boardState.draggingCard
  );
  boardState.columns[columnIndex].cards.splice(cardIndex, 1);

  const newIndex = boardState.columns.findIndex((column) =>
    column.cards.includes(card)
  );
  boardState.columns[newIndex].cards.push(boardState.draggingCard);

  saveBoardState();
  renderBoard();
}

export default renderBoard;
