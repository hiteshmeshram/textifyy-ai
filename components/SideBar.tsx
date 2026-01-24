'use client'

import { getAllDocuments } from "@/lib/getAllDocuments"
import { signOut } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export interface Document {
    id: Number,
    name: string,
    url: string,
    userId: Number
}

export const SideBar = () => {
const [isOpen,setIsOpen]= useState<Boolean>(true);
const[userDocuments, setUserDocuments] = useState<Document[] | null>(null)
const router = useRouter();

async function main() {
    const documents: Document[] = await getAllDocuments();
    setUserDocuments(documents);
}
useEffect(() => {
    main()    
}, [])


const handleSignout = () => {
    signOut({redirect: false});
    router.push("/");
}
    return <div className={`${isOpen ? "w-96" : "w-30" }  flex flex-col border border-r border-neutral-200 h-screen relative`}>
        <div className="flex justify-between gap-4 p-5 px-8">
            <button onClick={()=> router.push('/dashboard')} className="border border-neutral-200 px-2 py-1 rounded-xl shadow-lg">upload</button>
            <button onClick={()=>setIsOpen((prev) => !prev)} className="cursor-pointer">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-panel-right-open-icon lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>
                </span>
            </button>
        </div>
        <div className=" m-4">
            <ul>
                {!userDocuments && <li>No Recent uploads</li>}
                {userDocuments?.map((u, index) => <li key={index} onClick={() => router.push(`/chat/${u.id}`)} className="flex w-full cursor-pointer gap-3 bg-blue-100 px-4 py-2 m-2 mb-4 rounded-xl">
                    <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-archive-icon lucide-archive"><rect width="20" height="5" x="2" y="3" rx="1"/><path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8"/><path d="M10 12h4"/></svg></span>
                    {isOpen && <p className="flex flex-1">{u.name}</p>}
                </li>)}
            </ul>
        </div>
        <div className=" w-full  absolute p-5 left-0 bottom-15">
            <div className="flex flex-col gap-5">
                <button className="bg-black text-white w-full  py-2 rounded-xl">upgrade</button>
                <button onClick={handleSignout} className="bg-black text-white w-full  py-2 rounded-xl">signout</button>
            </div>
        </div>
    </div>
}

