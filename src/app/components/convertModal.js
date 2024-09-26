"use client"
import React, { useState } from 'react';
import Image from 'next/image';

const ConvertLeadModal = ({ isOpen, onClose, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md">
        <h2 className="text-xl text-blue-400 font-bold">Confirm Conversion</h2>
        <Image
          src="/images/opportunity.svg"
          width={0}
          height={0}
          className="w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 object-contain"
          alt="Opportunity Image"
        />
        <p>Are you sure you want to convert this lead?</p>
        <div className="mt-4 flex justify-end">
          <button
            className="px-4 py-2 border-2 border-gray-500 rounded mr-2 text-black hover:bg-gray-500 hover:text-white hover:font-bold"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 mx-2 py-2 border-yellow-400 border-2 text-black rounded hover:bg-yellow-400 hover:text-white hover:font-bold"
            onClick={onConfirm}
          >
            Convert
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConvertLeadModal;