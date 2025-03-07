"use client";

import React from 'react';
import ReactMarkdown from 'react-markdown';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  if (!content) {
    return (
      <div className="w-full p-4 text-gray-500 italic">
        Analysis results will appear here...
      </div>
    );
  }

  return (
    <div className="w-full p-4 markdown-content">
      <ReactMarkdown>{content}</ReactMarkdown>
    </div>
  );
};

export default MarkdownRenderer;