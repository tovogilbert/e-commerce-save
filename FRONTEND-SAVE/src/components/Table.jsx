import { FiEdit, FiTrash2, FiEye, FiMoreVertical } from 'react-icons/fi';

const Table = ({ keys, title, rows, onChangeSearch, columnAction }) => {
    const getActionStyle = (actionType) => {
        switch(actionType) {
            case 'edit':
                return 'text-blue-600 hover:text-blue-800';
            case 'delete':
                return 'text-red-600 hover:text-red-800';
            case 'view':
                return 'text-green-600 hover:text-green-800';
            default:
                return 'text-gray-600 hover:text-gray-800';
        }
    };

    const defaultColumnAction = (row) => (
        <div className="flex space-x-2 justify-end">
            <button 
                className={`p-1 rounded-md ${getActionStyle('view')}`}
                onClick={() => console.log('View', row)}
                title="Voir"
            >
                <FiEye className="h-5 w-5" />
            </button>
            <button 
                className={`p-1 rounded-md ${getActionStyle('edit')}`}
                onClick={() => console.log('Edit', row)}
                title="Modifier"
            >
                <FiEdit className="h-5 w-5" />
            </button>
            <button 
                className={`p-1 rounded-md ${getActionStyle('delete')}`}
                onClick={() => console.log('Delete', row)}
                title="Supprimer"
            >
                <FiTrash2 className="h-5 w-5" />
            </button>
        </div>
    );

    const renderColumnAction = columnAction || defaultColumnAction;

    return (
        <div className="mb-[-40px]">
            <div className="bg-white rounded-lg shadow-2xl p-5">
                <div className="flex justify-between items-center mb-5 pr-10">
                    <div className="relative">
                        <input 
                            placeholder="Search..." 
                            type="text" 
                            className="px-4 py-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-100 focus:border-blue-100 text-gray-700"
                            onChange={onChangeSearch} 
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                            <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                    </div>
                    <div className="text-gray-700 font-medium">{rows.length} result(s)</div>
                </div>
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                {title.map((item, index) => (
                                    <th 
                                        key={index}
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider"
                                    >
                                        {item}
                                    </th>
                                ))}
                                <th className="px-6 py-3 text-right text-xs font-medium text-gray-700 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {rows.map((row, id) => (
                                <tr key={id} className="hover:bg-gray-50">
                                    {keys.map((key, index) => (
                                        <td 
                                            key={index}
                                            className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"
                                        >
                                            {row[key]}
                                        </td>
                                    ))}
                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                        {renderColumnAction(row)}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="mt-12"></div>
            </div>
        </div>
    )
}

export default Table