import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Cadastro from './Components/Cadastro/cadastro';
import DividaAtiva from './Components/DividaAtiva/dividaativa';
import Entrada from './Components/Entrada/entrada';
import Header from './Components/Header/header';
import Prescricao from './Components/Prescricao/prescricao';
import Home from './Components/Home/home';
import NotFound from './Components/NotFound/notfound';
import Login from './Components/Login/login';
import ProtectedRoute from './Components/Helper/ProtectedRoute';


const Rotas = () => {
    return(
        <BrowserRouter>
            <Header/>
            <Routes>             
                 <Route exact path="/" element={<Home />} />      
                 <ProtectedRoute path="entrada/*" element={<Entrada />} />      
                 <ProtectedRoute path="cadastro" element={<Cadastro />} />     
                 <ProtectedRoute path="dividaativa" element={<DividaAtiva />} />     
                 <ProtectedRoute path="prescricao" element={<Prescricao />} />         
                 <Route path="login/*" element={<Login />} />             
                 <Route path="*" element={<NotFound />} />                       
            </Routes>    
        </BrowserRouter>        
    );
}
export default Rotas;