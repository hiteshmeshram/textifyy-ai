'use client'
import {useDropzone} from 'react-dropzone'

import { generatepreSignedURL } from "@/lib/generatepresignedurl";
import { useCallback } from 'react';
import { storeUrlToDb } from '@/lib/storeUrlToDb';
import { intiRagPipeline } from '@/lib/initRagPipeline';


export const UploadItem = () => {
    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0]

        //generate presigned url
        const presignedurl = await generatepreSignedURL(file);
        console.log(presignedurl, "url is ")

        // if (!presignedurl) return;
        //upload to r3
        try {  
            const res = await fetch(presignedurl,{
                method: "PUT",
                body: file,
                headers: {
                    'Content-Type': file.type
                }
            })

            
            console.log(res);
            if (res.ok) {
                await storeUrlToDb(res.url, file.name)
                await intiRagPipeline(res.url);
            }
        } catch(e) {
            console.log(e);
            console.error(e);
        }

        // const data = await res.json();
        // console.log(data);
        // //todo: store the url in db
        // const url = ""
        // await storeUrlToDb(url);

        // await ragpipeline();

        // // logic for RAG
        // if (res.ok) {
        //     alert("uploaded successfully")
        // } else {
        //     alert('failed uploading')
        // }
        // Do something with the files
      }, [])

      const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

    return <div className='flex-1 items-center justify-center flex'>
         <div className='text-neutral-400 mt-5 w-96  h-[100px] bg-white  p-4 border border-dashed rounded-md black  items-center flex justify-center'>
        <div {...getRootProps()}>
            <input {...getInputProps()} className='m-4  border  border-neutral-200 bg-red-200' />
            {
                isDragActive ?
                <p>Drop the files here ...</p> :
                <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    </div>
    </div> 
    
   
}
