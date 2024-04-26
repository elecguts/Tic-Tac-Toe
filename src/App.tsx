import React, { useState } from 'react'

export function App() {
  const [game, setGame] = useState({
    board: [
      [' ', ' ', ' '],
      [' ', ' ', ' '],
      [' ', ' ', ' '],
    ],
    id: null,
    winner: null,
  })

  async function handleNewGame() {
    const response = await fetch(
      'https://sdg-tic-tac-toe-api.herokuapp.com/game',
      {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
      }
    )

    if (response.ok) {
      const newGame = await response.json()

      setGame(newGame)
    }
  }

  async function handleClickCell(row: number, column: number) {
    if (game.id === null || game.winner || game.board[row][column] !== ' ') {
      return
    }
    console.log(game.id)
    const url = `https://sdg-tic-tac-toe-api.herokuapp.com/game/${game.id}`
    const body = { row: row, column: column }
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(body),
    })
    if (response.ok) {
      const newGame = await response.json()
      setGame(newGame)
    }
  }
  const header = game.winner
    ? `${game.winner} is the winner`
    : `Tic Tac Toe #${game.id}`

  return (
    <div>
      <h1>
        {header} - <button onClick={handleNewGame}>New</button>
      </h1>
      <ul>
        {game.board.map((boardRow, rowIndex) => {
          return boardRow.map((cell, columnIndex) => {
            return (
              <li
                key={columnIndex}
                className={cell === ' ' ? '' : 'taken'}
                onClick={() => handleClickCell(rowIndex, columnIndex)}
              >
                {cell}
              </li>
            )
          })
        })}
      </ul>
    </div>
  )
}
