const changeButton = document.getElementById("change-button")
const resetButton = document.getElementById("reset-button")
const gridContainer = document.getElementById("grid-container")
const gridColorPicker = document.getElementById("grid-color")
const cellColorPicker = document.getElementById("paint-color")

gridContainer.style.cursor = "crosshair"

const gridSize = 700 // Going to assume this in pixels

let gridDimension = 10
let isDown = false
let cellColor = "#3b82f6" // TailwindCSS bg-blue-500

function handleMouseDown(event) {
  isDown = true
  const cell = event.target
  cell.style.backgroundColor = cellColor
}

function handleMouseUp(event) {
  isDown = false
}

function handleMouseMove(event) {
  if (!isDown) {
    return
  }
  const cell = event.target
  cell.style.backgroundColor = cellColor
}

function removeMouseEvents() {
  const cellArray = document.getElementsByClassName("cell")
  for (let idx = 0; idx < cellArray.length; ++idx) {
    cellArray[idx].removeEventListener("mousedown", handleMouseDown)
    cellArray[idx].removeEventListener("mouseup", handleMouseUp)
    cellArray[idx].removeEventListener("mousemove", handleMouseMove)
  }
}

function attachMouseEvents() {
  const cellArray = document.getElementsByClassName("cell")
  for (let idx = 0; idx < cellArray.length; ++idx) {
    cellArray[idx].addEventListener("mousedown", handleMouseDown)
    cellArray[idx].addEventListener("mouseup", handleMouseUp)
    cellArray[idx].addEventListener("mousemove", handleMouseMove)
  }
}

function generateGridCell() {
  const gridCell = document.createElement("div")
  gridCell.style.width = `${gridSize / gridDimension}px`
  gridCell.style.height = `${gridSize / gridDimension}px`
  gridCell.classList.add("cell")
  return gridCell
}

function generateGrid() {
  for (let row = 0; row < gridDimension; ++row) {
    const gridRow = document.createElement("div")
    gridRow.classList.add("row")
    for (let col = 0; col < gridDimension; ++col) {
      const gridCell = generateGridCell()
      gridRow.appendChild(gridCell)
    }
    gridContainer.appendChild(gridRow)
  }
}

function handleChangeDimension(event) {
  let dimension = parseInt(prompt("Enter dimension"))
  if (!dimension) {
    return
  }
  if (dimension < 0) {
    dimension = 4
  }
  gridDimension = Math.min(dimension, 100)
  gridContainer.innerHTML = ""
  generateGrid()
  removeMouseEvents()
  attachMouseEvents()
}

function handleResetGrid(event) {
  gridContainer.innerHTML = ""
  generateGrid()
  removeMouseEvents()
  attachMouseEvents()
}

function handleGridColor(event) {
  gridContainer.style.backgroundColor = `${gridColorPicker.value}`
}

function handleCellColor(event) {
  cellColor = event.target.value
  removeMouseEvents()
  attachMouseEvents()
}

changeButton.addEventListener("click", handleChangeDimension)
resetButton.addEventListener("click", handleResetGrid)
gridColorPicker.addEventListener("change", handleGridColor)
cellColorPicker.addEventListener("change", handleCellColor)

generateGrid()
attachMouseEvents()
