import React from 'react';

type AlertProps = {
  message: string;
  type: 'success' | 'error';
  onClose: () => void;
};

const AlertMessage: React.FC<AlertProps> = ({ message, type, onClose }) => {
  if (!message) return null;

  return (
    <div className={`p-4 my-4 rounded border ${type === 'success' ? 'bg-green-100 border-green-500 text-green-700' : 'bg-red-100 border-red-500 text-red-700'}`}>
      <div className="flex justify-between items-center">
        <span>{message}</span>
        <button onClick={onClose} className="font-bold">X</button>
      </div>
    </div>
  );
};

export default AlertMessage;
