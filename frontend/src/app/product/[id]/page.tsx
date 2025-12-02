import ProductDetails from "@/views/product/item/ProductDetails";

interface ProductPageProps {
    params: Promise<{
        id: string
    }>
}

async function ProductPage({params}: ProductPageProps) {
    const {id} = await params;
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/product/${id}`)
    const product = await res.json();
    return(
        <ProductDetails product={product}/>
    )
}

export default ProductPage