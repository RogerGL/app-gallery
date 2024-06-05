import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, contents }) {
    const [confirmingContentDeletion, setConfirmingContentDeletion] = useState(false);
    const contentId = useRef(null);
    const [searchTerm, setSearchTerm] = useState('');

    const { setData, delete: destroy, processing, reset, errors } = useForm();

    const confirmContentDelete = (id) => {
        setConfirmingContentDeletion(true);
        contentId.current = id;
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

    const filteredContents = contents.filter(content => 
        (content.name && content.name.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (content.description && content.description.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    return (
        <AuthenticatedLayout user={auth.user}>
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Conteúdos</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center mb-4">
                        <Link href={route('contents.create')} className="inline-flex items-center px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                            Criar conteúdo
                        </Link>
                        <div>
                            <TextInput
                                type="text"
                                className="ml-4"
                                placeholder="Pesquisar..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                        <div className="flex flex-col">
                            <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                                <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
                                    <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                        <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                            <thead className="bg-slate-900">
                                                <tr>
                                                    <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-center">
                                                            ID
                                                        </span>
                                                    </th>
                                                    <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-center">
                                                            Name
                                                        </span>
                                                    </th>
                                                    <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-center">
                                                            Descrição
                                                        </span>
                                                    </th>
                                                    <th scope="col" className=" text-xs font-semibold tracking-wider text-center text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-center">
                                                            Imagem
                                                        </span>
                                                    </th>
                                                    <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                        <span className="inline-flex py-3 px-6 w-full justify-center">
                                                            Ação
                                                        </span>
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody className="bg-white divide-y divide-gray-200">
                                                {filteredContents.map((content) => (
                                                    <tr key={content.id}>
                                                        <td className="py-4 px-6 whitespace-nowrap text-center">
                                                            {content.id}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap text-center">
                                                            {content.name}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap text-center">
                                                            {content.description}
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap text-center flex justify-center">
                                                            <img
                                                                src={`/storage/${content.img}`}
                                                                className="w-4/6 h-20"
                                                            />
                                                        </td>
                                                        <td className="py-4 px-6 whitespace-nowrap text-center">
                                                            <Link href={route('contents.edit', { content: content.id })} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">
                                                                Edit
                                                            </Link>
                                                            <DangerButton className="ms-3" onClick={() => confirmContentDelete(content.id)}>
                                                                Excluir
                                                            </DangerButton>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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
