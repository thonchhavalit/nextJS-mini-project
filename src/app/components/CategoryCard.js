"use client";
import Link from "next/link";
import React from "react";
import Image from "next/image";
export default function CategoryCard({ title, image, id }) {
  return (

    <div className="w-full max-w-sm rounded-lg ">
      <ul>
        <li>
          <Link href={`categories/${id}`} className="flex items-center p-3 text-base font-bold text-gray-900 rounded-lg bg-gray-50 hover:bg-gray-100 group hover:shadow bg-gradient-to-r from-blue-800 to-indigo-900 dark:text-white">
            <div classNamee="">
              <Image src={image} />
            </div>
            <span className="flex-1 ml-3 whitespace-nowrap">{title}</span>
            <span className="inline-flex items-center justify-center px-2 py-0.5 ml-3 text-xs font-medium text-gray-500 bg-gray-200 rounded dark:bg-gray-700 dark:text-gray-400">Popular</span>
          </Link>
        </li>

      </ul>

    </div>

  );
}
