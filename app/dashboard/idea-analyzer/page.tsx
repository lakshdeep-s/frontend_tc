"use client";

import MarkdownRenderer from '@/components/dashboard/MarkdownRenderer';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

const IdeaAnalyzer = () => {
  const [mainFile, setMainFile] = useState<File | null>(null);
  const [comparisonFiles, setComparisonFiles] = useState<File[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const router = useRouter()

  const handleMainFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf') {
        setMainFile(file);
      }
    }
  };

  const handleComparisonFilesUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).filter((file) =>
        file.type === 'application/pdf'
      );
      setComparisonFiles((prevFiles) => [...prevFiles, ...selectedFiles].slice(0, 2));
    }
  };

  const handleRemoveMainFile = () => {
    setMainFile(null);
  };

  const handleRemoveComparisonFile = (index: number) => {
    setComparisonFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const AnalyzeFiles = async () => {
    const allFiles = mainFile ? [mainFile, ...comparisonFiles] : comparisonFiles;
    if (allFiles.length !== 3) {
      alert('Please upload exactly 1 main research PDF and 2 comparison PDFs');
      return;
    }
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('paper_1', allFiles[0]); // Main research
      formData.append('paper_2', allFiles[1]); // Comparison 1
      formData.append('paper_3', allFiles[2]); // Comparison 2

      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const result = await response.json();
      setMarkdownContent(result.comparison);
      console.log(result);
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('An error occurred while uploading files.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleViewPDF = () => {
    // Pass the markdown content via URL-safe encoding
    const encodedContent = encodeURIComponent(markdownContent);
    router.push(`/dashboard/pdf-viewer?content=${encodedContent}`);
  };

  async function handleDownloadPDF() {
    ""
  };

  return (
    <div className='p-8 flex flex-col items-center justify-center mx-auto rounded-lg shadow-md w-full max-w-4xl'>
      <h1 className='text-4xl font-semibold mb-4 text-center'>Upload your PDFs here</h1>

      <div className="w-full max-w-3xl">
        {/* Main Research Upload */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2 text-center">Upload Your Research</h2>
          {!mainFile ? (
            <div className="flex justify-center">
              <label className="cursor-pointer flex flex-col items-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-2 border-dashed border-blue-500 mb-2 hover:bg-blue-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleMainFileUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : (
            <div className="flex justify-center">
              <div className="flex flex-col items-center">
                <div className="w-20 h-20 bg-green-500 text-white flex items-center justify-center rounded-t-lg">
                  <span className="text-sm font-bold">PDF</span>
                </div>
                <div className="w-20 bg-white text-red-500 shadow-md rounded-b-lg px-2 py-1 text-xs text-center relative">
                  <span className="block truncate">{mainFile.name}</span>
                  <button
                    onClick={handleRemoveMainFile}
                    className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-md text-red-500 hover:text-red-700"
                  >
                    ✕
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Papers Upload */}
        <div className="mb-6">
          <h2 className="text-xl font-medium mb-2 text-center">Comparison Papers (Upload 2)</h2>
          {comparisonFiles.length < 2 ? (
            <div className="flex justify-center">
              <label className="cursor-pointer flex flex-col items-center">
                <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-2 border-dashed border-blue-500 mb-2 hover:bg-blue-50 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                  </svg>
                </div>
                <input
                  type="file"
                  accept="application/pdf"
                  multiple
                  onChange={handleComparisonFilesUpload}
                  className="hidden"
                />
              </label>
            </div>
          ) : null}
          {comparisonFiles.length > 0 && (
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              {comparisonFiles.map((file, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-20 h-20 bg-red-500 text-white flex items-center justify-center rounded-t-lg">
                    <span className="text-sm font-bold">PDF</span>
                  </div>
                  <div className="w-20 bg-white text-red-500 shadow-md rounded-b-lg px-2 py-1 text-xs text-center relative">
                    <span className="block truncate">{file.name}</span>
                    <button
                      onClick={() => handleRemoveComparisonFile(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-md text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Buttons */}
        {(mainFile || comparisonFiles.length > 0) && (
          <div className="flex justify-center gap-4 mt-4 mb-6">
            <button
              onClick={AnalyzeFiles}
              disabled={isUploading}
              className={`py-2 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {isUploading ? 'Analyzing...' : 'Analyze'}
            </button>
            {markdownContent && !isUploading && (
              <button
                onClick={handleViewPDF}
                className="py-2 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
              >
                Download as PDF
              </button>
            )}
          </div>
        )}

        {/* Markdown content container with ID */}
        <div id="markdown-container" className="w-full rounded-lg min-h-[200px] overflow-auto p-4 text-sm">
          {markdownContent ? (
            <div className='border h-full overflow-auto border-gray-700 bg-white p-6 rounded-md text-sm w-full' id="pdf">
              <MarkdownRenderer content={markdownContent} />
            </div>
          ) : (
            <div className="text-gray-500 text-center">
              Begin Analysis to get a comprehensive report of your literature review
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default IdeaAnalyzer;