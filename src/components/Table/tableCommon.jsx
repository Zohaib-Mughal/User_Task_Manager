import React, { useState } from "react";
import TruncatedText from "../text/TruncatedText";
import ModalCommon from "../modal/modalCommon";
import DOMPurify from "dompurify";
import { stripHtmlTags } from "../../utils/localStorageUtils";

export default function TableCommon({ tableData, column, action }) {
  const [showModal, setShowModal] = useState(false);
  const [ClickedItem, setClickedItem] = useState();

  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-700 bg-gray-900">
      <table className="min-w-full divide-y divide-gray-700">
        {/* Table Head */}
        <thead className="bg-gray-800">
          <tr>
            {column.map((col) => (
              <th
                key={col.field}
                className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-100 uppercase tracking-wider text-center"
              >
                {col.header}
              </th>
            ))}
            {action && (
              <th className="px-2 py-2 sm:px-4 sm:py-3 text-xs sm:text-sm font-semibold text-gray-100 uppercase tracking-wider text-center">
                Action
              </th>
            )}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody className="divide-y divide-gray-700">
          {tableData.length > 0 ? (
            tableData.map((data, index) => (
              <tr
                key={data.username || "row" + index}
                className="bg-gray-900 hover:bg-gray-800 transition-colors duration-300 cursor-pointer"
                onClick={() => {
                  setShowModal(true);
                  setClickedItem(data);
                }}
              >
                {column.map((col, index) => (
                  <td
                    key={`${col.field}-${index}`}
                    className="px-4 py-3 text-gray-300 text-sm text-center"
                  >
                    {col.field === "description" ? (
                      <TruncatedText text={data[col.field] || ""} limit={30} />
                    ) : (
                      data[col.field]
                    )}
                  </td>
                ))}

                {action && (
                  <td
                    className="px-4 py-3 text-center space-x-2"
                    key={`action-${index}`}
                  >
                    {action.map((actionItem, i) => (
                      <button
                        key={i}
                        onClick={(e) => {
                          e.stopPropagation();
                          actionItem.function(data);
                        }}
                        className={`px-3 py-1 rounded-lg text-sm font-medium transition-all duration-300 hover:scale-105 shadow-md ${actionItem.style}`}
                      >
                        {actionItem.header}
                      </button>
                    ))}
                  </td>
                )}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={column.length + (action ? 1 : 0)}
                className="px-4 py-6 text-center text-gray-400 italic"
              >
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <ModalCommon
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title={"Details"}
        >
          <div className="space-y-3 flex flex-col">
            {column.map((col, i) => (
              <div>
                <p className="text-gray-300 text-sm" key={`p${i}`}>
                  <p className="text-gray-100">{col.header}</p>
                  <span className="text-indigo-300">
                    {col.field === "description" ? (
                      <div className="w-auto border p-2 rounded-2xl mt-1 ">
                        <TruncatedText
                          text={ClickedItem[col.field] || ""}
                          limit={10000}
                        />
                      </div>
                    ) : (
                      <input
                        type="text"
                        className="px-3 py-2 w-full border rounded text-white  bg-gray-900 cursor-not-allowed"
                        value={ClickedItem[col.field]}
                        readOnly
                      />
                    )}
                  </span>
                </p>
              </div>
            ))}
          </div>
        </ModalCommon>
      )}
    </div>
  );
}
