import React, { useState, useEffect } from 'react';
import { FilterMatchMode, FilterOperator } from 'primereact/api';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Calendar } from 'primereact/calendar';
import { TriStateCheckbox } from 'primereact/tristatecheckbox';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';
import { useNavigate } from 'react-router-dom';
import { Livro } from '../../entities/Livro';
import { classNames } from 'primereact/utils';

const Tabela = (livrosOut: any) => {
    const [livros, setLivros] = useState<Livro[]>([]);
    const [livroSelecionado, setLivroSelecionado] = useState(null);
    const [filtros, setFiltros] = useState<any>(null);
    const [filtroGlobal, setFiltroGlobal] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // customerService.getCustomersLarge().then(data => { setCustomers1(getCustomers(data)); setLoading1(false) });
        setLivros(livrosOut);
        iniciarFiltros();
        setLoading(false);
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const limparFiltros = () => {
        iniciarFiltros();
    }

    const onFiltroGlobalChange = (e: { target: { value: any; }; }) => {
        const value = e.target.value;
        let _filtros = { ...filtros };
        _filtros['global'].value = value;

        setFiltros(_filtros);
        setFiltroGlobal(value);
    }

    const iniciarFiltros = () => {
        setFiltros({
            'global': { value: null, matchMode: FilterMatchMode.CONTAINS },
            'isbn': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'titulo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'subtitulo': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'autor': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'editor': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
            'data': { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.DATE_IS }] },
            'disponivel': { value: null, matchMode: FilterMatchMode.EQUALS }
        });
        setFiltroGlobal('');
    }

    const formatarCabecalho = () => {
        return (
            <div className="flex justify-content-between">
                <Button
                    type="button"
                    icon="pi pi-filter-slash"
                    label="Clear"
                    className="p-button-outlined p-button-raised p-button-secondary"
                    onClick={limparFiltros}
                />
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText
                        value={filtroGlobal}
                        onChange={onFiltroGlobalChange}
                        placeholder="Keyword Search"
                    />
                </span>
            </div>
        )
    }

    const formatDate = (value: Date) => {
        return value.toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        });
    }

    const dateBodyTemplate = (rowData: { date: Date; }) => {
        return formatDate(rowData.date);
    }

    const verifiedBodyTemplate = (rowData: { verified: boolean; }) => {
        return <i 
        className={
            classNames(
                'pi', {
                    'true-icon pi-check-circle': rowData.verified, 
                    'false-icon pi-times-circle': !rowData.verified
                })}
                ></i>;
    }

    // (e: { value: Date; }) => options.filterCallback(e.value, options.index)
    // const dateFilterTemplate = (options: { value: Date; filterCallback: (arg0: Date, arg1: any) => any; index: any; }) => {
    const dateFilterTemplate = (options: { value: Date | Date[] | undefined; filterCallback: (arg0: Date | Date[] | undefined, arg1: any) => void; index: any; }) => {
        return <Calendar 
            value={options.value} 
            onChange={
                (e) => options.filterCallback(e.value, options.index)
            } 
            dateFormat="dd/mm/yy" 
            placeholder="dd/mm/yyyy" 
            mask="99/99/9999" 
            />
    }

    const verifiedFilterTemplate = (options: { value: boolean | null | undefined; filterCallback: (arg0: boolean | null | undefined) => void; }) => {
        return <TriStateCheckbox 
        value={options.value} 
        onChange={(e) => options.filterCallback(e.value)} />
    }

    const cabecalho = formatarCabecalho();
    const navigate = useNavigate();

    //setLivroSelecionado(e.value.isbn)
    return (
        <div className="card m-5">
            <DataTable
                value={livros}
                paginator
                stripedRows
                selectionMode="single"
                selection={livroSelecionado}
                onSelectionChange={e => navigate(`/livro/${e.value.isbn}`)}
                rows={10}
                dataKey="isbn"
                filters={filtros}
                filterDisplay="menu"
                loading={loading}
                responsiveLayout="scroll"
                globalFilterFields={[
                    'isbn',
                    'titulo',
                    'subtitulo',
                    'autor',
                    'editor'
                ]}
                header={cabecalho}
                emptyMessage="Nenhum Livro encontrado na pesquisa."
            >
                <Column
                    field="isbn"
                    header="ISBN"
                    sortable
                    filter
                    filterPlaceholder="Filtrar por ISBN"
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="titulo"
                    header="Título"
                    sortable
                    filter
                    filterPlaceholder="Filtrar por Título"
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="subtitulo"
                    header="Subtitulo"
                    sortable
                    filter
                    filterPlaceholder="Filtrar por Subtítulo"
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="autor"
                    header="Autor"
                    sortable
                    filter
                    filterPlaceholder="Filtrar por Autor"
                    style={{ minWidth: '12rem' }}
                />
                <Column
                    field="editor"
                    header="Editor"
                    sortable
                    filter
                    filterPlaceholder="Filtrar por Editor"
                    style={{ minWidth: '12rem' }}
                />
                {/* <Column 
                    filterField="date"
                    header="Data de Publicação"
                    sortable
                    filter
                    style={{ minWidth: '10rem' }}
                    dataType="date"
                    body={dateBodyTemplate}
                    filterElement={dateFilterTemplate}
                /> */}
                <Column 
                    field="disponivel" 
                    header="Disponível?" 
                    dataType="boolean" 
                    bodyClassName="text-center" 
                    style={{ minWidth: '8rem' }} 
                    body={verifiedBodyTemplate} 
                    filter 
                    filterElement={verifiedFilterTemplate} 
                />

            </DataTable>
        </div>
    );
};

export default Tabela