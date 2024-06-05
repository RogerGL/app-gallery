import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm, usePage } from '@inertiajs/react';
import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import Modal from '@/Components/Modal';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import {X, CircleCheck, CircleSlash} from "lucide-react";

export default function Index({ auth, categories }) {
    const [confirmingCategoryDeletion, setConfirmingCategoryDeletion] = useState(false);
    const categoryId = useRef(null);

    const { setData, delete: destroy, processing, reset, errors } = useForm();

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

    return (
      <AuthenticatedLayout user={auth.user}>
          <header className="bg-white shadow">
              <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                  <h2 className="font-semibold text-xl text-gray-800 leading-tight">Categorias</h2>
              </div>
          </header>

          <div className="py-12">
              <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
                  <Link href={route('categories.create')} className="inline-flex items-center my-4 px-4 py-2 bg-green-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-green-700 focus:bg-green-700 active:bg-green-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150">
                      Criar Categoria
                  </Link>

                  <div className="overflow-hidden bg-white shadow-md sm:rounded-lg">
                      <div className="flex flex-col">
                          <div className="overflow-x-auto -my-2 sm:-mx-6 lg:-mx-8">
                              <div className="inline-block py-2 min-w-full align-middle sm:px-6 lg:px-8">
                                  <div className="overflow-hidden border-b border-gray-200 shadow sm:rounded-lg">
                                      <table className="min-w-full divide-y divide-gray-200 table-fixed">
                                          <thead className="bg-slate-900">
                                              <tr>
                                                  <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                      <span className="inline-flex py-3 px-6 w-full justify-center">ID</span>
                                                  </th>
                                                  <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                      <span className="inline-flex py-3 px-6 w-full justify-center">Nome</span>
                                                  </th>
                                                  <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                      <span className="inline-flex py-3 px-6 w-full justify-center">Descrição</span>
                                                  </th>
                                                  <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                      <span className="inline-flex py-3 px-6 w-full justify-center">Status</span>
                                                  </th>
                                                  <th scope="col" className=" text-xs font-semibold tracking-wider text-left text-white uppercase">
                                                      <span className="inline-flex py-3 px-6 w-full justify-center">Ação</span>
                                                  </th>
                                                 
                                              </tr>
                                          </thead>
                                          <tbody className="bg-white divide-y divide-gray-200 ">
                                              {categories.data.map((category) => (
                                                  <tr key={category.id}>
                                                      <td className="py-4 px-6 whitespace-nowrap text-center">{category.id}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-center">{category.name}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-center">{category.desc}</td>
                                                      <td className="py-4 px-6 whitespace-nowrap flex justify-center">
                                                          {category.status ? (
                                                              <CircleCheck className='text-green-500 '/>
                                                          ) : (
                                                              <CircleSlash className='text-red-500'/>
                                                          )}
                                                      </td>
                                                      <td className="py-4 px-6 whitespace-nowrap text-center ">
                                                          <Link href={route('categories.edit', { category: category.id })} className="bg-blue-700 hover:bg-blue-900 text-white font-bold py-2 px-4 rounded">Edit</Link>
                                                          <DangerButton className="ms-3" onClick={() => confirmCategoryDelete(category.id)}>Excluir</DangerButton>
                                                      </td>
                                                  </tr>
                                              ))}
                                          </tbody>
                                      </table>
                                  </div>
                                  <div className="mt-4 mb-4 flex justify-center">
                                        {categories.links.filter(link => link.label !== 'Next &raquo;' && link.label !== '&laquo; Previous').map((link) => (
                                            <Link
                                                key={link.label}
                                                href={link.url}
                                                className={`${link.active ? 'font-bold' : ''} mx-1 px-2 py-1 border rounded ${link.active ? 'bg-slate-900 text-white' : 'bg-white text-slate-700'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        ))}
                                       
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
                      <DangerButton className="ms-3" disabled={processing} onClick={deleteCategory}>Excluir categoria</DangerButton>
                  </div>
              </div>
          </Modal>
      </AuthenticatedLayout>
  );
}
