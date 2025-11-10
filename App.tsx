import React, { useState } from 'react';
import Header from './components/Header';
import ChecklistSection from './components/ChecklistSection';
import SignatureSection from './components/SignatureSection';
import { CHECKLIST_DATA } from './constants';
import type { HeaderData, ChecklistSectionData, SignatureData, ChecklistItemStatus, ChecklistItem } from './types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onConfirm, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" aria-modal="true" role="dialog">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md m-4">
        <h3 className="text-lg font-bold text-gray-800">{title}</h3>
        <div className="mt-2 text-sm text-gray-600">
          {children}
        </div>
        <div className="mt-6 flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
};


const App: React.FC = () => {
  const [headerData, setHeaderData] = useState<HeaderData>({
    installationLocation: '',
    technicalManager: '',
    inspector: '',
    project: '',
    inspectionDate: '',
  });

  const [checklistData, setChecklistData] = useState<ChecklistSectionData[]>(CHECKLIST_DATA);
  
  const [signatureData, setSignatureData] = useState<SignatureData>({
    installer: { name: '', date: '' },
    inspectorAssistant: { name: '', date: '' },
    electricalSupervisor: { name: '', date: '' },
  });

  const [isAddingSection, setIsAddingSection] = useState(false);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    message: string;
    onConfirm: (() => void) | null;
  }>({
    isOpen: false,
    message: '',
    onConfirm: null,
  });


  const handleHeaderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setHeaderData(prev => ({ ...prev, [name]: value }));
  };

  const handleSignatureChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const [person, field] = name.split('.');
    setSignatureData(prev => ({
      ...prev,
      [person]: { ...prev[person as keyof SignatureData], [field]: value },
    }));
  };

  const handleItemChange = (sectionId: number, itemId: string, newStatus?: ChecklistItemStatus, newObservation?: string, newImage?: string | null) => {
    setChecklistData(prevData =>
      prevData.map(section =>
        section.id === sectionId
          ? {
              ...section,
              items: section.items.map(item =>
                item.id === itemId
                  ? {
                      ...item,
                      status: newStatus !== undefined ? newStatus : item.status,
                      observation: newObservation !== undefined ? newObservation : item.observation,
                      image: newImage !== undefined ? newImage : item.image,
                    }
                  : item
              ),
            }
          : section
      )
    );
  };

  const handleAddSection = () => {
    if (newSectionTitle.trim() !== '') {
      const newSectionId = checklistData.length > 0 ? Math.max(...checklistData.map(s => s.id)) + 1 : 1;
      const newSection: ChecklistSectionData = {
        id: newSectionId,
        title: newSectionTitle.trim(),
        items: [],
      };
      setChecklistData(prevData => [...prevData, newSection]);
      setNewSectionTitle('');
      setIsAddingSection(false);
    }
  };

  const handleDeleteSection = (sectionId: number) => {
    setModalState({
        isOpen: true,
        message: "Tem certeza que deseja excluir esta seção e todos os seus itens? Esta ação não pode ser desfeita.",
        onConfirm: () => {
            setChecklistData(prevData => prevData.filter(section => section.id !== sectionId));
            closeModal();
        }
    });
  };

  const handleAddItem = (sectionId: number) => {
    const sectionHasNewItem = checklistData.find(s => s.id === sectionId)?.items.some(i => i.isNew);
    if (sectionHasNewItem) return;

    setChecklistData(prevData =>
        prevData.map(section => {
            if (section.id === sectionId) {
                const newItem: ChecklistItem = {
                    id: `new-${sectionId}-${Date.now()}`, // Temporary unique ID
                    description: '',
                    status: 'Pendente',
                    observation: '',
                    image: null,
                    isNew: true,
                };
                return { ...section, items: [...section.items, newItem] };
            }
            return section;
        })
    );
  };
  
  const handleSaveNewItem = (sectionId: number, itemId: string, newDescription: string) => {
    if (newDescription.trim() === '') {
        handleCancelAddItem(sectionId, itemId);
        return;
    }
    setChecklistData(prevData =>
        prevData.map(section => {
            if (section.id === sectionId) {
                const numbers = section.items
                    .filter(i => !i.isNew)
                    .map(i => {
                        const parts = i.id.split('.');
                        return parts.length > 1 ? parseInt(parts[1], 10) : 0;
                    });
                const newIdNumber = (numbers.length > 0 ? Math.max(...numbers.filter(n => !isNaN(n))) : 0) + 1;
                const finalNewId = `${sectionId}.${newIdNumber}`;

                const updatedItems = section.items.map(item =>
                    item.id === itemId
                        ? { ...item, id: finalNewId, description: newDescription.trim(), isNew: false }
                        : item
                );
                return { ...section, items: updatedItems };
            }
            return section;
        })
    );
  };

  const handleCancelAddItem = (sectionId: number, itemId: string) => {
      setChecklistData(prevData =>
          prevData.map(section =>
              section.id === sectionId
                  ? { ...section, items: section.items.filter(item => item.id !== itemId) }
                  : section
          )
      );
  };


  const handleDeleteItem = (sectionId: number, itemId: string) => {
    setModalState({
        isOpen: true,
        message: "Tem certeza que deseja excluir este item?",
        onConfirm: () => {
            setChecklistData(prevData =>
                prevData.map(section =>
                    section.id === sectionId
                        ? { ...section, items: section.items.filter(item => item.id !== itemId) }
                        : section
                )
            );
            closeModal();
        }
    });
  };

  const closeModal = () => {
    setModalState({ isOpen: false, message: '', onConfirm: null });
  };


  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <Modal
        isOpen={modalState.isOpen}
        onClose={closeModal}
        onConfirm={modalState.onConfirm!}
        title="Confirmação de Exclusão"
      >
          <p>{modalState.message}</p>
      </Modal>
      <div className="min-h-screen bg-gray-100 p-4 sm:p-6 lg:p-8 font-sans">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl p-6 sm:p-8 printable-area">
          <div className="print-header">
            <div className="text-center border-b-2 border-blue-600 pb-4 mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">CHECK-LIST DE LIBERAÇÃO DE INSTALAÇÕES ELÉTRICAS</h1>
            </div>
            <Header data={headerData} onChange={handleHeaderChange} />
          </div>

          <div className="space-y-8 mt-8">
            {checklistData.map(section => (
              <ChecklistSection
                key={section.id}
                section={section}
                onItemChange={handleItemChange}
                onAddItem={handleAddItem}
                onDeleteItem={handleDeleteItem}
                onDeleteSection={handleDeleteSection}
                onSaveNewItem={handleSaveNewItem}
                onCancelAddItem={handleCancelAddItem}
              />
            ))}
          </div>
          
          <div className="mt-8 no-print">
            {!isAddingSection ? (
              <div className="text-center">
                <button
                    onClick={() => setIsAddingSection(true)}
                    className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
                >
                    Adicionar Nova Seção
                </button>
              </div>
            ) : (
                <div className="p-4 border border-gray-300 rounded-lg bg-gray-50 flex flex-col sm:flex-row items-center gap-4">
                    <input
                        type="text"
                        value={newSectionTitle}
                        onChange={(e) => setNewSectionTitle(e.target.value)}
                        placeholder="Título da nova seção"
                        className="w-full sm:flex-grow p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                        autoFocus
                        onKeyDown={(e) => e.key === 'Enter' && handleAddSection()}
                    />
                    <div className="flex gap-2">
                      <button onClick={handleAddSection} className="bg-blue-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-blue-700">Salvar</button>
                      <button onClick={() => { setIsAddingSection(false); setNewSectionTitle(''); }} className="bg-gray-400 text-white font-bold py-2 px-4 rounded-lg hover:bg-gray-500">Cancelar</button>
                    </div>
                </div>
            )}
          </div>

          <div className="print-signatures">
            <SignatureSection data={signatureData} onChange={handleSignatureChange} />
          </div>
        </div>
        <div className="max-w-4xl mx-auto mt-6 text-center no-print">
          <button
            onClick={handlePrint}
            className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-transform transform hover:scale-105"
          >
            Imprimir / Salvar como PDF
          </button>
        </div>
        <style>{`
            @media print {
              body {
                background-color: #fff;
              }
              .no-print {
                display: none;
              }
              .printable-area {
                box-shadow: none;
                margin: 0;
                max-width: 100%;
                padding: 0;
                border: none;
              }
              .print-header, .print-section, .print-signatures, .checklist-item-row {
                page-break-inside: avoid;
              }
              h2 {
                page-break-after: avoid;
              }
              .print-image {
                  max-width: 150px;
                  max-height: 150px;
                  border: 1px solid #eee;
                  border-radius: 4px;
                  margin-top: 4px;
                  page-break-inside: avoid;
              }
            }
          `}</style>
      </div>
    </>
  );
};

export default App;