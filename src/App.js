import logo from './logo.svg';
import './App.css';
import CWG from 'cwg'
import WordPuzzleUi20230725 from'./wordPuzzleUi20230725/wordPuzzleUi20230725'
//https://codesandbox.io/s/stupefied-rosalind-3fsy8q?file=/demo.tsx
function App() {
  const words = [
    'be',
    'bring',
    'containue',
    'curl',
    'decide',
    'fit',
    'fix',
    'get',
    'go',
    'have',
    'join',
    'lie',
    'marry',
    'muliply',
    'nod',
    'plan',
    'post',
    'pretend',
    'rake',
    'repair',
    'rob',
    'scream',
    'shout',
    'sink',
    'take',
    'teach',
    'tickle',
    'walk',
    'worry',
    'yell'
  ]
  
  const result = CWG(words)
  console.log(result)
  return (
    
    <div className="App">
      <header className="App-header">
        <WordPuzzleUi20230725></WordPuzzleUi20230725>
      </header>
    </div>
  );
}

export default App;
