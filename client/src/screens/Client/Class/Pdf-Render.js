import React, { useState } from 'react';
import { Document, Page, } from 'react-pdf/dist/esm/entry.webpack';
import { Button } from '@material-ui/core';

export default function PDFComponent(props) {
    const {
        pdfFileName
    } = props;

    const file = require(`../../../assets/docs/${pdfFileName}`).default;
    const [numPages, setNumPages] = useState();
    const [pageNumber, setPageNumber] = useState(1);
    const [renderNavButtons, setRenderNavButtons] = useState(false);
    const onSuccess = () => {
        alert('PDF document loaded successfully!');
        setPageNumber(1);
        setRenderNavButtons(true);
    }

    const changePage = (offset) => {
        setPageNumber(prevPageNumber => prevPageNumber + offset);
    }
    const previousPage = () => { changePage(-1); }
    const nextPage = () => { changePage(+1); }

    return (
        <>
            <div>
                <Document
                    file={file}
                    onLoadSuccess={({ numPages }) => {
                        setNumPages(numPages);
                        setRenderNavButtons(true);
                        onSuccess;
                    }}
                >
                    <Page pageNumber={pageNumber} />
                </Document>
            </div>

            {renderNavButtons &&
                <div className="buttonc">
                    <Button
                        disabled={pageNumber <= 1}
                        onClick={previousPage}
                        variant='primary'
                    >
                        Previous Page
                    </Button>
                    {"  "}
                    <Button
                        disabled={pageNumber === numPages}
                        onClick={nextPage}
                        variant='primary'
                    >
                        Next Page
                    </Button>
                </div>}
        </>
    )
}