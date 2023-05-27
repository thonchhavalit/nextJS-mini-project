import React from 'react'
import ProductCard from '../components/ProductCard';


//request products
export async function getProducts() {
  const resp = await fetch("https://api.escuelajs.co/api/v1/products?limit=20&offset=0")
  return resp.json()
}
export const metadata = {
  title: "PRODUCTS",
  description: "we have more than one thousands of products",
}



//response products
export default async function Products() {
  const products = await getProducts();
  return (
    <main className="flex min-h-screen flex-wrap items-center justify-between p-24">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          id={product.id}
          title={product.title}
          price={product.price}
          image={product.images[0]}
          category={product.category.name}
        />

      ))}
    </main>

  )
}