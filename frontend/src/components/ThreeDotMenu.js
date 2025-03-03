import React, { useState } from "react";
import { FaEllipsisV } from "react-icons/fa"; // Import the three-dot icon

const ThreeDotMenu = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="relative">
            {/* Three-dot button */}
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 text-gray-600 hover:text-gray-900"
            >
                <FaEllipsisV size={20} />
            </button>

            {/* Dropdown menu */}
            {isOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-lg z-10">
                    <button
                        onClick={onEdit}
                        className="block w-full px-4 py-2 text-left hover:bg-gray-100"
                    >
                        Edit
                    </button>
                    <button
                        onClick={onDelete}
                        className="block w-full px-4 py-2 text-left hover:bg-red-100 text-red-600"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};

export default ThreeDotMenu;
