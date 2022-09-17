import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createConnection, getRepository } from 'typeorm'
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputMask} from 'primereact/inputmask';
import { Calendar } from 'primereact/calendar';
import { locale } from 'primereact/api';
import { ToggleButton } from 'primereact/togglebutton';
import { Livro } from '../../entities/Livro';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import ConnectionObject from '../../utils/connectionObject';

const CadastroLivro = () => {

    const [isbn, setIsbn]               = useState<string>('');
    const [titulo, setTitulo]           = useState<string>('');
    const [subtitulo, setSubtitulo]     = useState<string>('');
    const [autor, setAutor]             = useState<string>('');
    const [editor, setEditor]           = useState<string>('');
    const [data, setData]               = useState<any>();
    const [disponivel, setDisponivel]   = useState<boolean>(true);

    const navegar = useNavigate();

    useEffect(()=>{
        createConnection(ConnectionObject)
    }, [])

    locale('pt');

    const salvar = () => {
        // aqui ficará toda a lógica de controle de formulário
        const livro = new Livro();
        livro.isbn = isbn;
        livro.titulo = titulo;
        livro.subtitulo = subtitulo;
        livro.autor = autor;
        livro.editor = editor;
        livro.data = data;
        livro.disponivel = disponivel;

        getRepository(Livro).save(livro);

        //limpeza dos campos
        setIsbn('');
        setTitulo('');
        setSubtitulo('');
        setAutor('');
        setEditor('');
        setData(undefined);
        setDisponivel(true);
    }

    return (
        <>
            <div className='flex justify-content-center mx-auto'>
                <h2>Cadastro de Livros</h2>
            </div>

            <div className='card m-5'>
                <div className='card-container'>

                    {/* Campo de texto "ISBN" com label flutuante e onchange */}
                    <span className="p-float-label m-5">
                        <InputText 
                            id="isbn" 
                            value={isbn}
                            className='w-full' 
                            onChange={(e)=> setIsbn(e.target.value)}
                        />
                        <label htmlFor="isbn">ISBN</label>
                    </span>

                    {/* Campo de texto "Título" com label flutuante e onchange */}
                    <span className="p-float-label m-5">
                        <InputText 
                            id="titulo" 
                            value={titulo}
                            className='w-full' 
                            onChange={(e)=> setTitulo(e.target.value)}
                        />
                        <label htmlFor="titulo">Título</label>
                    </span>

                    {/* Campo de texto "Subtítulo" com label flutuante e onchange */}
                    <span className="p-float-label m-5">
                        <InputText 
                            id="subtitulo" 
                            value={subtitulo}
                            className='w-full' 
                            onChange={(e) => setSubtitulo(e.target.value)}
                        />
                        <label htmlFor="subtitulo">Subtítulo</label>
                    </span>

                    {/* Campo de texto "Autor" com label flutuante e onchange */}
                    <span className="p-float-label m-5">
                        <InputText 
                            id="autor" 
                            value={autor}
                            className='w-full' 
                            onChange={(e) => setAutor(e.target.value)}
                            />
                        <label htmlFor="autor">Autor</label>
                    </span>

                    {/* Campo de texto "Editor" com label flutuante e onchange */}
                    <span className="p-float-label m-5">
                        <InputText 
                            id="editor"
                            value={editor}
                            className='w-full'
                            onChange={(e)=>{setEditor(e.target.value)}}
                        />
                        <label htmlFor="editor">Editor</label>
                    </span>

                    {/* Campo de texto "Data de Compra" ou com mascara de data  ou data calendar*/}
                    <span className="p-float-label m-5">
                        {/* <InputMask 
                            className='w-full' 
                            id="data" 
                            value={data}
                            mask="99/99/9999" 
                            onChange={(e) => setData(e.value)}
                        /> */}
                        <Calendar 
                            className='w-full'
                            id="data" 
                            value={data} 
                            dateFormat="dd/mm/yyyy"
                            onChange={(e) => setData(e.target.value)}
                            showButtonBar 
                        />
                        <label htmlFor="data">Data de Publicação</label>
                    </span>

                    {/* Botão toggle para "Disponível?" sem label flutuante */}
                    <span className="m-5">
                        <ToggleButton 
                            id="disponivel" 
                            checked={disponivel}
                            className='w-full'
                            onIcon="pi pi-check"
                            onLabel="Diponível"
                            offIcon="pi pi-times"
                            offLabel="Indisponível"
                            aria-label="Confirmation"
                            onChange={(e) => setDisponivel(e.value)}
                        />
                        <label htmlFor="disponivel">Disponível?</label>
                    </span>
                </div>


                <div className='flex flex-row-reverse card-container'>
                    <Button
                        label='Salvar'
                        icon='pi pi-check-circle'
                        className='p-button-outlined p-button-success inline-block h-4rem m-5'
                        onClick={() => salvar()}
                    />
                    <Button
                        label='Cancelar'
                        icon='pi pi-times-circle'
                        className='p-button-outlined p-button-danger inline-block h-4rem m-5'
                        onClick={() => navegar(-1)}
                    />
                </div>
            </div>

        </>
    )
}

export default CadastroLivro