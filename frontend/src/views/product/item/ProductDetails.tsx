import { ProductDto } from "../products.types";

interface ProductDetailsProps {
    product: ProductDto
}

function ProductDetails({product}: ProductDetailsProps) {
    return (
        <div>
            <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
            <div>{product.description}</div>
            <div><span className="font-bold">Preço:</span> {parseFloat(product.price).toFixed(2)}</div>
            <div><span className="font-bold">Estoque:</span> {product.stock}</div>

        </div>
    )
}

export default ProductDetails