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
        <button onClick={handleClick} className="bg-black text-white px-5 py-2 rounded-3xl shadow-sm">signin</button>
    </div>
}