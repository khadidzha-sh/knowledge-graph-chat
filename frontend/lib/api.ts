const API_URL = "http://localhost:8000";

export type UploadedPaper = {
    message: string;
    paper_id: string;
    filename: string;
    status: string;
    article: ParsedArticle;
};

export type ParsedArticle = {
    metadata: {
        doi: string;
        pmid: string;
        pmcid: string;
        title: string;
        article_type: string;
        authors: {
            name: string;
            given_names: string;
            surname: string;
            orcid: string;
        }[];
        journal: string;
        publication_dates: {
            type: string;
            year: string;
            month: string;
            day: string;
            date: string;
        }[];
        volume: string;
        issue: string;
        first_page: string;
        last_page: string;
        page_range: string;
        electronic_page: string;
    };
    abstract: {
        id: string;
        title: string;
        paragraphs: string[];
    }[];
    sections: ParsedSection[];
    tables: Record<string, unknown>[];
    figures: Record<string, unknown>[];
    references: Record<string, unknown>[];
};

export type ParsedSection = {
    id: string;
    title: string;
    path: string;
    paragraphs: {
        id: string;
        text: string;
    }[];
    subsections: ParsedSection[];
};

// This function must be exported!
export async function uploadPaper(
    file: File
): Promise<UploadedPaper> {

    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(`${API_URL}/upload`, {
        method: "POST",
        body: formData,
    });

    if (!response.ok) {
        const error = await response.json().catch(() => null);

        throw new Error(
            error?.detail || "Failed to upload paper"
        );
    }

    return response.json();
}