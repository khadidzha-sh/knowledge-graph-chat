"use client";

import{useState} from "react";
import {uploadPaper, type UploadedPaper} from "@/lib/api";

type PaperUploadProps = { 
    onUploaded: (paper: UploadedPaper) => void;
};

export default function PaperUpload({
    onUploaded}: PaperUploadProps) {
    const [isUploading, setIsUploading] = useState(false);
    const[error, setError] = useState("");

    const handleFileChange = async (
        event : React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = event.target.files?.[0];
            if (!file) return;

            // for now, only allow xml format
            if(!file.name.toLowerCase().endsWith(".xml")) {
                setError("Please select an XML file.");
                event.target.value = "";
                return;
            }
            setIsUploading(true);
            setError("");

            try {
                const result = await uploadPaper(file);
                onUploaded(result);
            } catch (err) {
                setError(
                    err instanceof Error ? err.message : "Upload failed.");
            } finally {
                setIsUploading(false);
                event.target.value = "";
            }
    };

    return (
        <div className="flex flex-col items-center gap-3 p-4">
        <label
            className={`rounded-lg bg-blue-600 px-5 py-3 text-white ${
            isUploading
                ? "cursor-wait opacity-50"
                : "cursor-pointer hover:bg-blue-700"
            }`}
        >
            {isUploading ? "Uploading..." : "Upload XML Paper"}

            <input
            type="file"
            accept=".xml,application/xml,text/xml"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            />
        </label>

        {error && (
            <p role="alert" className="text-sm text-red-600">
            {error}
            </p>
        )}
        </div>
    );
}