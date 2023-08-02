import logo from "./logo.svg";
import "./App.css";
import CWG from "cwg";
import React, { useEffect, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WordPuzzleUi20230725 from "./wordPuzzleUi20230725/wordPuzzleUi20230725";
import CwpViewer from "./document/cwpviewer";
import Pdfviewer from "./questionviewer/questionviewer";
//https://codesandbox.io/s/stupefied-rosalind-3fsy8q?file=/demo.tsx
function App() {
  const [data, setData] = useState([])
  useEffect(()=>{
  },[data])
  return (
    <div className="App">
      <header className="App-header">
        <BrowserRouter>

          <Routes>

            <Route path="/" element={<WordPuzzleUi20230725 setData = {setData}/>}></Route>
            
            <Route path="/pdf" element={<Pdfviewer data = {data}/>}></Route>
            <Route path="/viewer" element={<CwpViewer data = {data.length==0?null:data[0]['cwg']['ownerMap']}/>}></Route>
          </Routes>
        </BrowserRouter>
      </header>
    </div>
  );
}

export default App;
