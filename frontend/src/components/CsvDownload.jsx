import React from 'react';
import { MDBBtn } from 'mdb-react-ui-kit';
import { saveAs } from 'file-saver';

function CsvDownloadButton({ updateSharedData, sharedData }) {
  const handleDownload = async () => {

      console.log(sharedData)
    const datatable = sharedData
    // Convert datatable data to CSV format
    // const csvData = convertToCSV(datatable);

    // // Create a Blob object with the CSV data
    // const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });

    // // Save the Blob as a file
    // saveAs(blob, 'datatable.csv');
  };

  const convertToCSV = (datatable) => {
    // Convert datatable data to CSV format (implement your logic here)
    // Format the datatable data as a comma-separated string
    const csvRows = datatable.rows.map((row) => Object.values(row).join(','));
    const csvData = [datatable.columns.map((column) => column.label), ...csvRows].join('\n');

    return csvData;
  };

  return (
    <MDBBtn onClick={handleDownload} color="primary">
      Export to CSV
    </MDBBtn>
  );
}

export default CsvDownloadButton;
