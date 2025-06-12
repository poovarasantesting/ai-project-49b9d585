import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Checkout from './pages/Checkout';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Checkout />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;