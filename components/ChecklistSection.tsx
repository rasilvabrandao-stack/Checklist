import React from 'react';
import ChecklistItemRow from './ChecklistItemRow';
import type { ChecklistSectionData, ChecklistItemStatus } from '../types';

interface ChecklistSectionProps {
  section: ChecklistSectionData;
  onItemChange: (sectionId: number, itemId: string, newStatus?: ChecklistItemStatus, newObservation?: string, newImage?: string | null) => void;
  onAddItem: (sectionId: number) => void;
  onDeleteItem: (sectionId: number, itemId: string) => void;
  onDeleteSection: (sectionId: number) => void;
  onSaveNewItem: (sectionId: number, itemId: string, newDescription: string) => void;
  onCancelAddItem: (sectionId: number, itemId: string) => void;
}

const DeleteIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z" clipRule="evenodd" />
    </svg>
);


const ChecklistSection: React.FC<ChecklistSectionProps> = ({ section, onItemChange, onAddItem, onDeleteItem, onDeleteSection, onSaveNewItem, onCancelAddItem }) => {
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden print-section">
      <div className="bg-blue-600 text-white p-3 flex justify-between items-center">
        <h2 className="font-bold text-lg">{section.title}</h2>
        <button 
          onClick={() => onDeleteSection(section.id)} 
          className="text-white hover:text-red-300 transition-colors no-print"
          aria-label={`Excluir seção ${section.title}`}
        >
          <DeleteIcon />
        </button>
      </div>
      <div className="overflow-x-auto">
        <div className="min-w-full text-sm">
            {/* Header */}
            <div className="grid grid-cols-12 gap-2 bg-gray-100 p-2 font-semibold text-gray-600">
                <div className="col-span-1 text-center">Item</div>
                <div className="col-span-3">Verificação</div>
                <div className="col-span-2 text-center">Status</div>
                <div className="col-span-3">Observações</div>
                <div className="col-span-2 text-center">Imagem</div>
                <div className="col-span-1 text-center">Ações</div>
            </div>
            {/* Items */}
            <div className="divide-y divide-gray-200">
                {section.items.map((item) => (
                    <ChecklistItemRow
                      key={item.id}
                      item={item}
                      onChange={(newStatus, newObservation, newImage) => onItemChange(section.id, item.id, newStatus, newObservation, newImage)}
                      onDelete={() => onDeleteItem(section.id, item.id)}
                      onSave={(newDescription) => onSaveNewItem(section.id, item.id, newDescription)}
                      onCancel={() => onCancelAddItem(section.id, item.id)}
                    />
                ))}
            </div>
            <div className="p-2 text-center no-print">
              <button 
                onClick={() => onAddItem(section.id)}
                className="bg-blue-100 text-blue-800 text-xs font-semibold py-1 px-3 rounded-full hover:bg-blue-200 transition"
              >
                + Adicionar Item
              </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ChecklistSection;