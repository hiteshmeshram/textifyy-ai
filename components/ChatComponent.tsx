'use client'
import { getFileNamee } from "@/lib/getFileNamee";
import { ragRetrival } from "@/lib/ragRetrival";
import { sendToLLM } from "@/lib/sendToLLM";
import { useSession } from "next-auth/react";
import { useParams } from "next/navigation";
import React, { useEffect, useRef, useState } from "react"

interface Message {
    role: string;
    content: string
}

export const ChatComponent = () => {
    const [ messages,setMessages ] = useState<Message[]>([]);
    const [ userMessage,setUserMessage ] = useState("");
    const [fileName, setFileName] = useState("");
    const params = useParams()

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserMessage(e.target.value);
    }

    async function handleSubmit() {
        try{
            const res = await ragRetrival(userMessage, fileName);
            const context = JSON.parse(res!);
            const response = await sendToLLM(context, userMessage)
            const llmResponse = JSON.parse(response)
            setMessages((prev)=> [...prev, {"role": "user", "content": userMessage}, {"role": "system", "content": llmResponse.content}])
            setUserMessage("")
        } catch(e) {
            console.error(e);
        } finally {
            setUserMessage("");
        }
        
    }

    async function main() {
        const name = await getFileNamee(params.chatid as string)
        if (!name) return;
        setFileName(name)
    }

    useEffect(() => {
        main()
    }, [userMessage])
    return <div className="w-full border border-neutral-200">
            <div className="flex flex-col  h-3/4 w-full mx-auto   relative">
                <div className=" mt-10 flex-1 w-full min-h-[80%] overflow-y-scroll  flex flex-col gap-5 p-20 ">
                    {messages?.map((m, index) => <div key={index} className="w-full ">
                        {m.role === 'user' && <div className="flex justify-end gap-4 ">
                            <div className="w-fit text-white  bg-blue-500 px-5 py-2 rounded-l-3xl rounded-tr-3xl">
                                <p>{m.content}</p>
                            </div>
                            <div className="rounded-full w-10 h-10 bg-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                                </svg>
                            </div>
                            
                        </div>}

                        {m.role === 'system' && <div className="flex justify-start gap-4">
                                <div className="rounded-full w-10 h-10 bg-white ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="32"
                                    height="32"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="#000000"
                                    strokeWidth="1"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    >
                                    <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                                    <path d="M12 10m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                                    <path d="M6.168 18.849a4 4 0 0 1 3.832 -2.849h4a4 4 0 0 1 3.834 2.855" />
                                </svg>
                                </div>
                                <div className="w-fit bg-gray-100 px-5 py-2 text-neutral-500 rounded-r-3xl rounded-tl-3xl">
                                    <p>{m.content}</p>
                                </div>
                         </div>}
                    </div>)}
                </div>
                <div className="sticky left-0 bottom-10  w-3/4 mx-auto flex gap-2 px-5">
                    <span>
                        <div className="rounded-full w-10 h-10 bg-white border border-neutral-100"></div>
                    </span>
                    <input onChange={handleChange} className="border border-neutral-300 flex-1 rounded-2xl px-4 py-2" type='text' placeholder="Ask any Question about your document"></input>
                    <button onClick={handleSubmit} className="border border-neutral-200 rounded-2xl px-2 py-2">submit</button>
                </div>
            </div>
        </div>
    

}