"use client";

type PaperUploadProps = { 
    onPaperSelect: (file: File) => void;
    selectedPaper: File | null;
};

export default function PaperUpload({
    onPaperSelect, selectedPaper,}: PaperUploadProps) {
        const handleFileChange = (
            event : React.ChangeEvent<HTMLInputElement>
        ) => {
            const file = event.target.files?.[0];
            if (!file) return;

            // for now, only allow xml format
            if(!file.name.toLocaleLowerCase().endsWith(".xml")) {
                alert("Please select an XML file.");
                return;
            }
            onPaperSelect(file);
        };

        return (
            <div className="flex flex-col items-center gap-3 p-4">
                <label className="cursor-pointer rounded-lg bg-blue-600 py-3 px-5 text-white hover:bg-blue-700">
                    Upload XML Paper
                    <input
                        type="file"
                        accept=".xml,application/xml,text/xml"
                        onChange={handleFileChange}
                        className="hidden"
                    />
                </label>
                {selectedPaper && (
                    <p className="text-sm text-gray-600">
                        Selected Paper: {selectedPaper.name}
                    </p>
                )}
            </div>
        );
    }