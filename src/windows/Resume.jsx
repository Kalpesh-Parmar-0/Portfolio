import { useEffect, useState } from "react";
import { WindowControls } from "#components";
import WindowWraper from "#hoc/WindowWraper";
import useWindowStore from "#store/window";
import { Download } from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();

const RESUMES = {
  fullstack: {
    label: "Full Stack",
    file: "files/resume-full.pdf",
    downloadName: "Kalpesh-Parmar-FullStack-Resume.pdf",
  },
  ml: {
    label: "ML & Data Science",
    file: "files/resume-ml.pdf",
    downloadName: "Kalpesh-Parmar-ML-DataScience-Resume.pdf",
  },
};

const Resume = () => {
  const { windows } = useWindowStore();
  const requestedKey = windows.resume?.data?.resumeKey;
  const [active, setActive] = useState(requestedKey ?? "fullstack");
  const [numPages, setNumPages] = useState(1);
  const resume = RESUMES[active];

  // Finder can request a specific resume (e.g. clicking "Resume - ML & Data
  // Science.pdf" directly) - jump to that tab each time the window opens.
  useEffect(() => {
    if (windows.resume?.isOpen && requestedKey) {
      setActive(requestedKey);
      setNumPages(1);
    }
  }, [windows.resume?.isOpen, requestedKey]);

  return (
    <>
      <div id="window-header">
        <WindowControls target="resume" />
        <h2>{resume.downloadName.replace(/-/g, " ").replace(".pdf", "")}</h2>

        <a
          href={resume.file}
          download={resume.downloadName}
          className="cursor-pointer"
          title="Download resume"
        >
          <Download className="icon" />
        </a>
      </div>

      <div className="resume-tabs">
        {Object.entries(RESUMES).map(([key, { label }]) => (
          <button
            key={key}
            type="button"
            className={key === active ? "active" : ""}
            onClick={() => {
              setActive(key);
              setNumPages(1);
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="resume-pages">
        <Document
          file={resume.file}
          onLoadSuccess={({ numPages: total }) => setNumPages(total)}
        >
          {Array.from({ length: numPages }, (_, index) => (
            <Page
              key={`${active}-${index + 1}`}
              pageNumber={index + 1}
              renderTextLayer
              renderAnnotationLayer
            />
          ))}
        </Document>
      </div>
    </>
  );
};

const ResumeWindow = WindowWraper(Resume, "resume");

export default ResumeWindow;
