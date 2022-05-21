import {Component} from 'react';
import './TicTacTue.css';

const cellIndexes = [
  [ 0,1,2],
  [ 3,4,5],
  [ 6,7,8]
]

class TicTacTue extends Component {
  constructor () {
    super ();
    this.state = {
      turn: 'x',
      cells: Array (9).fill(''),
      winner: '',
      pattern: [],
      scores: {
        x: 0,
        o: 0
      }
    };
  }
  forWinner = squares => {
    let comb = {
      across: [[0, 1, 2], [3, 4, 5], [6, 7, 8]],
      down: [[0, 3, 6], [1, 4, 7], [2, 5, 8]],
      diagnol: [[0, 4, 8], [2, 4, 6]],
    };
    for (let combo in comb) {

      comb[combo].forEach (pattern => {
        if (
          squares[pattern[0]] === '' ||
          squares[pattern[1]] === '' ||
          squares[pattern[2]] === ''
        ) {
        } else if (
          squares[pattern[0]] === squares[pattern[1]] &&
          squares[pattern[1]] === squares[pattern[2]]
        ) {
          const winner =squares[pattern[0]]
          const scores = {
            ...this.state.scores,
            [winner]:  this.state.scores[winner] + 1
          }
          this.setState ({
            pattern,
            winner,
            scores
          });
        }
      });
    }
  };
  handleReset = ()=>{
    this.setState({
      turn: 'x',
      cells: Array (9).fill(''),
      winner: '',
      pattern: [],
    })
  }
  handleClick = num => {
    if(this.state.winner){
      return
    }
    const {turn, cells} = this.state;
    if (cells[num] !== '') {
      return;
    }

    let squares = [...cells];
    if (turn === 'x') {
      squares[num] = 'x';
      this.setState ({turn: 'o',
      clsName: 'elipse'});
    } else {
      squares[num] = 'o';
      this.setState ({turn: 'x'});
    }
    this.setState ({cells: squares});
    this.forWinner (squares);
  };
  render () {
    const {winner, turn, scores} = this.state
console.log('winner', winner);
    const Ceil = ({num}) => {
      const {cells, pattern} = this.state;
      const isCrossed = pattern.includes(num)
      return (
        <td onClick={() => this.handleClick (num)} className={isCrossed ? "crossed": ""}>
          <div className={cells[num] === 'x' ? 'tic': cells[num] === 'o' ? 'tac': ''} />
        </td>
      );
    };
    return (
      <div className='container'>
        <div style={{
          position: 'absolute',
          right: 32,
          top: 32
        }}><p className='scores'>Scores<br/> x = {scores.x} <br/>
               o = {scores.o}</p></div>
        <p className='turn'>Turn: {turn}</p>
        <table>
          <tbody>
            {cellIndexes.map((row,i) =>  <tr key={i}>
              {row.map((num) => <Ceil key={num} num={num} />)}
            </tr>
            )}
          </tbody>
        </table>
        <button className='resetBtn' onClick={this.handleReset}>Reset</button> 
        <div className='result'>
          <p className='resultText'>{winner && `Winner is ${winner}`}</p>
        
          </div>
      </div>
    );
  }
}

export default TicTacTue;
