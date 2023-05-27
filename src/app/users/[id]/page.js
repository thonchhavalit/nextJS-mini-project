import React from "react";


async function getUsersDetails(id) {
    const resp = await fetch(`https://api.escuelajs.co/api/v1/users/${id}`)
    return resp.json();
}
export function generateMetadata({ params }) {
    const metadata = getUsersDetails(params.id);
    return {
        title: metadata.title,
        description: metadata.description,
        thumbnail: metadata.avatar,
        metadataBase: new URL('https://istad.co'),
        alternates: {
            canonical: '/',
            languages: {
                'en-US': '/en-US',
                'de-DE': '/de-DE',
            },
        },
        openGraph: {
            avatar: metadata.avatar,
            title: metadata.title,
            description: metadata.description,
        },
    }
}

export default async function UsersDetails({ params }) {
    const users = await getUsersDetails(params.id);
    return (
        <main className="flex  flex-wrap items-center justify-around p-24 rounded-lg bg-gray-700 h-screen">

            <div>
                <img
                    class=" rounded-t-lg object-cover md:h-max md:w-61 md:rounded-none md:rounded-l-lg"
                    src={users.avatar}
                    alt="" />
            </div>

            <div>
                <h5
                    class="mb-2 text-8xl font-medium text-neutral-800 dark:text-neutral-50">
                    {users.name}
                </h5>
                <p class="mb-4 text-5xl text-neutral-600 dark:text-neutral-200">
                    {users.role}
                </p>
                <p class="text-xl text-neutral-500 dark:text-neutral-300">
                    Last updated 3 mins ago
                </p>
            </div>

        </main>
    )
}