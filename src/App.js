import {BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import CoinDetails from './component/CoinDetails';
import Coins from './component/Coins';
import Exchanges from './component/Exchanges';
import Footer from './component/Footer';
import Header from './component/Header'
import Home from './component/Home';
function App() {
  return (
<>
    <Router>
      <Header/>
      <Routes>
      <Route path='/' element={<Home/>} />
          <Route path='/coins' element={<Coins/>} />
          <Route path='/coin/:id' element={<CoinDetails/>} />
          <Route path='/exchanges' element={<Exchanges/>} />
      </Routes>
      <Footer></Footer>
    </Router>

</>
  );
}

export default App;
