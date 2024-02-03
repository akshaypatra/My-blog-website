import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import ArticlesListPage from './pages/ArticlesListPage';
import AboutPage from './pages/About';
import './App.css';
import NavBar from './NavBar';
import NotFoundPage from './pages/notFoundPage';


import LoginPage from './pages/LoginPage';
import CreateAccountPage from './pages/CreateAccountpage';



import {BrowserRouter,Routes,Route} from 'react-router-dom' ;

function App() {
  return (
    <BrowserRouter>
      <div className="App">
          
          <NavBar/>
          <div id="page-body">
            <Routes>
              <Route path="/" element={<HomePage/>}/>
              <Route path="/About" element={<AboutPage/>}/>
              <Route path="/Articles" element={<ArticlesListPage/>}/>
              <Route path="/Articles/:articleId" element={<ArticlePage/>}/>
              <Route path="/login" element={<LoginPage/>}/>
              <Route path="/create-account" element={<CreateAccountPage/>}/>
              <Route path="*" element={<NotFoundPage/>}/>
              
            </Routes>
          </div>
      </div>
    </BrowserRouter>
    
  );
}

export default App;
