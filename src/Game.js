import { INVALID_MOVE } from 'boardgame.io/core';

export const TicTacToe = {
  setup: () => ({ cells: Array(9).fill(null) }),

  turn:  {
    moveLimit: 1,
  },

  endIf: (G, ctx) => {
    if (IsVictory(G.cells)) {
      console.log("Winner");
      return { winner: ctx.currentPlayer };
    }
    if (IsDraw(G.cells)) {
      return {draw: true};
    }
  },

  moves: {
    clickCell: (G, ctx, id) => {
      if (G.cells[id] !== null) {
        return INVALID_MOVE;
      }
      G.cells[id] = ctx.currentPlayer;
    },
  },
};


function IsVictory(cells) {

  const positions = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
  ];

  // This is kinda a function.  it takes a row (e.g., [0,1,2]
  const isRowComplete = row => {
    // this row maps the position value (e.g., 0) to the contents of cells[0]. we now have an array of cell-values (e.g., ['X', 'O', null])
    const symbols = row.map(i => cells[i]);
    // we now compare every element of the symobol array to it's first element. return true of they all match (and arn't equal to null)
    return symbols.every(i => i != null && i === symbols[0])
  };

  // this maps the victory-states to isRowComplete calculations.  each victory-state is tested with
  return positions.map(isRowComplete).some(i => i === true);
}


function IsDraw(cells) {
  return cells.filter(c => c === null).length === 0;
}
