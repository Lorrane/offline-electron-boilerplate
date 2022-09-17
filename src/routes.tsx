import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Imports da Tela Inicial
import Home from './pages/home';

//Imports dos Livros
import Livros from './pages/livros';
import CadastroLivros from './pages/livros/cadastro';
import DetalheLivro from './pages/livros/detalhe';

function Rotas() {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/livros/lista" element={<Livros />} />
                <Route path="/livros" >
                    <Route path=":idLivro" element={<DetalheLivro />} />
                </Route>
                <Route path="/livros/cadastro" element={<CadastroLivros />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Rotas