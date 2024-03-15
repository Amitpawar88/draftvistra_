import { LoginLink } from '@kinde-oss/kinde-auth-nextjs'
import React from 'react'

function Hero() {
  return (
    <section className="bg-black">
        <div className='flex items-baseline 
        justify-center pt-20'>
        <h2 className='text-white border 
            px-3 p-2 rounded-full
        text-center border-white'>See What's New | <span className='text-teal-600'>AI Diagram</span></h2>

        </div>
  <div className="mx-auto h-screen max-w-screen-xl px-4 py-12 lg:flex  ">
    <div className="mx-auto max-w-xl text-center">
      <h1 className="text-3xl text-teal-600 font-extrabold sm:text-5xl">
      Doc & Diagram Studio
        <strong className="font-extrabold text-white sm:block"> 
        for engineering teams. </strong>
      </h1>

      <p className="mt-4 sm:text-xl/relaxed text-slate-200">
      Supercharge Docs & Diagrams: Markdown, Canvas & Code. The Developer's Toolkit.
      </p>

      <div className="mt-8 flex flex-wrap justify-center gap-4">
      <a
                className="hidden sm:block rounded-md bg-gray-100 px-5 py-2.5 text-sm font-medium text-black transition duration-200 ease-in-out hover:text-gray-800 hover:bg-gray-200"
                href="#"
              >
                <LoginLink postLoginRedirectURL="/dashboard" >Get Started</LoginLink>
              </a>
      </div>
    </div>
  </div>
</section>
  )
}

export default Hero