import { ChatComponent } from "@/components/ChatComponent";
import { PdfEmbeed } from "@/components/PdfEmbeed";
import { SideBar } from "@/components/SideBar";

export default function chat() {
    return <div>
        <SideBar/>
        <PdfEmbeed/>
        <ChatComponent/>
    </div>
}