import './App.css'
import Dashboard from './components/Dashboard'
import AddPartner from './components/AddPartner';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// change the way to show the add user page 
// to like a mini eindow infron to main and it has a blurred background
function App() {

  const [showAddPartner, setShowAddPartner] = useState(false);

  const toggleAddPartner = () => {
    setShowAddPartner(!showAddPartner);
  };

  // return (
  //   <>
  //     <h1 className="title">
  //       C4C: Projects
  //     </h1>
  //     <Dashboard />
  //     <button onClick={toggleAddPartner}>Add Partner</button>
  //     {showAddPartner && <AddPartner />}
  //   </>
  // )

  return (
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/addPartner" element={<AddPartner />}/>
        </Routes>
      </BrowserRouter>
    
  );
}

export default App
