
"use client";

import type { UploadedPaper } from "../lib/api";

type PaperSidebarProps = {
  paper: UploadedPaper | null;
};

type DropdownProps = {
  title: string;
  children: React.ReactNode;
};

function Dropdown({ title, children }: DropdownProps) {
  return (
    <details className="group rounded-lg border border-gray-200 bg-white">
      <summary className="flex cursor-pointer list-none items-center justify-between p-3 text-sm font-semibold text-gray-800">
        {title}

        <span className="text-gray-500 group-open:rotate-180">
          ▼
        </span>
      </summary>

      <div className="border-t border-gray-200 p-3 text-sm text-gray-700">
        {children}
      </div>
    </details>
  );
}

function InfoRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  return (
    <div className="border-b border-gray-100 py-2 last:border-0">
      <p className="text-xs font-medium text-gray-500">
        {label}
      </p>

      <p className="mt-1 break-words text-sm">
        {value || "Not available"}
      </p>
    </div>
  );
}

export default function PaperSidebar({
  paper,
}: PaperSidebarProps) {
  if (!paper) {
    return (
      <aside className="p-5 text-sm text-gray-500">
        Upload an XML paper to view its information.
      </aside>
    );
  }

  const { metadata, abstract, sections, tables, figures, references } =
    paper.article;

  return (
    <aside className="flex h-full flex-col bg-gray-50 text-gray-900">

      {/* Selected paper */}
      <div className="border-b border-gray-200 p-4">
        <h2 className="text-sm font-semibold">
          Uploaded Paper
        </h2>

        <p className="mt-2 break-words text-xs text-gray-600">
          {paper.filename}
        </p>

        <p className="mt-2 text-xs text-green-700">
          Successfully parsed
        </p>
      </div>

      {/* Collapsible categories */}
      <div className="flex-1 space-y-3 overflow-y-auto p-4">

        <Dropdown title="Paper Identity">
          <InfoRow label="Title" value={metadata.title} />
          <InfoRow label="DOI" value={metadata.doi} />
          <InfoRow label="PMID" value={metadata.pmid} />
          <InfoRow label="PMCID" value={metadata.pmcid} />
          <InfoRow label="Journal" value={metadata.journal} />
          <InfoRow label="Article Type" value={metadata.article_type} />

          <InfoRow
            label="Authors"
            value={metadata.authors
              .map((author) => author.name)
              .join(", ")}
          />

          <InfoRow
            label="Publication Dates"
            value={metadata.publication_dates
              .map((date) =>
                [
                  date.type,
                  [date.year, date.month, date.day]
                    .filter(Boolean)
                    .join("-") || date.date,
                ]
                  .filter(Boolean)
                  .join(": ")
              )
              .join("; ")}
          />

          <InfoRow label="Volume" value={metadata.volume} />
          <InfoRow label="Issue" value={metadata.issue} />
          <InfoRow
            label="Pages"
            value={
              metadata.page_range ||
              [metadata.first_page, metadata.last_page]
                .filter(Boolean)
                .join("–") ||
              metadata.electronic_page
            }
          />
        </Dropdown>

        <Dropdown title="Article Structure">

          <details className="mb-3">
            <summary className="cursor-pointer font-medium">
              Abstract ({abstract.length})
            </summary>

            <div className="mt-2 space-y-2 text-xs">
              {abstract.map((item, index) => (
                <div key={index}>
                  {item.paragraphs.map((text, i) => (
                    <p key={i} className="mb-2">{text}</p>
                  ))}
                </div>
              ))}
            </div>
          </details>

          <details className="mb-3">
            <summary className="cursor-pointer font-medium">
              Sections ({sections.length})
            </summary>

            <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
              {JSON.stringify(sections, null, 2)}
            </pre>
          </details>

          <details className="mb-3">
            <summary className="cursor-pointer font-medium">
              Tables ({tables.length})
            </summary>

            <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
              {JSON.stringify(tables, null, 2)}
            </pre>
          </details>

          <details className="mb-3">
            <summary className="cursor-pointer font-medium">
              Figures ({figures.length})
            </summary>

            <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
              {JSON.stringify(figures, null, 2)}
            </pre>
          </details>

          <details>
            <summary className="cursor-pointer font-medium">
              References ({references.length})
            </summary>

            <pre className="mt-2 whitespace-pre-wrap break-words text-xs">
              {JSON.stringify(references, null, 2)}
            </pre>
          </details>

        </Dropdown>

        <Dropdown title="Research Classification">
          <p className="text-gray-500">
            Not yet extracted.
          </p>
        </Dropdown>

        <Dropdown title="Biological Models">
          <p className="text-gray-500">
            Not yet extracted.
          </p>
        </Dropdown>

        <Dropdown title="Experimental Design">
          <p className="text-gray-500">
            Not yet extracted.
          </p>
        </Dropdown>

        <Dropdown title="Methods & Protocols">
          <p className="text-gray-500">
            Not yet extracted.
          </p>
        </Dropdown>

        <Dropdown title="Reproducibility Details">
          <p className="text-gray-500">
            Not yet extracted.
          </p>
        </Dropdown>

      </div>
    </aside>
  );
}
