import { ChatComponent } from "@/components/ChatComponent";
import { PdfEmbeed } from "@/components/PdfEmbeed";
import { SideBar } from "@/components/SideBar";

export default function chat() {
    return <div className="w-full flex">
        <SideBar/>
        <div className="w-full flex flex-col">
            <div className="flex border-b border-neutral-200 py-4 px-20">
                <span></span>
                <p className="font-semibold">AskYourPDF</p>
            </div>
            <div className="w-full flex">
                <PdfEmbeed/>
                <ChatComponent/>
            </div>
        </div>
    </div>
}