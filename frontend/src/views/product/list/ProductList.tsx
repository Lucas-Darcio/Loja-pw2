"use client"

import ProductCard from "./ProductCard"

function ProductList() {
    return (
        <div className="grid grid-cols-4 gap-4">
            <ProductCard name="Computador Dell"/>
            <ProductCard name="teclado mecanico"/>
            <ProductCard name="impressora hepsias"/>
        </div>
    );
}

export default ProductList