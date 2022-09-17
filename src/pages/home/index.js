import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';

export default function Home() {

    const navigate = useNavigate();

    return (
        <>
            <div className='flex justify-content-center mx-auto'>
                <h2>Página Inicial</h2>
            </div>
            {/* 
                Aqui ficará a página inicial onde teremos a logo da empresa no fundo,
                O botão para ir ao controle de livros,
                O botão para ir ao controle de autores,
                O botão para ir ao controle de editores,
                O botão para ir ao controle de categorias,
                O botão para ir ao controle de relatórios,
                As informações do cliente,
                resumo do que temos cadastrado no sistema e 
                status de conexão com o Banco
            */}
            <div className='card m-5 p-3'>
                <div className='flex card-container'>
                    <Button
                        label='Livros'
                        icon='pi pi-book'
                        className='p-button-outlined m-5'
                        onClick={() => { navigate('/livros/lista') }}
                    />
                </div>
            </div>
        </>
    );
}
