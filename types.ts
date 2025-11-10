export type ChecklistItemStatus = 'OK' | 'Não OK' | 'Pendente';

export interface ChecklistItem {
  id: string;
  description: string;
  status: ChecklistItemStatus;
  observation: string;
  image: string | null;
  isNew?: boolean;
}

export interface ChecklistSectionData {
  id: number;
  title: string;
  items: ChecklistItem[];
}

export interface HeaderData {
  installationLocation: string;
  technicalManager: string;
  inspector: string;
  project: string;
  inspectionDate: string;
}

export interface Signature {
  name: string;
  date: string;
}

export interface SignatureData {
  installer: Signature;
  inspectorAssistant: Signature;
  electricalSupervisor: Signature;
}
