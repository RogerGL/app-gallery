import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { Inertia } from '@inertiajs/inertia';

export default function Edit({ auth, categories = [], content }) {
    const { data, setData, put, processing, errors, reset } = useForm({
        name: content.name || '',
        description: content.description || '',
        category_id: content.category_id || '',
        img: null,
    });

    const submit = (e) => {
        e.preventDefault();
    
        const categoryId = parseInt(data.category_id, 10);
        const selectedCategory = categories.find(category => category.id === categoryId);
    
        if (!selectedCategory || !selectedCategory.has_content) {
            toast.error('Não é permitido enviar uma foto para este evento');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', data.name);
        formData.append('description', data.description);
        formData.append('category_id', data.category_id);
        if (data.img instanceof File) {
            formData.append('img', data.img);
        }
    
        Inertia.put(route('contents.update', content.id), formData, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                toast.success('Conteúdo atualizado com sucesso.');
            },
            onError: (err) => {
                console.error(err);
                toast.error('Erro ao atualizar o conteúdo.');
            }
        });
    };
    
    return (
        <AuthenticatedLayout user={auth.user}>
            <Toaster richColors position="top-right" />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-bold">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Editar Conteúdo</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit}>
                            <div className="mt-4">
                                <InputLabel htmlFor="name" value="Name" />
                                <TextInput
                                    id="name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                                {errors.name && <div className="mt-2 text-red-500">{errors.name}</div>}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="category_id" value="Category" />
                                <select
                                    id="category_id"
                                    value={data.category_id}
                                    onChange={(e) => setData('category_id', e.target.value)}
                                    className="mt-1 block w-full"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map((category) => (
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                                </select>

                                {errors.category_id && <div className="mt-2 text-red-500">{errors.category_id}</div>}
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="description" value="Descrição" />
                                <TextInput
                                    id="description"
                                    value={data.description}
                                    onChange={(e) => setData('description', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                />
                            </div>

                            <div className="mt-4">
                                <InputLabel htmlFor="img" value="Image" />
                                <input
                                     id="img"
                                     type="file"
                                     onChange={(e) => {
                                         if (e.target.files && e.target.files.length > 0) {
                                             setData('img', e.target.files[0]);
                                         }
                                     }}
                                     className="mt-1 block w-full"
                                />
                                {errors.img && <div className="mt-2 text-red-500">{errors.img}</div>}
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Update
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
