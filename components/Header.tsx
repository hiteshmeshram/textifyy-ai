'use client'
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation";

export const Header = () => {
    const session = useSession();
    const router = useRouter();

    const handleClick = () => {
        console.log('inside handleclick');
        signIn();
        // router.push('/dashboard');
    }
    return <div className="flex justify-end gap-3 ">
        {JSON.stringify(session)}
        <button  className="border border-neutral-400 shadow-xl px-5 py-1 rounded-md">Textify pro</button>
        <button onClick={handleClick} className="border bg-black text-white px-5 py-1 rounded-md">signin</button>
    </div>
}