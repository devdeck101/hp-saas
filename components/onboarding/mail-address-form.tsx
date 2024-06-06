"use client"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { FileUploadIcon } from "../icons"

import type { z } from "zod";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"



import { FileInput, FileUploader, FileUploaderContent, FileUploaderItem } from "../ui/extension/file-uploader"
import { useState } from "react";
import { useFormContext } from "react-hook-form";


export default function OrgForm() {
    const form = useFormContext()
    // const [error, setError] = useState("")
    // const [success, setSuccess] = useState("")
    const [files, setFiles] = useState<File[] | null>(null);

    const dropZoneConfig = {
        maxFiles: 1,
        maxSize: 1024 * 1024 * 4,
        multiple: true,
    };





    return (

        <CardContent className="space-y-4">

            <div className="space-y-2">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input placeholder="Nome da Org" {...field} />
                            </FormControl>
                            <FormDescription>
                                Nomeie a sua Organização
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
            <div className="space-y-3">
                <Label htmlFor="image">Imagem</Label>
                <div className="flex  items-center justify-center gap-2">

                    <div className="flex  w-full cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 text-center">
                        <FileUploader
                            value={files}
                            onValueChange={setFiles}
                            dropzoneOptions={dropZoneConfig}
                            className="relatived rounded-lg p-2 "
                        >
                            <FileInput className="outline-1 ">
                                <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
                                    <FileUploadIcon className="h-8 w-8 text-gray-400" />
                                    <span className="text-sm text-slate-400">Arraste a imagem aqui ou clique para selecionar</span>
                                </div>
                            </FileInput>
                            <FileUploaderContent>
                                {files &&
                                    files.length > 0 &&
                                    files.map((file, i) => (
                                        <FileUploaderItem key={file.name} index={i}>
                                            <img
                                                alt={file.name}
                                                src={URL.createObjectURL(file)}
                                                onLoad={() => URL.revokeObjectURL(URL.createObjectURL(file))}
                                                className="size-20 p-0 object-contain" />

                                        </FileUploaderItem>
                                    ))}

                            </FileUploaderContent>
                        </FileUploader>
                    </div>
                </div>
                {/* {error && (<pre>{error}</pre>)}
                {success && (<pre>{success}</pre>)} */}
                {/* <div className="flex flex-row">
                        <Button type="submit" className="ml-auto">
                            Criar Org
                        </Button>
                    </div> */}
            </div>


        </CardContent>

    )
}

