'use client'

import { useState } from "react"

export const SideBar = () => {
const [open,setIsOpen]= useState<Boolean>(false);
    return <div className="w-72 border border-r h-screen">
        <div className="flex justify-between p-5">
            <p>uploads</p>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-panel-right-open-icon lucide-panel-right-open"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M15 3v18"/><path d="m10 15-3-3 3-3"/></svg>
        </div>
    </div>
}

