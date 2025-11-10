
import React from 'react';
import type { HeaderData } from '../types';

interface HeaderProps {
  data: HeaderData;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<{ label: string; name: string; value: string; onChange: (e: React.ChangeEvent<HTMLInputElement>) => void; className?: string }> = ({ label, name, value, onChange, className = '' }) => (
  <div className={`flex flex-col sm:flex-row sm:items-center ${className}`}>
    <label htmlFor={name} className="font-semibold text-gray-700 sm:w-1/3 mb-1 sm:mb-0">{label}:</label>
    <input
      type="text"
      id={name}
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
    />
  </div>
);

const Header: React.FC<HeaderProps> = ({ data, onChange }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 text-sm">
      <InputField label="Local da instalação" name="installationLocation" value={data.installationLocation} onChange={onChange} />
      <InputField label="Projeto" name="project" value={data.project} onChange={onChange} />
      <InputField label="Responsável técnico" name="technicalManager" value={data.technicalManager} onChange={onChange} />
      <InputField label="Data da vistoria" name="inspectionDate" value={data.inspectionDate} onChange={onChange} />
      <InputField label="Executor da vistoria" name="inspector" value={data.inspector} onChange={onChange} className="sm:col-span-2 lg:col-span-3" />
    </div>
  );
};

export default Header;
