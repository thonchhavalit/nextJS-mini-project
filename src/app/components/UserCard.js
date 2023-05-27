'use client'
import Link from 'next/link'
import React from 'react'
import Image from 'next/image';
import "@fortawesome/fontawesome-svg-core/styles.css";

export default function UserCard({ avatar, name, role, id }) {
    return (
        <div class="w-full max-w-md p-4 bg-gradient-to-r from-blue-800 to-indigo-900 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <div class="flex items-center justify-between mb-4">
          <h5 class="text-xl font-bold leading-none text-gray-900 dark:text-white">Latest Customers</h5>
          <a href="#" class="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">
            View all
          </a>
        </div>
        <div class="flow-root">
          <ul role="list" class="divide-y divide-gray-200 dark:divide-gray-700">
            <li class="py-3 sm:py-4">
              <div class="flex items-center space-x-4">
                <Link class="flex-shrink-0" href={`users/${id}`}>
                  <Image class="w-8 h-8 rounded-full" src={avatar} alt="Neil image" />
                </Link>
                <div class="flex-1 min-w-0">
                  <p class="text-sm font-medium text-gray-900 truncate dark:text-white">
                    {name}
                  </p>
                  <p class="text-sm text-gray-500 truncate dark:text-gray-400">
                    email@windster.com
                  </p>
                </div>
                <div class="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                  {role}
                </div>
              </div>
            </li>
  
          </ul>
        </div>
      </div>
  
    )
}
