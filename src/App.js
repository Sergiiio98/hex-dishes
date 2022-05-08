import './App.css';
import Order from "./components/Order";
import Navbar from './components/Navbar';
import ImageBox from './components/ImageBox';


function App() {
  return (
    <div className="App">
      <Navbar/>
      <ImageBox/>
      <Order/>
    </div>
  );
}

export default App;