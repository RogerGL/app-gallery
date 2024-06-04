import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner'

export default function Create({ auth, category }) {

    const { data, setData, post, processing, errors } = useForm({
        name: '',
        desc: '',
    })

    const submit = (e) => {
      e.preventDefault();

      post(route('categories.store'), {
          onSuccess: () => {
              toast.success('Category created successfully');
          },
      });
  };

    return (
        <AuthenticatedLayout
            user={auth.user}
        >
          <Toaster richColors position="top-right" />
            <header className="bg-white shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-bold">
                    <h2 className="font-semibold text-xl text-gray-800 leading-tight">Users Edit</h2>
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
                                <InputLabel htmlFor="desc" value="Desc" />

                                <TextInput
                                    id="desc"
                                    value={data.desc}
                                    onChange={(e) => setData('desc', e.target.value)}
                                    type="text"
                                    className="mt-1 block w-full"
                                    autoComplete="desc"
                                />
                            </div>
                            <div className="flex items-center justify-end mt-4">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Criar
                                </PrimaryButton>
                            </div>
                        </form>

                    </div>
                </div>
            </div>
            
        </AuthenticatedLayout>
    );
}