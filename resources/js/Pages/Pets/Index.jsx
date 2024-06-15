import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

export default function Index({ pets, auth }) {
    console.log(pets);
    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Pets
                </h2>
            }
        >
            <Head title="Pets" />

            <div>
                <ol>
                    {pets.map((pet) => (
                        <li key={pet.id}>
                            <p>Name: {pet.name}</p>
                            <p>Breed: {pet.breed}</p>
                            <p>Age: {pet.age}</p>
                            <p>Description: {pet.description}</p>
                            <p>Category: {pet.category.category_name}</p>
                        </li>
                    ))}
                </ol>
            </div>
        </AuthenticatedLayout>
    );
}
