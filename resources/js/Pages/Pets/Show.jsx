import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ pet, auth }) {
    console.log(pet);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    {pet.name}
                </h2>
            }
        >
            <Head title={pet.name} />

            <div>
                <ol>
                    <li>{pet.name}</li>
                    <li>{pet.age}</li>
                    <li>{pet.breed}</li>
                    <li>{pet.description}</li>
                    <li>{pet.category.category_name}</li>
                </ol>
            </div>
        </AuthenticatedLayout>
    );
}
