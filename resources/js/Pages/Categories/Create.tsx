import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { useState } from 'react'; // Importe o useState para controlar o estado do Switch
import { Link, useForm, usePage } from '@inertiajs/react';
import { Toaster, toast } from 'sonner';
import * as Switch from "@radix-ui/react-switch";


export default function Create({ auth, category }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        desc: '',
        status: false, // inicializa o status como falso (desativado)
        eventDate: '', // define a data do evento atual
    });

    const [status, setStatus] = useState(data.status); // Use o estado local para controlar o Switch

    const submit = (e) => {
        e.preventDefault();
        setData('status', data.status);
        post(route('categories.store'), {
            onSuccess: () => {
                toast.success('Category created successfully');
            },
        });
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Toaster richColors position="top-right" />
            <header className="bg-slate-900 shadow">
                <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 font-bold">
                    <h2 className="font-semibold text-xl text-white leading-tight">Criação de Categoria</h2>
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
                                
                                <textarea id="desc"
                                    value={data.desc}
                                    onChange={(e) => setData('desc', e.target.value)}
                                    className="resize-none rounded-md block w-full"
                                    autoComplete="desc"
                                ></textarea>
                            </div>
                            
                            <div className="mt-4">
                                <InputLabel htmlFor="eventDate" value="Event Date" />
                                <input
                                    id="eventDate"
                                    value={data.eventDate}
                                    onChange={(e) => setData('eventDate', e.target.value)}
                                    type="date"
                                    className="mt-1 block w-full"
                                />
                                 {errors.eventDate && <div className="mt-2 text-red-500">{errors.eventDate}</div>}
                            </div>
  
                            <div className="mt-4">
                              <InputLabel htmlFor="status" value="Status" />
                                <Switch.Root
                                    checked={status}
                                    onCheckedChange={(isChecked) => {
                                      setStatus(isChecked);
                                  }}
                                    className="data-[state=checked]:bg-slate-900 w-11 rounded-full bg-gray-500 p-px shadow-inner shadow-black/50 transition active:bg-gray-700"
                                    
                                >
                                    <Switch.Thumb className="data-[state=checked]:translate-x-[18px] data-[state=checked]:bg-white block h-6 w-6 rounded-full bg-gray-200 shadow-sm transition" />
                                </Switch.Root>
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
