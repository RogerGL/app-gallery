import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { Eraser, PencilLine } from 'lucide-react';
import DataTable from 'react-data-table-component';

export default function Index({ auth, contents }) {
    const [confirmingContentDeletion, setConfirmingContentDeletion] = useState(false);
    const contentId = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { setData, delete: destroy, processing, reset, errors } = useForm();
    
    const confirmContentDelete = (id) => {
        setConfirmingContentDeletion(true);
        contentId.current = id;
    };
    const customStyles = {
        headRow: {
            style: {
                backgroundColor: '#1F2937',
                color: '#FFFFFF',
                borderBottom: 'none',
            },
        },
        headCells: {
            style: {
                padding: '12px 24px',
                fontWeight: 'bold',
                justifyContent: 'center',
            },
            
        },
        cells:{
            style: {
                justifyContent: 'center',
            }
        },
        rows: {
            style: {
                backgroundColor: '#FFFFFF',
                color: '#1F2937',
            },
        },
        pagination: {
            style: {
                borderTop: 'none',
            },
        },
    };
    const deleteContent = () => {
        destroy(route('contents.delete', { content: contentId.current }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingContentDeletion(false);
        reset();
    };

    //const filteredContents = contents.filter(content => 
    //    (content.name && content.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
    //    (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase()))
    //);

    return (
        <AuthenticatedLayout user={auth.user}>
            <header className="bg-slate-900 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-white leading-tight">Conteúdos</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link href={route('contents.create')} className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            Criar conteúdo
                        </Link>
                       
                    </div>

                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
                                <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                                            <DataTable
                                                columns={[
                                                    { name: 'Id', selector: row => row.id, sortable: true, },
                                                    { name: 'Nome', selector: row => row.name, sortable: true, },
                                                    { 
                                                        name: 'Categoria', 
                                                        selector: row => row.category.name, 
                                                        sortable: true,
                                                        cell: row => <div className="py-4 px-6 whitespace-nowrap ">{row.category.name}</div>
                                                    },
                                                    { 
                                                        name: 'Usuário', 
                                                        selector: row => row.user.name, 
                                                        sortable: true,
                                                        cell: row => <div className="py-4 px-6 whitespace-nowrap ">{row.user.name}</div>
                                                    },
                                                    {
                                                        name: 'Imagem',
                                                        cell: row => (
                                                            <div className="py-4 px-6 whitespace-nowrap ">
                                                                <a href={`/storage/${row.img}`} target="_blank" rel="noopener noreferrer" className="w-4/6 h-20">
                                                                    <img src={`/storage/${row.img}`} className="w-full h-full" />
                                                                </a>
                                                            </div>
                                                        )
                                                    },
                                                    {
                                                        name: 'Ações',
                                                        cell: row => (
                                                            <div className=" space-x-2 flex justify-center ">
                                                                <button
                                                                    onClick={() => window.location.href = route('contents.edit', { content: row.id })}
                                                                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1.5 px-1.5 rounded flex justify-center"
                                                                >
                                                                    <PencilLine />
                                                                </button>
                                                                <button
                                                                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-1.5 rounded flex justify-center"
                                                                    onClick={() => confirmContentDelete(row.id)}
                                                                >
                                                                    <Eraser />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                data={contents}
                                                pagination
                                                paginationPerPage={5}
                                                paginationRowsPerPageOptions={[5]}
                                                customStyles={customStyles}
                                            />
                                        </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Modal show={confirmingContentDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Você quer excluir esse conteúdo?
                    </h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing} onClick={deleteContent}>
                            Excluir conteúdo
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
