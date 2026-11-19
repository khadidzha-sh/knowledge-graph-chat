
"use client";

import type { ParsedArticle } from "../lib/api";

type PaperDetailsProps = {
  article: ParsedArticle;
};

export default function PaperDetails({
  article,
}: PaperDetailsProps) {
  const { metadata } = article;

  return (
    <div className="mx-auto w-full max-w-3xl space-y-4 rounded-xl border border-gray-200 bg-white p-5 text-gray-900">

      <div>
        <h2 className="text-xl font-semibold">
          {metadata.title || "Untitled Paper"}
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          {metadata.journal || "Journal not provided"}
        </p>
      </div>

      {/* Paper identity */}
      <section className="space-y-2">
        <h3 className="font-semibold">Paper Identity</h3>

        <p><strong>DOI:</strong> {metadata.doi || "Not available"}</p>
        <p><strong>PMID:</strong> {metadata.pmid || "Not available"}</p>
        <p><strong>PMCID:</strong> {metadata.pmcid || "Not available"}</p>
        <p><strong>Article type:</strong> {metadata.article_type || "Not available"}</p>
        <p><strong>Volume:</strong> {metadata.volume || "Not available"}</p>
        <p><strong>Issue:</strong> {metadata.issue || "Not available"}</p>
        <p>
          <strong>Pages:</strong>{" "}
          {metadata.page_range ||
            [metadata.first_page, metadata.last_page]
              .filter(Boolean)
              .join("–") ||
            metadata.electronic_page ||
            "Not available"}
        </p>
      </section>

      {/* Authors */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Authors ({metadata.authors.length})
        </summary>

        <ul className="mt-3 list-disc pl-5">
          {metadata.authors.map((author, index) => (
            <li key={index}>{author.name}</li>
          ))}
        </ul>
      </details>

      {/* Publication dates */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Publication Dates ({metadata.publication_dates.length})
        </summary>

        <pre className="mt-3 overflow-x-auto whitespace-pre-wrap text-sm">
          {JSON.stringify(metadata.publication_dates, null, 2)}
        </pre>
      </details>

      {/* Abstract */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Abstract ({article.abstract.length})
        </summary>

        <div className="mt-3 space-y-3">
          {article.abstract.map((abstract, index) => (
            <div key={index}>
              {abstract.title && (
                <h4 className="font-semibold">{abstract.title}</h4>
              )}

              {abstract.paragraphs.map((paragraph, i) => (
                <p key={i} className="mb-2 text-sm leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </details>

      {/* Sections */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Sections ({article.sections.length})
        </summary>

        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap text-sm">
          {JSON.stringify(article.sections, null, 2)}
        </pre>
      </details>

      {/* Tables */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Tables ({article.tables.length})
        </summary>

        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap text-sm">
          {JSON.stringify(article.tables, null, 2)}
        </pre>
      </details>

      {/* Figures */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          Figures ({article.figures.length})
        </summary>

        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap text-sm">
          {JSON.stringify(article.figures, null, 2)}
        </pre>
      </details>

      {/* References */}
      <details className="rounded-lg border p-3">
        <summary className="cursor-pointer font-medium">
          References ({article.references.length})
        </summary>

        <pre className="mt-3 max-h-96 overflow-auto whitespace-pre-wrap text-sm">
          {JSON.stringify(article.references, null, 2)}
        </pre>
      </details>

    </div>
  );
}
