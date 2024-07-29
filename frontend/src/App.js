
import Login from "./components/Login";
import DataProvider from "./components/context/DataProvider";
import Home from "./components/home/Home";
import Header from "./components/header/Header";
import CreatePost from './components/create/CreatePost';
import DetailView from './components/details/DetailView';

import { BrowserRouter, Routes, Route, Outlet, Navigate } from "react-router-dom";

import { useState } from 'react';

const PrivateRoute = ({ isAuthenticated, ...props }) => {

  return isAuthenticated ?
  <>
  <Header />
  <Outlet />
  </>
  : <Navigate replace to='/login' />

}

function App() {
  const [isAuthenticated, isUserAuthenticated] = useState(false);

  return (
    <DataProvider>
      <BrowserRouter>
      <div style={{ marginTop: 64 }}>
      <Routes>
        <Route path="/login" element={<Login isUserAuthenticated={isUserAuthenticated} />} />

        <Route path="/" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/" element={<Home />} />
         </Route>

         <Route path="/create" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/create" element={<CreatePost />} />
         </Route>

         <Route path="/details/:id" element={<PrivateRoute isAuthenticated={isAuthenticated} />}>
          <Route path="/details/:id" element={<DetailView />} />
         </Route>
      
      </Routes>
      </div>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
