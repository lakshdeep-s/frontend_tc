"use client";

import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { useSearchParams } from 'next/navigation';
import { PDFDownloadLink } from '@react-pdf/renderer';

// PDF Document Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
    fontFamily: 'Helvetica',
  },
  section: {
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
    lineHeight: 1.5,
  },
});

const PDFDocument = ({ content }: { content: string }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <Text style={styles.title}>Literature Review Analysis</Text>
      <View style={styles.section}>
        <Text style={styles.text}>{content}</Text>
      </View>
    </Page>
  </Document>
);

const PDFViewerPage = () => {
  const searchParams = useSearchParams();
  const content = decodeURIComponent(searchParams.get('content') || '');

  if (!content) {
    return (
      <div className="p-8 text-center">
        <h1 className="text-2xl font-bold">No content available</h1>
        <p className="text-gray-500">Please generate a report first</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-8 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6">PDF Preview</h1>
      
      <div className="w-full max-w-4xl mb-6 flex justify-end">
        <PDFDownloadLink
          document={<PDFDocument content={content} />}
          fileName="literature_review.pdf"
          className="py-2 px-6 rounded-lg bg-blue-500 text-white font-semibold hover:bg-blue-600"
        >
          {({ loading }) => (loading ? 'Generating PDF...' : 'Download PDF')}
        </PDFDownloadLink>
      </div>

      <div className="w-full max-w-4xl border rounded-lg overflow-hidden">
        <PDFViewer width="100%" height="800px" className="w-full">
          <PDFDocument content={content} />
        </PDFViewer>
      </div>
    </div>
  );
};

export default PDFViewerPage;