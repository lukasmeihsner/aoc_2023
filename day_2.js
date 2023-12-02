const fs = require("node:fs");

fs.readFile("./day_2.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  lines = data.split("\n");

  games = createGames(lines);
  console.log(part2(games));
});

function part1(games) {
  result = 0;
  for (const game of games) {
    if (isGameValid(game)) {
      result += game.id;
    }
  }
  return result;
}

function part2(games) {
  power = 0;
  for (const game of games) {
    power +=
      getPower(game.set, "red") *
      getPower(game.set, "green") *
      getPower(game.set, "blue");
  }
  return power;
}

function getPower(draws, color) {
  const values = draws.map((draw) =>
    draw[color] == undefined ? 0 : draw[color]
  );
  return Math.max(...values);
}

function isGameValid(game) {
  for (const draw of game.set) {
    if (draw.red > 12 || draw.green > 13 || draw.blue > 14) {
      return false;
    }
  }
  return true;
}

function createGames(lines) {
  let result = [];
  for (const line of lines) {
    const [game, draws] = line.split(": ");
    const gameId = parseInt(game.split(" ")[1]);
    const gameSet = draws
      .split("; ")
      .map((draw) => draw.split(", ").map((cube) => cube.split(" ")))
      .map((draw) =>
        draw.reduce((acc, cur) => {
          const [count, color] = cur;
          acc[color] = parseInt(count);
          return acc;
        }, {})
      );
    result.push({
      id: gameId,
      set: gameSet,
    });
  }
  return result;
}
