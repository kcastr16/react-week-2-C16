import Navbar from './components/Navbar';
import './App.css';
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Movie from './pages/Movie';
import Todo from './pages/Todo';


function App() {

  return (
    <>
    <Navbar />

      <div className='container'>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/movie' element={<Movie />} />
          <Route path='/todo' element={<Todo />} />
        </Routes>
      </div>

    </>
  )
}

export default App
