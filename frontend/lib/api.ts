const API_URL = "http://localhost:8000";

export type UploadedPaper = {
    paper_id: string;
    filename: string;
    status: string;
};

export async function uploadPaper(file: File) : 
    Promise<UploadedPaper> {
        const formData = new FormData();
        formData.append("file", file);
        
        const response = await fetch(`${API_URL}/upload`, {
            method: "POST",
            body: formData,
        });
        if (!response.ok) {
            const error = await response.json().catch(() => null);
            throw new Error(
                error?.detail || "Failed to upload paper");
            }
        return response.json();
    }