import React, { useMemo } from 'react';
import { FiEdit, FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';

const Table = React.memo(({ 
  keys, 
  titles, 
  rows, 
  onSearchChange,
  onRowAction 
}) => {
  const renderCell = (row, key) => {
    if (key === 'image' && typeof row[key] !== 'string') {
      return row[key];
    }
    return <span className="truncate max-w-xs block">{row[key]}</span>;
  };

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-4 flex justify-between items-center border-b">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            onChange={onSearchChange}
            className="w-full pl-4 pr-10 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          {rows.length} {rows.length === 1 ? 'result' : 'results'}
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {titles.map((title, idx) => (
                <th 
                  key={idx}
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  {title}
                </th>
              ))}
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rows.map((row, rowIdx) => (
              <tr key={rowIdx} className="hover:bg-gray-50">
                {keys.map((key, colIdx) => (
                  <td 
                    key={colIdx}
                    className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 max-w-xs truncate"
                  >
                    {renderCell(row, key)}
                  </td>
                ))}
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  {onRowAction(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
});

export default Table;