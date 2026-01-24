import { CtaButton } from "@/components/CtaButton";
import { Header } from "@/components/Header";
import { Heading } from "@/components/Heading";
import { ImageComponent } from "@/components/ImageComponent";
import { SubHeading } from "@/components/SubHeading";
import { authOptions } from "@/lib/options";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions)

  if (session?.user) {
    redirect('/dashboard')
  }
  return (
    <div className="bg-gradient-to-r from-rose-100 p-5 to-teal-100 h-full">
      <Header/>
      <div className="flex flex-col max-w-4xl mx-auto">
        <Heading/>
        <SubHeading/>
        <div className="mx-auto m-5   text-white">
          <CtaButton/>
        </div>
        <div>

        </div>
        <ImageComponent/>
      </div>
    </div>
  );
}
