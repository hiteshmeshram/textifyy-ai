
import { SideBar } from "@/components/SideBar";
import { UploadItem } from "@/components/UploadItem";

export default function Page() {
    return <div className="md:flex-row flex flex-col">
        <SideBar/>
        <UploadItem/>
    </div>
}