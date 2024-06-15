import { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import SelectInput from "@/Components/SelectInput";
import TextAreaInput from "@/Components/TextAreaInput";
import TextInput from "@/Components/TextInput";
import { Head, useForm } from "@inertiajs/react";

export default function CreatePet({ auth, categories, pet = null }) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: pet ? pet.name : "",
        breed: pet ? pet.breed : "",
        age: pet ? pet.age : "",
        category_id: pet ? pet.category_id : "",
        description: pet ? pet.description : "",
        image: null,
    });

    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        console.log(categories);
        console.log(pet);
        return () => {
            reset();
        };
    }, []);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setData("image", file);

        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        } else {
            setImagePreview(null);
        }
    };

    const submit = (e) => {
        e.preventDefault();

        const formData = new FormData();
        for (let key in data) {
            formData.append(key, data[key]);
        }

        if (pet) {
            put(route("pets.update", pet.id), formData, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                },
            });
        } else {
            post(route("pets.store"), formData, {
                forceFormData: true,
                onSuccess: () => {
                    reset();
                },
            });
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Create Pet" />
            <div className="w-full mt-10 flex justify-center">
                <form
                    onSubmit={submit}
                    className="flex flex-col w-full max-w-xl"
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            name="name"
                            value={data.name}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setData("name", e.target.value)}
                            required
                        />

                        <InputError message={errors.name} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="breed" value="Breed" />

                        <TextInput
                            id="breed"
                            name="breed"
                            value={data.breed}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setData("breed", e.target.value)}
                            required
                        />

                        <InputError message={errors.breed} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="age" value="Age" />

                        <TextInput
                            id="age"
                            name="age"
                            value={data.age}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) => setData("age", e.target.value)}
                            required
                        />

                        <InputError message={errors.age} className="mt-2" />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="category_id" value="Category" />

                        <SelectInput
                            id="category_id"
                            name="category_id"
                            value={data.category_id}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            required
                        >
                            <option value="">Select Category</option>
                            {categories?.map((category, index) => (
                                <option key={index} value={category.id}>
                                    {category.category_name}
                                </option>
                            ))}
                        </SelectInput>

                        <InputError
                            message={errors.category_id}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="description" value="Description" />

                        <TextAreaInput
                            id="description"
                            name="description"
                            value={data.description}
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            required
                        />

                        <InputError
                            message={errors.description}
                            className="mt-2"
                        />
                    </div>

                    <div className="mt-4">
                        <InputLabel htmlFor="image" value="Image" />

                        <TextInput
                            id="image"
                            name="image"
                            type="file"
                            className="mt-1 block w-full"
                            autoComplete="off"
                            onChange={handleImageChange}
                        />

                        {imagePreview && (
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="mt-4 h-40 w-auto"
                            />
                        )}

                        <InputError message={errors.image} className="mt-2" />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            {pet ? "Update Pet" : "Create Pet"}
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
