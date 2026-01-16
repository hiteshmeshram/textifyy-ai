import Image from "next/image"

export const ImageComponent = () => {
    return <div className=" m-10 items-center">
        
        <Image 
            className="rounded-lg"
            src={"https://updf.com/wp-content/uploads/2022/11/updf-securtiy-feature.webp"}
            alt="image" 
            width={"900"}
            height={"500"}/>
    </div>
}