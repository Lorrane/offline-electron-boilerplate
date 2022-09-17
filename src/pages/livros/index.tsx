import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createConnection, getRepository } from 'typeorm';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
// import { buscaLivros } from '../../message-control/renderer';
import ConnectionObject from '../../utils/connectionObject';
import Tabela from '../../component/tabela';
import { Livro } from '../../entities/Livro';

const Livros = () => {

    const navigate = useNavigate();
    const [livros, setLivros] = useState<Livro[]>();

    useEffect( () => {

        createConnection(ConnectionObject).catch(console.error)
        buscarLivros();

        // buscaLivros().then((result: any[]) =>{
        //     console.log({result})
        //     setLivros(result)
        // });
    }, []);

     const buscarLivros = async () => {
        const _livros = await getRepository(Livro).find();
        setLivros(_livros);
    }

    return (
        <>
            <div className='flex justify-content-center'>
                <h2>Controle de Livros</h2>
            </div>
            <div className='flex justify-content-between m-5'>
                <Button
                    label='Voltar'
                    icon='pi pi-arrow-circle-left'
                    className='p-button-outlined'
                    onClick={() => navigate(-1)}
                />
                <Button
                    label='Cadastrar'
                    icon='pi pi-plus-circle'
                    className='p-button-outlined'
                    onClick={() => navigate('/livros/cadastro')}
                />
            </div>

            <Tabela livrosOut = {livros} />

        </>
    )
}

export default Livros