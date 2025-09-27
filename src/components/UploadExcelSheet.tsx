import React, { useState } from "react";
import * as XLSX from "xlsx";
import SlidingHeaderText from "../atoms/SlidingText";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import AtomButton from "../atoms/AtomButton";

interface ExcelRow {
  [key: string]: string | number;
}

const ExcelUploader: React.FC = () => {
  const [data, setData] = useState<ExcelRow[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const rowsPerPage = 10;
  const navigate = useNavigate();
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryStr = evt.target?.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData: ExcelRow[] = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length > 0) {
        setColumns(Object.keys(jsonData[0]));
        setData(jsonData);
        setCurrentPage(1); // reset to first page
      }
    };
    reader.readAsBinaryString(file);
  };

  const totalPages = Math.ceil(data.length / rowsPerPage);
  const paginatedData = data.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const windowSize = 5;
  const windowStart =
    Math.floor((currentPage - 1) / windowSize) * windowSize + 1;
  const windowEnd = Math.min(windowStart + windowSize - 1, totalPages);
  return (
    <div className="page-container">
      <div className="card p-4 shadow-sm">
        <div className="d-flex align-items-center mb-3">
          <label
            htmlFor="excel-upload"
            className="btn btn-outline-primary me-2"
          >
            <i className="bi bi-upload"></i> Upload Excel
          </label>
          <input
            id="excel-upload"
            type="file"
            accept=".xlsx, .xls, .csv"
            onChange={handleFileUpload}
            style={{ display: "none" }}
          />
          <AtomButton
            icon={<ArrowLeftCircle size={24} />}
            label=""
            onClick={() => navigate("/dashboard")}
            title="Back to Dashboard"
            className="btn btn-outline-secondary"
            style={{
              position: "absolute",
              top: "1.5rem",
              right: "1.5rem",
            }}
          />
        </div>

        {data.length > 0 && (
          <>
            <div className="table-responsive">
              <table className="table table-bordered table-hover">
                <thead className="table-light">
                  <tr>
                    {columns.map((col) => (
                      <th key={col}>{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((row, idx) => (
                    <tr key={idx}>
                      {columns.map((col) => (
                        <td key={col}>{row[col]}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav>
              <ul className="pagination justify-content-center">
                {/* Previous */}
                <li
                  className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                  >
                    Previous
                  </button>
                </li>

                {/* Page Numbers in Window */}
                {Array.from({ length: windowEnd - windowStart + 1 }, (_, i) => {
                  const page = windowStart + i;
                  return (
                    <li
                      key={page}
                      className={`page-item ${
                        currentPage === page ? "active" : ""
                      }`}
                    >
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(page)}
                      >
                        {page}
                      </button>
                    </li>
                  );
                })}

                {/* Ellipsis + Next Window */}
                {windowEnd < totalPages && (
                  <>
                    <li className="page-item disabled">
                      <span className="page-link">...</span>
                    </li>
                    <li className="page-item">
                      <button
                        className="page-link"
                        onClick={() => handlePageChange(currentPage + 1)}
                      >
                        Next
                      </button>
                    </li>
                  </>
                )}
              </ul>
            </nav>
          </>
        )}
      </div>
    </div>
  );
};

export default ExcelUploader;
