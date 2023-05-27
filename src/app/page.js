import { Suspense } from "react";
import Categories from "./categories/page";
import Products from "./products/page";
import Users from "./users/page";
import Loading from "./loading";
import Image from "next/image";
export const metadata ={
  title: "VALIT SHOP",
  description: "make confidence with us",
  OpendGraph:{
    title: "VALIT SHOP",
    description: "make confidence with us",
    thumbnail:"http://localhost:3000/_next/image?url=%2F_next%2Fstatic%2Fmedia%2Flogo_2.de067665.png&w=384&q=75"
  }

}
export default async function Home() {
  return (
    <Suspense fallback={<Loading />}>
      <main className="flex min-h-screen flex-wrap items-center justify-between p-2 bg-gradient-to-r from-cyan-500 to-blue-500">
        <section class="bg-white w-full bg-gradient-to-r from-cyan-500 to-blue-500">
          <div class="relative">
            <div class="min-h-screen flex">
              <div class="container m-auto px-6 py-40 md:px-12 lg:py-0 lg:px-7">
                <div class="flex items-center flex-wrap gap-12 lg:gap-0">
                  <div class="lg:w-5/12 space-y-8">
                    <span class="flex space-x-2">
                    </span>
                    <h1 class="text-4xl font-bold md:text-6xl dark:text-white">The New <br/> Way To Discover</h1>
                    <p class="text-xl text-gray-700 dark:text-gray-300">Booking Company-Wide Savings, Invoicing and reporting docs.</p>

                    <div class="flex space-x-4">
                      <button type="button" title="Start buying" class="w-full py-3 px-6 text-center transition bg-gray-900 dark:bg-gray-700 hover:bg-gray-800 active:bg-gray-700 focus:bg-gray-800 sm:w-max">
                        <span class="block text-white font-semibold">
                          Shop now
                        </span>
                      </button>
                      <button type="button" title="Start buying" class="group w-full py-3 px-6 text-center transition dark:active:bg-yellow-800 dark:focus:bg-yellow-900 active:bg-yellow-200 focus:bg-yellow-100 sm:w-max">
                        <span class="block text-gray-700 dark:text-white font-semibold group-focus:text-yellow-700 dark:group-focus:text-yellow-100">
                          Our showreel
                        </span>
                      </button>
                    </div>
                  </div>

                  <div class="hidden relative md:block lg:w-7/12">
                    <div aria-hidden="true" class="absolute inset-0 m-auto w-[30rem] h-[30rem] rounded-full bg-yellow-200">

                    </div>
                    <Image src="https://i.pinimg.com/originals/62/a6/a9/62a6a9e51dd163a4298beed5e88ee841.png" class="relative ml-auto" alt=""/>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>


        <section >
          <br></br>
          <h1 className="text-5xl text-lime-300 text-center p-0 font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">PRODUCTS</h1>
          {/* <section > */}
          <Products />
          {/* </section> */}
        </section>

        <section >
          <h1 className="text-5xl text-lime-300 text-center p-0 font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">CATEGORIES</h1>
          {/* <section > */}
          <Categories />
          {/* </section> */}
        </section>

        <section>
          <h1 className="text-5xl text-lime-300 text-center p-0 font-bold bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">USERS</h1>
          {/* <section > */}
          <Users />
          {/* </section> */}
        </section>

      </main>
    </Suspense>

  )
}


