'use client'
import { ragRetrival } from "@/lib/ragRetrival";
import { sendToLLM } from "@/lib/sendToLLM";
import React, { useEffect, useState } from "react"

interface Message {
    role: string;
    content: string
}

const dummyMessages = [
    {
        "role": "user",
        "content": "what is your name"
    },
    {
        "role": "system",
        "content": "my name is alexa , how may i help you"
    },
    {
        "role": "user",
        "content": "just help me with this thing "
    },{
        "role": "system",
        "content": "could you please be presise in what you want.is ther something that i can help you with please be specific so that i can assist you properly. also do you want help in something extra please let me know "
    }
]
export const ChatComponent = () => {
    const [ messages,setMessages ] = useState<Message[]>(dummyMessages);
    const [ userMessage,setUserMessage ] = useState("");

    async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
        setUserMessage(e.target.value);
        console.log(e.target.value)
        console.log('inside chat component handlechnage');

    }

    async function handleSubmit() {
        console.log('inside handlesubmit')
        try{
            // // const context = await ragRetrival(userMessage);
            // // const response = await sendToLLM(context, userMessage)
            // console.log(context, "inside context")
            // console.log("response", response)
            setMessages((prev)=> [...prev, {"role": "user", "content": userMessage}])
        } catch(e) {
            console.error(e);
        }
        // setMessages((prev) => [...prev,{"role": "user", "content": e.target.value}, {"role": "assistant", content: response}])
        // console.log(response);
        
    }

    async function main() {
        await getAllUserMessages();
    }
    useEffect(() => {
        main()
    }, [userMessage])
    return <div className="w-full">
            <div className="flex min-h-screen mx-auto w-3/4 border border-neutral-200 relative">
                <div className=" mt-10 flex flex-col gap-5 p-20">
                    {messages?.map((m) => <div>
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
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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
                                    stroke-width="1"
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
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
                <div className="absolute left-0 bottom-20 w-full flex gap-2 px-5">
                    <span>
                        <div className="rounded-full w-10 h-10 bg-white border border-neutral-100"></div>
                    </span>
                    <input onChange={handleChange} className="border border-neutral-300 flex-1 rounded-2xl px-4 py-2" type='text' placeholder="Ask any Question about your document"></input>
                    <button onClick={handleSubmit} className="border border-neutral-200 rounded-2xl px-2 py-2">submit</button>
                </div>
            </div>
        </div>
    

}