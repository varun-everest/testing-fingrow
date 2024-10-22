import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';
import MainPage from './Components/MainPage/MainPage';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<MainPage />} />
      </Routes>
    </>
  );
}

export default App;
