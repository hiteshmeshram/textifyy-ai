'use client'
import { getFileName } from "@/lib/getFileName";
import Image from "next/image"
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

export const PdfEmbeed = () => {
    
    const params = useParams();
    const chatid = params.chatid as string;

    const [pdfurl, setpdfurl] = useState("")
    async function main() {
        const url = await getFileName(chatid)
        setpdfurl(url!)
    }
    useEffect(() => {
        main()
    }, [params])
    
    if (!pdfurl) return <div>loading..</div>

    return <div className="w-full h-screen flex mx-auto">
        <div className="w-full h-full p-10">
            <iframe className="w-full h-full" src={pdfurl}></iframe>
        </div>
        
    </div>
}
