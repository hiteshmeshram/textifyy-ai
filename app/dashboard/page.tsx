import { SideBar } from "@/components/SideBar";
import { UploadItem } from "@/components/UploadItem";

export default function Page() {
    return <div className="flex">
        <SideBar/>
        <UploadItem/>
    </div>
}