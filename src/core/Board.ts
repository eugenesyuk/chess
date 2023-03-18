import { Cell } from './Cell'
import { CellColor } from './CellColor';

export class Board {
  cells: Cell[][] = []

  public initCells() {
    for (let y = 0; y < 8; y++) {
      const row: Cell[] = []

      for (let x = 0; x < 8; x++) {
        const isEven = (y + x) % 2 === 0
        const cellColor = isEven ? CellColor.White : CellColor.Black
        row.push(new Cell(this, x, y, cellColor, null))
      }

      this.cells.push(row)
    }
  }
}