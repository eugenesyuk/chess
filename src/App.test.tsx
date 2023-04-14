import { render, screen } from '@testing-library/react'
import App from './App'

test('Renders chess board', () => {
  const { container } = render(<App />);

  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const board = container.querySelector('.board')
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const whiteCells = container.querySelectorAll('.cell.white')
  // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
  const blackCells = container.querySelectorAll('.cell.black')

  expect(board).toBeInTheDocument()
  expect(whiteCells).toHaveLength(32)
  expect(blackCells).toHaveLength(32)
})

test('Renders chess board labels', () => {
  render(<App />);

  const labelsA = screen.getAllByText('A');
  const labelsB = screen.getAllByText('B');
  const labelsC = screen.getAllByText('C');
  const labelsD = screen.getAllByText('D');
  const labelsE = screen.getAllByText('E');
  const labelsF = screen.getAllByText('F');
  const labelsG = screen.getAllByText('G');
  const labelsH = screen.getAllByText('H');

  const labels1 = screen.getAllByText('1');
  const labels2 = screen.getAllByText('2');
  const labels3 = screen.getAllByText('3');
  const labels4 = screen.getAllByText('4');
  const labels5 = screen.getAllByText('5');
  const labels6 = screen.getAllByText('6');
  const labels7 = screen.getAllByText('7');
  const labels8 = screen.getAllByText('8');

  expect(labelsA).toHaveLength(2)
  expect(labelsB).toHaveLength(2)
  expect(labelsC).toHaveLength(2)
  expect(labelsD).toHaveLength(2)
  expect(labelsE).toHaveLength(2)
  expect(labelsF).toHaveLength(2)
  expect(labelsG).toHaveLength(2)
  expect(labelsH).toHaveLength(2)

  expect(labels1).toHaveLength(2)
  expect(labels2).toHaveLength(2)
  expect(labels3).toHaveLength(2)
  expect(labels4).toHaveLength(2)
  expect(labels5).toHaveLength(2)
  expect(labels6).toHaveLength(2)
  expect(labels7).toHaveLength(2)
  expect(labels8).toHaveLength(2)
})