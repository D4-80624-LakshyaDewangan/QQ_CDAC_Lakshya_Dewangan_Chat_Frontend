import logo from './logo.svg';
import './App.css';
import Chat from './component/chat';
import { useEffect, useState } from 'react';
import Login from './component/login';

function App() {
   const [user,setUser]=useState("");
  useEffect(()=>{
  setUser(sessionStorage.getItem("uers") || "");
  },[])
  return (
    <div className="App">
   {
    user ?
     <Chat name={user}/>
     :<Login setUser={setUser} />
   }
     
    </div>
  );
}

export default App;
