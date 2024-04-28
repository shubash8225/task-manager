import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import TasksView from './Pages/TasksView';
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from './Pages/Login';
import PrivateRoute from './Components/PrivateRoute';

function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path='/task-view' element={<PrivateRoute />}>
            <Route exact path='/task-view' element={<TasksView />}/>
          </Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
