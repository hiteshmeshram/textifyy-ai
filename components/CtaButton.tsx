'use client'

import { signIn } from "next-auth/react"

export const CtaButton = () => {
    return <button onClick={()=> signIn()} className="py-2 bg-black rounded-3xl px-5 flex shadow-2xl gap-2 hover:bg-neutral-700 hover:text-neutral-300">Get started<span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-from-line-icon lucide-arrow-right-from-line"><path d="M3 5v14"/><path d="M21 12H7"/><path d="m15 18 6-6-6-6"/></svg></span></button>
}