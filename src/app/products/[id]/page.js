import React from "react";
import Image from "next/image";
async function getProductDetails(id) {
    const resp = await fetch(`https://api.escuelajs.co/api/v1/products/${id}`, {cache:"no-store"})
    return resp.json();
}

// call generateMetadata
export function generateMetadata({ params }) {
    const product = getProductDetails(params.id)
    return {
        title: product.title,
        description: product.description,
        thumbnail: product.images,
        metadataBase: new URL('https://istad.co'),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
                'de-DE': '/de-DE',
            },
        },
        openGraph: {
            images: product.images,
            title: product.title,
            description: product.description,
        },

    }
}
export default async function ProductDetails({ params }) {
    const products = await getProductDetails(params.id);
    return (
        <main className="flex  flex-wrap items-center justify-around p-24 rounded-lg bg-gray-700 h-screen">
            <div>
                <Image
                    class=" rounded-t-lg object-cover md:h-max md:w-61  rounded-l-lg"
                    src={products.images}
                    alt="" />
            </div>
            <div>
                <h5
                    class="mb-2 text-xl font-medium text-neutral-800 dark:text-neutral-50">
                    {products.title}
                </h5>
                <p class="mb-4 text-lg text-neutral-600 dark:text-neutral-200">
                    {products.description}
                </p>
                <p class="text-sm text-neutral-500 dark:text-neutral-300">
                    Last updated 3 mins ago
                </p>
            </div>

        </main>
    )
}