import ProductList from "@/views/product/list/ProductList";
import { ProductDto } from "@/views/product/products.types";

async function Home() {


  const res = await fetch(`${process.env.NEXT_PUBLIC_API}/v1/product`)
  const products: ProductDto[] =  await res.json();

  return (

    <ProductList products={products}/>
  );
}

export default Home