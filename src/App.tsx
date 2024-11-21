import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Auth/Login'
import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import LandingPage from './components/page/Index';
import SignUp from './components/Auth/SignUp';
import Dashboard from './components/Dashboard';



function App() {
  // const todos = [new Todo('Learn React'), new Todo('Learn Typescript'), new Todo('Learn Data Analytics')];

  
  return (
    <Router>
      
      <ErrorBoundary>
      <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
       </ErrorBoundary>
      </Router>
    

  )
}

export default App
