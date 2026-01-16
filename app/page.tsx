import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { ImageComponent } from "@/components/ImageComponent";
import { SubHeading } from "@/components/SubHeading";
import Image from "next/image";

export default function Home() {
  return (
    <div className="bg-gradient-to-r from-rose-100 p-5 to-teal-100 h-full">
      <Header/>
      <div className="flex flex-col max-w-4xl mx-auto">
        <Heading/>
        <SubHeading/>
        <div className="mx-auto m-5  bg-black text-white">
          <button className="py-2 rounded-xl px-5 flex shadow-xl gap-2">Get started <span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-from-line-icon lucide-arrow-right-from-line"><path d="M3 5v14"/><path d="M21 12H7"/><path d="m15 18 6-6-6-6"/></svg></span></button>
        </div>
        <ImageComponent/>
      </div>
    </div>
  );
}
