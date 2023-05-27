import React from 'react'
import Image from 'next/image'
export async function getCategories(id) {
    const resp = await fetch(`https://api.escuelajs.co/api/v1/categories/${id}`)
    return resp.json()
}

export function generateMetadata({ params }) {
    const data = getCategories(params.id)
    return {
        title: data.title,
        description: data.description,
        thumbnail: data.avatar,
        metadataBase: new URL('https://istad.co'),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
                'de-DE': '/de-DE',
            },
        },
        openGraph: {
            images: data.avatar,
            title: data.title,
            description: data.description,
        },
    }
}

export default async function CategoriesDetail({ params }) {
    const category = await getCategories(params.id)
    return (
        <div className="flex min-h-screen flex-col items-center justify-center   ">
            <div className="w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <a href="#">
                    <img className="p-8 rounded-t-lg" src={category.image} alt="product image" />
                </a>
                <div className="px-5 pb-5">
                    <a href="#">
                        <h1 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">{category.name}</h1>
                    </a>
                    <br />
                    <div className="font-semibold tracking-tight text-gray-500 "></div>

                </div>
            </div>

        </div>
    )
}
