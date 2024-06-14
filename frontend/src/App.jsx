import './App.css'
import Dashboard from './components/Dashboard'
import AddPartner from './components/AddPartner';
import { BrowserRouter, Routes, Route } from "react-router-dom";

// change the way to show the add user page 
// to like a mini eindow infron to main and it has a blurred background
function App() {

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
