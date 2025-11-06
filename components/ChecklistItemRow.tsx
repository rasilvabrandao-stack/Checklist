import React, { useRef, useState, useEffect } from 'react';
import type { ChecklistItem, ChecklistItemStatus } from '../types';

interface ChecklistItemRowProps {
  item: ChecklistItem;
  onChange: (newStatus?: ChecklistItemStatus, newObservation?: string, newImage?: string | null) => void;
  onDelete: () => void;
  onSave: (newDescription: string) => void;
  onCancel: () => void;
}

const StatusButton: React.FC<{ label: string; value: ChecklistItemStatus; currentStatus: ChecklistItemStatus; itemID: string, onChange: (status: ChecklistItemStatus) => void;}> = ({label, value, currentStatus, itemID, onChange}) => {
    const isChecked = currentStatus === value;
    const bgColor = isChecked ? (value === 'OK' ? 'bg-green-500' : 'bg-red-500') : 'bg-gray-200';
    const textColor = isChecked ? 'text-white' : 'text-gray-600';
    const hoverColor = value === 'OK' ? 'hover:bg-green-600' : 'hover:bg-red-600';

    return (
        <label className={`cursor-pointer px-3 py-1 text-xs font-bold rounded-full transition-colors ${bgColor} ${textColor} ${hoverColor}`}>
            <input
                type="radio"
                name={`status-${itemID}`}
                value={value}
                checked={isChecked}
                onChange={() => onChange(value)}
                className="sr-only"
            />
            {label}
        </label>
    );
};

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const ChecklistItemRow: React.FC<ChecklistItemRowProps> = ({ item, onChange, onDelete, onSave, onCancel }) => {
  const [description, setDescription] = useState(item.description);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (item.isNew) {
      inputRef.current?.focus();
    }
  }, [item.isNew]);


  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        onChange(undefined, undefined, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeImage = () => {
    onChange(undefined, undefined, null);
    if(fileInputRef.current) {
        fileInputRef.current.value = "";
    }
  };

  const ImageUploader = () => (
    <div className="flex flex-col items-center justify-center h-full">
      {!item.image ? (
        <div className="no-print">
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleImageUpload}
            className="sr-only"
          />
          <button
            type="button"
            onClick={triggerFileInput}
            className="bg-gray-200 text-gray-700 text-xs font-semibold py-1 px-3 rounded-md hover:bg-gray-300 transition"
          >
            Adicionar Imagem
          </button>
        </div>
      ) : (
        <div className="relative group">
          <img src={item.image} alt={`Evidência ${item.id}`} className="w-16 h-16 object-cover rounded-md border border-gray-300 print-image" />
          <button
            type="button"
            onClick={removeImage}
            className="absolute top-0 right-0 -mt-2 -mr-2 bg-red-500 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity no-print"
            aria-label="Remover imagem"
          >
            &times;
          </button>
        </div>
      )}
       {item.image && <img src={item.image} alt={`Evidência ${item.id}`} className="hidden print:block print-image" />}
    </div>
  );

  if (item.isNew) {
    return (
        <div className="grid grid-cols-12 gap-2 p-2 items-center bg-blue-50 checklist-item-row no-print">
            <div className="col-span-1 text-center font-medium text-gray-800">*</div>
            <div className="col-span-11 sm:col-span-8">
                <input
                    ref={inputRef}
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Descrição do novo item"
                    className="w-full p-2 border border-blue-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500"
                    onKeyDown={(e) => e.key === 'Enter' && onSave(description)}
                />
            </div>
            <div className="col-span-12 sm:col-span-3 flex justify-end sm:justify-center items-center gap-2 mt-2 sm:mt-0">
                <button onClick={() => onSave(description)} className="bg-green-500 text-white text-xs font-semibold py-1 px-3 rounded-md hover:bg-green-600">Salvar</button>
                <button onClick={onCancel} className="bg-gray-400 text-white text-xs font-semibold py-1 px-3 rounded-md hover:bg-gray-500">Cancelar</button>
            </div>
        </div>
    )
  }

  return (
    <div className="grid grid-cols-12 gap-2 p-2 items-center hover:bg-gray-50 checklist-item-row">
      <div className="col-span-1 text-center font-medium text-gray-800">{item.id}</div>
      <div className="col-span-11 sm:col-span-3 text-gray-700">{item.description}</div>
      
      {/* Mobile view */}
      <div className="col-span-12 sm:hidden grid grid-cols-1 gap-2 mt-2">
         <div className="flex justify-start space-x-2 no-print">
            <StatusButton label="OK" value="OK" currentStatus={item.status} itemID={item.id} onChange={(status) => onChange(status, undefined, undefined)} />
            <StatusButton label="Não OK" value="Not OK" currentStatus={item.status} itemID={item.id} onChange={(status) => onChange(status, undefined, undefined)} />
         </div>
         <p className="hidden print:block"><b>Status:</b> {item.status}</p>
        <div className="no-print">
            <input
                type="text"
                placeholder="Observações..."
                value={item.observation}
                onChange={(e) => onChange(undefined, e.target.value, undefined)}
                className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
        <p className="hidden print:block"><b>Observação:</b> {item.observation || 'N/A'}</p>
        <ImageUploader />
         <div className="mt-2 no-print">
            <button
              type="button"
              onClick={onDelete}
              className="text-red-500 hover:text-red-700 font-semibold text-xs py-1 px-2 rounded-md transition flex items-center gap-1"
              aria-label={`Excluir item ${item.id}`}
            >
              <DeleteIcon /> Excluir Item
            </button>
         </div>
      </div>

      {/* Desktop view */}
      <div className="hidden sm:flex col-span-2 justify-center items-center space-x-2">
        <div className="no-print flex space-x-2">
          <StatusButton label="OK" value="OK" currentStatus={item.status} itemID={item.id} onChange={(status) => onChange(status, undefined, undefined)} />
          <StatusButton label="Não OK" value="Not OK" currentStatus={item.status} itemID={item.id} onChange={(status) => onChange(status, undefined, undefined)} />
        </div>
        <p className="hidden print:block">{item.status}</p>
      </div>
      <div className="hidden sm:block col-span-3">
        <div className="no-print">
            <input
            type="text"
            placeholder="Observações..."
            value={item.observation}
            onChange={(e) => onChange(undefined, e.target.value, undefined)}
            className="w-full p-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
        <p className="hidden print:block text-sm">{item.observation || 'N/A'}</p>
      </div>
       <div className="hidden sm:block col-span-2">
        <ImageUploader />
      </div>
      <div className="hidden sm:flex col-span-1 justify-center items-center">
        <button
            type="button"
            onClick={onDelete}
            className="text-gray-400 hover:text-red-600 transition-colors no-print"
            aria-label={`Excluir item ${item.id}`}
        >
            <DeleteIcon />
        </button>
      </div>
    </div>
  );
};

export default ChecklistItemRow;