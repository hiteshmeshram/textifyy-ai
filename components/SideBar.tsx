'use client'

import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useState } from "react"

interface Uploads {
    name: string
}
const uploads = [
    {
        name: "hitesh.pdf"
    },
    {
        name: "riku.pdf"
    }
]
export const SideBar = () => {
const [open,setIsOpen]= useState<Boolean>(false);
const [userUploads, setUserUploads ] = useState<Uploads[] | null>(uploads)
const router = useRouter();

const handleSignout = () => {
    
    signOut({redirect: false});
    router.push("/");
}
    return <div className="w-72 border border-r h-screen relative">
        <div className="flex justify-between p-5 px-8">
            <p>uploads</p>
            <button className="cursor-pointer">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right-open-icon lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>
                </span>
            </button>
        </div>
        <div className=" m-4">
            <ul>
                {userUploads?.map((u, index) => <li key={index} className="flex cursor-pointer gap-3 bg-blue-100 px-4 py-2 m-2 mb-4 rounded-xl">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg>
                    <p>{u.name}</p>
                </li>)}
            </ul>
        </div>
        <div className="w-full mx-auto  flex justify-center  absolute left-0 bottom-6">
            <button onClick={handleSignout} className="bg-black text-white w-full m-5 py-2 rounded-xl">signout</button>
        </div>
    </div>
}

