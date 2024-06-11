import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { X, PencilLine, Eraser, BookImage, PlusCircle } from "lucide-react";
import DataTable from 'react-data-table-component';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export default function Index({ auth, categories }) {
    const [confirmingCategoryDeletion, setConfirmingCategoryDeletion] = useState(false);
    const [filterText, setFilterText] = useState('');
    const [filterEventDate, setFilterEventDate] = useState('');
    const categoryId = useRef(null);

    const { setData, delete: destroy, processing, reset } = useForm();

    const confirmCategoryDelete = (id) => {
        setConfirmingCategoryDeletion(true);
        categoryId.current = id;
    };

    const deleteCategory = (e) => {
        destroy(route('categories.delete', { category: categoryId.current }), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingCategoryDeletion(false);
        reset();
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
            },
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

    const filteredCategories = categories.data.filter(
        category =>
            (filterText === '' || category.id.toString().includes(filterText.toLowerCase()) || category.name.toLowerCase().includes(filterText.toLowerCase()) || category.desc.toLowerCase().includes(filterText.toLowerCase())) &&
            (filterEventDate === '' || category.event_date.includes(filterEventDate))
    );

    const redirectToGallery = (categoryId) => {
        const uuid = uuidv4();
        window.location.href = route('events.show', { event: `${uuid}-${categoryId}` });
    };

    const redirectToCreateContent = (categoryId) => {
        window.location.href = route('contents.create', { category: categoryId });
    };

    const toggleContent = (categoryId) => {
        axios.patch(route('categories.toggleContent', { category: categoryId }))
            .then(response => {
                const updatedCategories = categories.data.map(category => {
                    if (category.id === categoryId) {
                        return { ...category, has_content: response.data.has_content };
                    }
                    return category;
                });
                window.location.href = route('categories.index');
                setData('categories', { ...categories, data: updatedCategories });
            })
            .catch(error => {
                console.error('Error updating content state:', error);
            });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Categorias</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-1">
                    <div className='flex justify-between'>
                        <div className='max-w-7xl sm:px-6 lg:px-1'>
                            <Link
                                href={route('categories.create')}
                                className="inline-flex items-center my-4 px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Criar Categoria
                            </Link>
                        </div>
                        <div className="mb-4 grid col grid-cols-1 md:grid-cols-3 gap-4">
                            <TextInput
                                id="filterText"
                                value={filterText}
                                onChange={(e) => setFilterText(e.target.value)}
                                placeholder="Filtrar por Id, Nome ou Descrição..."
                                className="mt-1 block w-full "
                            />
                            <TextInput
                                id="filterEventDate"
                                value={filterEventDate}
                                onChange={(e) => setFilterEventDate(e.target.value)}
                                type="date"
                                placeholder="Filtrar por Data do Evento..."
                                className="mt-1 block w-full"
                            />
                        </div>
                    </div>
                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                        <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                                            <DataTable
                                                columns={[
                                                    { name: 'Id', selector: row => row.id, sortable: true, },
                                                    { name: 'Nome', selector: row => row.name, sortable: true, },
                                                    { name: 'Descrição', selector: row => row.desc, sortable: true, },
                                                    { name: 'Data do Evento', selector: row => row.event_date, sortable: true, },
                                                    {
                                                        name: 'Conteúdo Permitido',
                                                        cell: row => (
                                                            <input
                                                                type="checkbox"
                                                                checked={row.has_content}
                                                                onChange={() => toggleContent(row.id)}
                                                            />
                                                        ),
                                                    },
                                                    {
                                                        name: 'Ações',
                                                        cell: row => (
                                                            <div className=" space-x-1">
                                                                <button
                                                                    onClick={() => window.location.href = route('categories.edit', { category: row.id })}
                                                                    className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-1.5 px-1.5 rounded"
                                                                >
                                                                    <PencilLine />
                                                                </button>
                                                                <button
                                                                    className="bg-red-700 hover:bg-red-900 text-white font-bold py-1.5 px-1.5 rounded"
                                                                    onClick={() => confirmCategoryDelete(row.id)}
                                                                >
                                                                    <Eraser />
                                                                </button>
                                                                <button
                                                                    className="bg-amber-700 hover:bg-amber-900 text-white font-bold py-1.5 px-1.5 rounded"
                                                                    onClick={() => redirectToGallery(row.id)}
                                                                >
                                                                    <BookImage />
                                                                </button>
                                                                <button
                                                                    className="bg-green-700 hover:bg-green-900 text-white font-bold py-1.5 px-1.5 rounded"
                                                                    onClick={() => redirectToCreateContent(row.id)}
                                                                >
                                                                    <PlusCircle />
                                                                </button>
                                                            </div>
                                                        ),
                                                    },
                                                ]}
                                                data={filteredCategories}
                                                pagination
                                                paginationPerPage={10}
                                                paginationRowsPerPageOptions={[10]}
                                                customStyles={customStyles}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Modal show={confirmingCategoryDeletion} onClose={closeModal}>
                <div className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">Você quer excluir essa categoria?</h2>
                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancel</SecondaryButton>
                        <DangerButton className="ms-3" disabled={processing} onClick={deleteCategory}>
                            Excluir categoria
                        </DangerButton>
                    </div>
                </div>
            </Modal>
        </AuthenticatedLayout>
    );
}
