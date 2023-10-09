import './App.css';


import { BrowserRouter,Route,Routes} from 'react-router-dom';
import Header from './components/Header';
import LoginAndSignUp from './components/login_and_signup/LoginAndSignUp';
import AdminPage from './components/admin/AdminPage';
import { useState } from 'react';
import AddUser from './components/admin/AddUser';

function App() {
  const[exit,setExit] = useState(false);
  return (
    <div className="App">               
    <BrowserRouter>             
      <Header exit={exit} setExit={setExit}/> 
          <Routes>
          <Route path="/" exact element={<LoginAndSignUp />}/>
          <Route path="/admin" element={<AdminPage setExit={setExit}/>}/>
          <Route path="/addUser" element={<AddUser setExit={setExit}/>}/>            
          </Routes>                 
    </BrowserRouter>
  </div>
  );
}

export default App;
