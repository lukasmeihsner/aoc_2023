const fs = require("node:fs");

let lines;

fs.readFile("./day_1.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  lines = data.split("\n");

  console.log(part2(lines));
});

const numbersWritten = [
  "one",
  "two",
  "three",
  "four",
  "five",
  "six",
  "seven",
  "eight",
  "nine",
];

function part2(lines) {
  let count = 0;
  return lines
    .map((word) => {
      firstDigit = findDigit(word.split(""), numbersWritten);
      secondDigit = findDigit(
        reverse(word).split(""),
        numbersWritten.map((num) => reverse(num))
      );
      return firstDigit + secondDigit;
    })
    .reduce((acc, cur) => acc + parseInt(cur), 0);
}

function reverse(string) {
  return string.split("").reverse().join("");
}

function findDigit(chars, numbersWritten) {
  let discoveredChars = "";
  for (const char of chars) {
    if (["1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(char)) {
      return char;
    }
    discoveredChars = discoveredChars.concat(char);
    for (const index in numbersWritten) {
      if (discoveredChars.includes(numbersWritten[index])) {
        return "".concat(parseInt(index) + 1);
      }
    }
  }
}

function first(lines) {
  result = lines
    .map((code) => {
      const numbers = code.match(/\d/g);
      return numbers.at(0).concat(numbers.at(numbers.length - 1));
    })
    .reduce((acc, cur) => acc + parseInt(cur), 0);

  console.log(result);
}
