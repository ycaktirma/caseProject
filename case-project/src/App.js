import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Home } from './components/layout/Home/Home'
import { Customers } from './components/layout/Customers/Customers'
import { Header } from './components/shared/Header/Header';
import { Footer } from './components/shared/Footer/Footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Product } from './components/layout/Products/Product';
import { Report } from './components/layout/Reports/Reports';
import { Dashboard } from './components/layout/Dashboard/Dashboard';

function App() {
  return (
    <div>
      <Header></Header>
      <BrowserRouter>
        <Routes>
          <Route index element= {<Home />} ></Route>
          <Route path='/home' element= {<Home />}></Route>
          <Route path='/customers' element= {<Customers />}></Route>
          <Route path='/products' element= {<Product />}></Route>
          <Route path='/reports' element= {<Report />}></Route>
          <Route path='/dashboard' element= {<Dashboard />}></Route>
        </Routes>
      </BrowserRouter>
      <Footer></Footer>
    </div>
    
  );
}

export default App;
