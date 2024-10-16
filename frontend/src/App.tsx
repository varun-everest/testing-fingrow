import { Route, Routes } from 'react-router-dom';
import Homepage from './Components/Homepage/Homepage';
import Register from './Components/Register/Register';
import Login from './Components/Login/Login';


function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
