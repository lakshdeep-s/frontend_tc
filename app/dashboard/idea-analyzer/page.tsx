"use client";

import React, { useState } from 'react';
import MarkdownRenderer from '@/components/dashboard/MarkdownComponent';

const IdeaAnalyzer = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [markdownContent, setMarkdownContent] = useState<string>("");
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files).filter((file) =>
        file.type === 'application/pdf'
      );
      setFiles((prevFiles) => [...prevFiles, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
  };

  const AnalyzeFiles = async () => {
    if (files.length !== 3) {
      alert('Please upload exactly 3 PDF files to analyze');
      return;
    }
    setIsUploading(true);

    try {
      const formData = new FormData();
      formData.append('paper_1', files[0]);
      formData.append('paper_2', files[1]);
      formData.append('paper_3', files[2]);

      const response = await fetch('http://localhost:8080/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload files');
      }

      const result = await response.json();
      setMarkdownContent(result.comparison); // Set markdown content from server response
      console.log(result);
    } catch (err) {
      console.error('Error uploading files:', err);
      alert('An error occurred while uploading files.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className='p-8 flex flex-col items-center justify-center mx-auto rounded-lg shadow-md w-full max-w-4xl'>
      <h1 className='text-4xl font-semibold mb-4 text-center'>Upload your PDFs here</h1>

      <div className="w-full max-w-3xl">
        {files.length > 0 ? (
          <div className="mb-6">
            <div className="flex flex-wrap gap-3 justify-center mb-4">
              {files.map((file, index) => (
                <div key={index} className="flex flex-col items-center">
                  <div className="w-16 h-20 bg-red-500 text-white flex items-center justify-center rounded-t-lg">
                    <span className="text-sm font-bold">PDF</span>
                  </div>
                  <div className="w-16 bg-white shadow-md rounded-b-lg px-2 py-1 text-xs text-center relative">
                    <span className="block truncate">{file.name}</span>
                    <button
                      onClick={() => handleRemoveFile(index)}
                      className="absolute -top-2 -right-2 bg-white rounded-full w-5 h-5 flex items-center justify-center shadow-md text-red-500 hover:text-red-700"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-4">
              <button
                onClick={AnalyzeFiles}
                disabled={isUploading}
                className={`py-2 px-6 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isUploading ? 'Analyzing...' : 'Analyze'}
              </button>
            </div>
          </div>
        ) : (
          <div className="flex justify-center mb-6">
            <label className="cursor-pointer flex flex-col items-center">
              <div className="w-32 h-32 bg-blue-100 rounded-full flex items-center justify-center border-2 border-dashed border-blue-500 mb-2 hover:bg-blue-50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <span className="block py-2 px-4 rounded-lg bg-blue-500 text-white text-center font-semibold hover:bg-blue-600 transition-colors">
                Upload PDFs
              </span>
              <input
                type="file"
                accept="application/pdf"
                multiple
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        )}

        {/* Markdown content container */}
        <div className="w-full border border-gray-700 rounded-lg min-h-[200px] overflow-auto">
          <MarkdownRenderer content={markdownContent} />
        </div>
      </div>
    </div>
  );
};

export default IdeaAnalyzer;