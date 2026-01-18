'use client'
import {useDropzone} from 'react-dropzone'

import { generatepreSignedURL } from "@/lib/generatepresignedurl";
import { useCallback } from 'react';
import { storeUrlToDb } from '@/lib/storeUrlToDb';
import { ragpipeline } from '@/lib/ragpipeline';

export const UploadItem = () => {

    const onDrop = useCallback(async (acceptedFiles: File[]) => {
        const file: File = acceptedFiles[0]

        //generate presigned url
        const presignedurl = await generatepreSignedURL(file);
        console.log(presignedurl, "url is ")

        if (!presignedurl) return;
        //upload to r3
        try {  
            const res = await fetch(presignedurl,{
                method: "PUT",
                body: file,
            })

            const data = await res.json();
            console.log(data);
        } catch(e) {
            console.log(e);
            console.error(e);
        }

        // const data = await res.json();
        // console.log(data);
        // //todo: store the url in db
        // await storeUrlToDb();

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
