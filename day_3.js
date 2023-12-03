const fs = require("node:fs");
const { PI_2 } = require("pixi.js");

fs.readFile("./day_3.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  matrix = createMatrix(data.split("\n"));
  console.log(part1(matrix));

  // console.log(
  //   isAdjacentToSymbol(1, 2, [
  //     [".", "#", "."],
  //     [".", ".", "."],
  //   ])
  // );
});

const numbers = "0123456789";

function createMatrix(lines) {
  return lines.map((line) => line.split(""));
}

function part1(matrix) {
  let currentNumber = "";
  let symbolFound = false;
  let numbersFound = [];
  let currentGears = [];
  let gearsFound = new Map();

  function maybeAddNumber() {
    if (currentNumber !== "" && symbolFound) {
      numbersFound.push(currentNumber);
      for (const [row, col] of currentGears) {
        const key = `${row}${col}`;
        if (gearsFound.has(key)) {
          [count, number] = gearsFound.get(key);
          gearsFound.set(key, [count + 1, number * parseInt(currentNumber)]);
        } else {
          gearsFound.set(key, [1, parseInt(currentNumber)]);
        }
      }
    }
    currentNumber = "";
    symbolFound = false;
    currentGears = [];
  }

  for (const [i, row] of matrix.entries()) {
    for (const [j, entry] of row.entries()) {
      if (numbers.includes(entry)) {
        currentNumber = currentNumber.concat(entry);
        symbolFound = symbolFound ? true : isAdjacentToSymbol(i, j, matrix);
      } else {
        maybeAddNumber();
      }
    }
    maybeAddNumber();
  }

  function isAdjacentToSymbol(i, j, matrix) {
    adjacentCells = [
      [i - 1, j - 1],
      [i - 1, j],
      [i - 1, j + 1],
      [i, j - 1],
      [i, j + 1],
      [i + 1, j - 1],
      [i + 1, j],
      [i + 1, j + 1],
    ];
    for (const [row, col] of adjacentCells) {
      if (
        row >= 0 &&
        col >= 0 &&
        row < matrix.length &&
        col < matrix[row].length &&
        !numbers.includes(matrix[row][col]) &&
        matrix[row][col] !== "."
      ) {
        if (matrix[row][col] === "*") {
          currentGears.push([row, col]);
        }
        return true;
      }
    }
    return false;
  }

  let sumGearsFound = 0;
  for (const [count, gear] of gearsFound.values()) {
    if (count > 1) {
      sumGearsFound += gear;
    }
  }

  return {
    sumNumbersFound: numbersFound.reduce((acc, cur) => acc + parseInt(cur), 0),
    sumGearsFound: sumGearsFound,
  };
}
