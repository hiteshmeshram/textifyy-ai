import { ChatComponent } from "@/components/ChatComponent";
import { PdfEmbeed } from "@/components/PdfEmbeed";
import { SideBar } from "@/components/SideBar";

export default function chat() {
    return <div className="w-full flex flex-col md:flex-row">
        <SideBar/>
        <div className="w-full flex flex-col">
            <div className="md:flex border-b hidden  border-neutral-200 py-4 px-20">
                <span></span>
                <p className="font-semibold">AskYourPDF</p>
            </div>
            <div className="w-full md:flex-row flex flex-col">
                <PdfEmbeed/>
                <ChatComponent/>
            </div>
        </div>
    </div>
}