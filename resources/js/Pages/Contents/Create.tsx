import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import { Inertia } from '@inertiajs/inertia';

export default function Create({ auth, categories = [], predefinedCategoryId = '', contents = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        name: '',
        description: '',
        category_id: predefinedCategoryId || '',
        img: null,
    });

    const submit = async (e) => {
        e.preventDefault();

        const categoryId = parseInt(data.category_id, 10); // Convertendo para número
        const selectedCategory = categories.find(category => category.id === categoryId);

        if (!selectedCategory || !selectedCategory.has_content) {
            toast.error('Não é permitido enviar uma foto para este evento');
            return;
        }

        const existingContent = contents.find(content => content.user_id === auth.user.id && content.category_id == predefinedCategoryId);
        console.log(setData)
        if(existingContent != null){
            Inertia.put(route('contents.update', existingContent.id), data, {
                onSuccess: () => {
                    console.log(data);
                },
            });
        }else{
            post(route('contents.store'), {
                preserveScroll: true,
                onSuccess: () => reset(),
                onError: () => {
                    toast.error('Erro ao criar o conteúdo.');
                }
            });
        }
            
        
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Toaster richColors position="top-right" />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-bold">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Conteúdo Criação</h2>
                </div>
            </header>

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6">
                    <div className="p-4 sm:p-8 bg-white shadow sm:rounded-lg">
                        <form onSubmit={submit} encType="multipart/form-data">
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
                                    disabled={predefinedCategoryId !== ''}
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
                                    onChange={(e) => setData('img', e.target.files[0])}
                                    className="mt-1 block w-full"
                                />
                            </div>

                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Create
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
