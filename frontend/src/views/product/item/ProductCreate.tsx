"use client"

import TextInput from "@/components/form/TextInput/TextInput"
import NumberInput from "@/components/form/NumberInput/NumberInput";
import { FormEvent, useState } from "react"
import TextArea from "@/components/form/TextArea/TextArea";
import { Button } from "flowbite-react";
import { CreateProductDto } from "../products.types";
import { useRouter } from "next/navigation";
import productSchema from "../product.schema";
function ProductCreate() {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("0.00");
    const [stock, setStock] = useState(0);
    const [description, setDescription] = useState("");
    const [errors, setErrors] = useState<Record<string,string>>({})
    const router = useRouter()

    const handleSubmit =  (e: FormEvent) => {
        e.preventDefault()
        const product: CreateProductDto = {
            name,
            price,
            stock,
            description
        }

        const {error} = productSchema.validate(product, { abortEarly: false})

        if (error) {
            const errorsDetails: Record<string, string>= {}
            // console.log(error.details)
            for (const errorDetail of error.details) {
                errorsDetails[errorDetail.path[0]] = errorDetail.message
            }
            setErrors(errorsDetails)
        }
// 
//         fetch(`${process.env.NEXT_PUBLIC_API}/v1/product`, {
//             method: "POST",
//             headers: { "Content-Type": "application/json"},
//             body: JSON.stringify(product)
//         })
//         .then((res => res.json()))
//         .then(() => {
//             router.push("/")
// 
//         })
    }

    return (
        <>
            <h1 className="text-2xl font-bold mb-2">Criação de Produto</h1>
            <form method="post" onSubmit={handleSubmit}className="flex max-w-md flex-col gap-4">
                <TextInput value={name} onChange={setName} error={errors['name']} name="name" label="Nome" focus required />
                <TextInput value={price} onChange={setPrice} name="price" label="Preço" required />
                <NumberInput value={stock} onChange={setStock} name="stock" label="Estoque" required />
                <TextArea value={description} onChange={setDescription} name="description" label="Descrição" required />
                <Button type="submit">Enviar</Button>
            </form>
        </>
    )
}

export default ProductCreate