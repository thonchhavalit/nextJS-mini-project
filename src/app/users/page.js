
import React from "react";
import UserCard from "../components/UserCard";

//request users
export async function getUsers() {
    const resp = await fetch("https://api.escuelajs.co/api/v1/users?limit=8")
    return resp.json()
}
export const metadata = {
    title: "USERS",
    description: "here are users who trust our shop",
}
//response users
export default async function Users() {
    const users = await getUsers();
    return (
        <main className="flex min-h-screen flex-wrap items-center justify-between p-24">
            {users.map((user) => (
                <UserCard
                    key={user.id}
                    id={user.id}
                    avatar={user.avatar}
                    name={user.name}
                    role={user.role}
                />
            )) }
           
        </main>
    )
}