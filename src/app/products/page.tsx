



import ProductsClient from "../_components/productClient/ProductClient"
import { getAllProducts } from "../_services/products.service"


export default async function ProductsPage() {
  const products = await getAllProducts()

  if (!products) return <h2>Error</h2>

  return <>
  

  <ProductsClient products={products} />

  
  </>
  
  
}


