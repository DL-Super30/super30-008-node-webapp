import React, { useState } from 'react';
import Image from 'next/image';

export default function ConvertLeadModal({ isOpen, onClose, onConfirm }) {
  const [convertTo, setConvertTo] = useState('opportunity');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl text-blue-600 font-bold mb-4">Confirm Conversion</h2>
        <Image
          src="/images/opportunity.svg"
          width={0}
          height={0}
          className="w-48 h-48 md:w-64 md:h-64 object-contain mx-auto mb-4"
          alt="Conversion Image"
        />
        <p className="text-gray-700 mb-4">Please select the type of conversion:</p>
        <div className="flex justify-center space-x-4 mb-6">
          <button
            className={`px-4 py-2 rounded-full ${
              convertTo === 'opportunity' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-600 hover:text-white transition-colors`}
            onClick={() => setConvertTo('opportunity')}
          >
            Opportunity
          </button>
          <button
            className={`px-4 py-2 rounded-full ${
              convertTo === 'learner' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
            } hover:bg-blue-600 hover:text-white transition-colors`}
            onClick={() => setConvertTo('learner')}
          >
            Learner
          </button>
        </div>
        <p className="text-gray-700 mb-6">
          Are you sure you want to convert this lead to a{' '}
          <span className="font-semibold">
            {convertTo === 'opportunity' ? 'new opportunity' : 'new learner'}
          </span>
          ?
        </p>
        <div className="flex justify-end space-x-4">
          <button
            className="px-4 py-2 border-2 border-gray-300 rounded text-gray-700 hover:bg-gray-500 hover:text-white transition-colors"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 border-2 border-blue-500 text-black rounded hover:bg-blue-500 hover:text-white transition-colors"
            onClick={() => onConfirm(convertTo)} // Pass the selected conversion type
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
}
