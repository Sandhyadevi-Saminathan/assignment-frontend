import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Sidebar from './Portal/Sidebar';
import Topbar from './Portal/Topbar';
import Portal from './Portal/Portal';
import Home from './Home/Home';
import Createuser from './User/Createuser';
import CreateTeam from './Team/CreateTeam';
import TeamDetails from './Team/TeamDetails';
import TeamList from './Team/TeamList';
import Viewuser from './User/Viewuser';
import Edituser from './User/EditUser';

function App() {
  return (
    <div className="App">
     <BrowserRouter>
        <Routes>
          <Route path='/' element={<Portal />}>
          <Route path="sidebar" element={<Sidebar />} />
          <Route path="topbar" element={<Topbar />} />
          <Route path = 'user/createuser' element={<Createuser/>} />
          <Route path = 'user/viewuser/:id' element={<Viewuser/>} />
          <Route path = 'user/edituser/:id' element={<Edituser/>} />
          <Route path = 'team/createteam' element={<CreateTeam/>} />
          <Route path = 'team/teamdetails/:id' element={<TeamDetails/>} />
          <Route path = 'team/teamlist' element={<TeamList/>} />
          <Route index element={<Home />} />
          </Route>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
