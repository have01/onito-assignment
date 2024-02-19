import React, { useEffect } from "react";
import { useForm, useFieldArray, SubmitHandler, useWatch, Control, Resolver } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { schema } from "./schema";

interface FormData {
    date: string;
    consultant: string;
    referred: string;
    services: {
        servicename: string;
        price: number;
        quantity: number;
        discount: number;
        rate: number;
        unit: number;
    }[]
}

const Form: React.FC = () => {
    const { control, handleSubmit, setValue, register, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema) as Resolver<FormData>,

    });
    const { fields, append, remove } = useFieldArray({ control, name: "services" });
    const watchFields = useWatch({ control, name: "services" });

    useEffect(() => {
        watchFields?.forEach((service, index) => {
            const rate = (service.price * service.quantity) * ((100 - service.discount) / 100);
            setValue(`services.${index}.rate` as const, rate);
            fields[index].rate = rate;
        });
    }, [watchFields]);



    const onSubmit: SubmitHandler<FormData> = (data) => {
        console.log(errors.services?.message)
        console.log("hello", watchFields)
        console.log(data);
        // reset();
    };

    const Total = ({ control }: { control: Control<FormData> }) => {
        const formValues = useWatch({
            name: "services",
            control
        });
        const total = formValues?.reduce((acc, current) => acc + (current.price || 0) * (current.quantity || 0), 0);
        return <h2 className="font-bold text-lg">Total Amount: {total}</h2>;
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="container mx-auto py-8">
                <div className="w-full flex justify-end">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Date:</label>
                        <TextField {...register("date")} type="date" error={!!errors.date}
                            helperText={errors.date?.message} />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Consultant:</label>
                        <TextField
                            {...register("consultant")}
                            error={!!errors.consultant}
                            helperText={errors.consultant?.message}
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Referred By:</label>
                        <TextField {...register("referred")}
                            error={!!errors.referred}
                            helperText={errors.referred?.message} />
                    </div>

                </div>
                <div className="mb-4">
                    <div className="flex w-full justify-between px-4 my-2">
                        <label className="block text-gray-700 text-sm font-bold mb-2">Services:</label>
                        <button type="button" onClick={() => append({ servicename: "", price: 0, quantity: 0, unit: 0, rate: 0, discount: 0 })} className="bg-green-400 px-2 py-1 text-white">Add Services</button>
                    </div>
                    <table className="w-full border-collapse border border-gray-300">
                        <thead>
                            <tr>
                                <th className="border border-gray-300 px-4 py-2">Service Name</th>
                                <th className="border border-gray-300 px-4 py-2">Price</th>
                                <th className="border border-gray-300 px-4 py-2">Quantity</th>
                                <th className="border border-gray-300 px-4 py-2">Discount</th>
                                <th className="border border-gray-300 px-4 py-2">Unit</th>
                                <th className="border border-gray-300 px-4 py-2">Rate</th>
                                <th className="border border-gray-300 px-4 py-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {fields.map((field, index) => (
                                <tr key={field.id}>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            {...register(`services.${index}.servicename` as const)}
                                            error={!!errors.services?.[index]?.servicename}
                                            helperText={errors.services?.[index]?.servicename?.message}
                                        />
                                        <h1>{!!errors.services?.[index]?.servicename}</h1>
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            {...register(`services.${index}.price` as const)}
                                            type="number"
                                            error={!!errors.services?.[index]?.price}
                                            helperText={errors.services?.[index]?.price?.message}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            {...register(`services.${index}.quantity` as const)}
                                            type="number"
                                            error={!!errors.services?.[index]?.quantity}
                                            helperText={errors.services?.[index]?.quantity?.message}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            {...register(`services.${index}.discount` as const)}
                                            type="number"
                                            error={!!errors.services?.[index]?.discount}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            {...register(`services.${index}.unit` as const)}
                                            type="number"
                                            error={!!errors.services?.[index]?.unit}
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <TextField
                                            type="number"
                                            value={field.rate || 0}
                                            disabled
                                        />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <button type="button" onClick={() => remove(index)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {fields.length === 0 && (
                                errors.services && <p className="text-red-500">{errors.services.message}</p>
                            )}
                        </tbody>
                    </table>
                </div>
                <div className="w-full flex justify-end pr-10">
                    <Total control={control} />
                </div>
                <div className="w-full flex justify-end my-10 px-10">
                    <Button type="submit" variant="contained" color="success" className="bg-blue-500  hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                        Submit
                    </Button>
                </div>
            </div>
        </form>
    );
};

export default Form;
