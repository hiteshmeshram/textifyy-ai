'use client'
import {useDropzone} from 'react-dropzone'
import { generatepreSignedURL } from "@/lib/generatepresignedurl";
import { useCallback, useState } from 'react';
import { storeUrlToDb } from '@/lib/storeUrlToDb';
import { intiRagPipeline } from '@/lib/initRagPipeline';
import { useRouter } from 'next/navigation';


export const UploadItem = () => {
    const router = useRouter()
    const [loading, setLoading] = useState<Boolean>(false)
    
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0]

        const presignedurl = await generatepreSignedURL(file);
        if (!presignedurl) return;
        
        try {  
            setLoading(true);
            const res = await fetch(presignedurl,{
                method: "PUT",
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            })

            if (res.ok) {
                const documentId = await storeUrlToDb(file.name)
                await intiRagPipeline(file.name);
                setLoading(false)
                router.push(`/chat/${documentId}`)
            }
        } catch(e) {
            
            console.log(e);
            console.error(e);
        } finally{
            setLoading(false);
        }

      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return <div className='flex-1 items-center justify-center flex w-full  mb-10 '>
         <div className='text-neutral-400 mt-5 w-96  h-[100px] bg-white  p-4 border border-dashed rounded-md black  items-center flex justify-center'>
        {!loading && <div {...getRootProps()}>
            <input {...getInputProps()} className='m-4  border  border-neutral-200 bg-red-200' />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>}
        {loading && <div>
            Uploading...    
        </div>}
    </div>
    </div> 
    
   
}
