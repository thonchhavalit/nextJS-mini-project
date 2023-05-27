import React from 'react'
import Image from 'next/image'
import {skeleton} from "../app/images/skeleton.gif"
export default function Loading() {
  return (
    <main className='md:h-[80vh] max-sm:h-[20vh] max-sm:pb-[100px] md:pb-[50px] flex justify-center items-center align-middle'>
        <Image src={skeleton}/>
    </main>
  )
}
