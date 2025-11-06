import type { ChecklistSectionData } from './types';

export const CHECKLIST_DATA: ChecklistSectionData[] = [
  {
    id: 1,
    title: '1. Documentação Técnica (Technical Documentation)',
    items: [
      { id: '1.1', description: 'Projeto elétrico atualizado e aprovado', status: 'Pending', observation: '', image: null },
      { id: '1.2', description: 'ART/RRT do responsável técnico emitida', status: 'Pending', observation: '', image: null },
      { id: '1.3', description: 'Diagramas unifilares disponíveis e identificados', status: 'Pending', observation: '', image: null },
      { id: '1.4', description: 'Memorial descritivo da instalação disponível', status: 'Pending', observation: '', image: null },
      { id: '1.5', description: 'Ensaios e medições registrados (isolação, aterramento, continuidade)', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 2,
    title: '2. Proteções Elétricas (Electrical Protections)',
    items: [
      { id: '2.1', description: 'Disjuntores dimensionados corretamente', status: 'Pending', observation: '', image: null },
      { id: '2.2', description: 'DRs instalados e testados', status: 'Pending', observation: '', image: null },
      { id: '2.3', description: 'DPSs instalados', status: 'Pending', observation: '', image: null },
      { id: '2.4', description: 'Fusíveis ou relés de proteção corretamente especificados', status: 'Pending', observation: '', image: null },
      { id: '2.5', description: 'Quadros elétricos com tampas e etiquetas legíveis', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 3,
    title: '3. Condutores e Cabos (Conductors and Cables)',
    items: [
      { id: '3.1', description: 'Seções dos condutores conforme projeto', status: 'Pending', observation: '', image: null },
      { id: '3.2', description: 'Isolação sem danos ou emendas irregulares', status: 'Pending', observation: '', image: null },
      { id: '3.3', description: 'Fase, neutro e terra corretamente identificados', status: 'Pending', observation: '', image: null },
      { id: '3.4', description: 'Organização e fixação dos cabos adequada', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 4,
    title: '4. Aterramento e Equipotencialização (Grounding and Equipotentialization)',
    items: [
      { id: '4.1', description: 'Sistema de aterramento instalado e testado', status: 'Pending', observation: '', image: null },
      { id: '4.2', description: 'Valor da resistência de aterramento dentro do limite', status: 'Pending', observation: '', image: null },
      { id: '4.3', description: 'Barramento de equipotencialização presente e identificado', status: 'Pending', observation: '', image: null },
      { id: '4.4', description: 'Conexões de aterramento firmes e sem corrosão', status: 'Pending', observation: '', image: null },
      { id: '4.5', description: 'Quadro de distribuição aterrado', status: 'Pending', observation: '', image: null },
      { id: '4.6', description: 'Quadro de QTA aterrado', status: 'Pending', observation: '', image: null },
      { id: '4.7', description: 'Quadro mamografo aterrado', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 5,
    title: '5. Iluminação e Tomadas (Lighting and Sockets)',
    items: [
      { id: '5.1', description: 'Luminárias fixadas e sem mau contato', status: 'Pending', observation: '', image: null },
      { id: '5.2', description: 'Tomadas com borne de terra funcional', status: 'Pending', observation: '', image: null },
      { id: '5.3', description: 'Circuitos de iluminação e tomadas separados', status: 'Pending', observation: '', image: null },
      { id: '5.4', description: 'Tomadas identificadas com a tensão nominal', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 6,
    title: '6. Segurança e Sinalização (Safety and Signaling)',
    items: [
      { id: '6.1', description: 'Placas de advertência e identificação visíveis', status: 'Pending', observation: '', image: null },
      { id: '6.2', description: 'Acesso aos quadros elétricos livre e desobstruído', status: 'Pending', observation: '', image: null },
      { id: '6.3', description: 'Extintores de classe C próximos e sinalizados', status: 'Pending', observation: '', image: null },
      { id: '6.4', description: 'EPIs utilizados durante a vistoria/intervenção', status: 'Pending', observation: '', image: null },
    ],
  },
  {
    id: 7,
    title: '7. Testes Funcionais (Functional Tests)',
    items: [
      { id: '7.1', description: 'Teste de tensão em circuitos e tomadas', status: 'Pending', observation: '', image: null },
      { id: '7.2', description: 'Teste de funcionamento de iluminação', status: 'Pending', observation: '', image: null },
      { id: '7.3', description: 'Teste de disparo dos dispositivos DR', status: 'Pending', observation: '', image: null },
      { id: '7.4', description: 'Verificação de sobreaquecimento ou ruídos anormais', status: 'Pending', observation: '', image: null },
      { id: '7.5', description: 'Teste de fuga de corrente externa', status: 'Pending', observation: '', image: null },
    ],
  },
];
