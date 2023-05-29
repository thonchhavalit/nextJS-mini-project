import CategoryCard from "../components/CategoryCard"
//request categories
export async function getCategories() {
    const resp = await fetch(" https://api.escuelajs.co/api/v1/categories")
    return resp.json()
}
export const metadata = {
    title: "categories",
    description: "find your categories",
}
export default async function Categories() {
    const categories = await getCategories()
    return (
            <main className="flex min-h-screen flex-wrap items-center justify-between p-24">
                {categories.map(category => (
                    <CategoryCard
                        key={category.id}
                        image={category.image}
                        title={category.name}
                        id={category.id}
                    />

                ))}
            </main>

    )
}