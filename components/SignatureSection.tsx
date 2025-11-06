
import React from 'react';
import type { SignatureData } from '../types';

interface SignatureSectionProps {
  data: SignatureData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SignatureField: React.FC<{ title: string; personKey: keyof SignatureData; data: SignatureData; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; }> = ({ title, personKey, data, onChange }) => (
  <div className="flex-1 min-w-[200px]">
    <div className="text-center bg-blue-100 border border-blue-300 p-2 rounded-t-md font-semibold text-blue-800">{title}</div>
    <div className="border border-t-0 border-gray-300 p-3 rounded-b-md space-y-3">
        <div>
            <label htmlFor={`${personKey}.name`} className="text-xs text-gray-600">Nome:</label>
            <input
                type="text"
                id={`${personKey}.name`}
                name={`${personKey}.name`}
                value={data[personKey].name}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
        <div>
            <label htmlFor={`${personKey}.date`} className="text-xs text-gray-600">Data:</label>
            <input
                type="date"
                id={`${personKey}.date`}
                name={`${personKey}.date`}
                value={data[personKey].date}
                onChange={onChange}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
            />
        </div>
    </div>
  </div>
);


const SignatureSection: React.FC<SignatureSectionProps> = ({ data, onChange }) => {
  return (
    <div className="mt-10 pt-6 border-t-2 border-dashed border-gray-300">
      <h2 className="text-center bg-blue-600 text-white p-3 font-bold text-lg rounded-t-lg">ASSINATURAS (Signatures)</h2>
      <div className="flex flex-wrap gap-4 p-4 border border-t-0 border-gray-200 rounded-b-lg text-sm">
        <SignatureField title="Montador da Instalação" personKey="installer" data={data} onChange={onChange} />
        <SignatureField title="Acompanhante da Vistoria" personKey="inspectorAssistant" data={data} onChange={onChange} />
        <SignatureField title="Supervisor de Elétrica" personKey="electricalSupervisor" data={data} onChange={onChange} />
      </div>
    </div>
  );
};

export default SignatureSection;
