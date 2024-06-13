import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import { Toaster, toast } from 'sonner'

export default function Dashboard({ auth }: PageProps) {
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={<h2 className="font-semibold text-xl text-gray-800 leading-tight">Sistema Eventos ACSP</h2>}
        >
            <Head title="Sistema Eventos ACSP" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">Sistema de eventos onde é disponibilizado tanto a galeria e criação, consulte a informação sobre proxímo evento enviado pelo RH.</div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
