import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import XLSX from "xlsx";

const ExcelToJson: React.FC = () => {
  const [jsonData, setJsonData] = useState<any[]>([]);

  const onDrop = (acceptedFiles: any[]) => {
    console.log(jsonData);
    acceptedFiles.forEach((file: any) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const data = e.target.result;
        if (data) {
          const workbook = XLSX.read(data, { type: "binary" });
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];
          const jsonData = XLSX.utils.sheet_to_json(worksheet);
          setJsonData(jsonData);
        }
      };
      reader.readAsBinaryString(file);
    });
    console.log(jsonData);
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()}>
      <input {...getInputProps()} />
      <p>Drop an Excel file here to convert to JSON</p>
      <pre>{JSON.stringify(jsonData, null, 2)}</pre>
    </div>
  );
};

export default ExcelToJson;
