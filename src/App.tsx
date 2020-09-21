import React, { useState, useCallback } from 'react';
import { pdfjs, Document, Page } from 'react-pdf';

import examplePDF from './example.pdf';

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function App() {
  const pageLimits = {
    min: 2,
    max: 4,
  };
  const [totalPages, setTotalPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(pageLimits.min);

  const onDocumentLoadSuccess = useCallback(({ numPages }) => {
    console.log('SUCCESS', numPages);
    setTotalPages(numPages);
  }, []);

  const onDocumentLoadError = useCallback((info) => {
    console.log('ERROR', info);
  }, []);

  const handlePrevious = useCallback(() => {
    if (currentPage === pageLimits.min) return;

    setCurrentPage(currentPage - 1);
  }, [currentPage, pageLimits.min]);

  const handleNext = useCallback(() => {
    if (currentPage === pageLimits.max) return;

    setCurrentPage(currentPage + 1);
  }, [currentPage, pageLimits.max]);

  return (
    <div className='App' style={{ width: '100vw', height: '100vh' }}>
      <Document
        file={examplePDF}
        onLoadError={onDocumentLoadError}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={currentPage} />
      </Document>

      <div style={{ position: 'absolute', top: 0, bottom: 0 }}>
        <button
          type='button'
          onClick={handlePrevious}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span>{` ${currentPage} | ${totalPages} `}</span>
        <button
          type='button'
          onClick={handleNext}
          disabled={totalPages === currentPage}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default App;
