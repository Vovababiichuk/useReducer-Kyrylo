import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { ReducePage } from './ReducePage';
import { ExampleTwo } from './ExampleTwo';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ReducePage />} />
        <Route path="/example2" element={<ExampleTwo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
