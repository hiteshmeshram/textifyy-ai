'use client'
import { signIn, useSession } from "next-auth/react"

export const Header = () => {
    const session = useSession();
    console.log(session)

    const handleClick = () => {
        console.log('inside handleclick');
        signIn();
    }
    return <div className="flex justify-end gap-3 ">
        <button  className="border border-neutral-400 shadow-xl px-5 py-1 rounded-md">Textify pro</button>
        <button onClick={handleClick} className="border bg-black text-white px-5 py-1 rounded-md">signin</button>
    </div>
}