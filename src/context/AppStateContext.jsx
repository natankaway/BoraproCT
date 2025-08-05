import React, { createContext, useState, useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { mockData } from '../data/mockData';

export const AppStateContext = createContext();

// App State Provider
export const AppStateProvider = ({ children }) => {
  // Estados principais com localStorage
  const [alunos, setAlunos] = useLocalStorage('alunos', mockData.alunos);
  const [alugueis, setAlugueis] = useLocalStorage('alugueis-ct', []); // NOVO ESTADO
  const [professores, setProfessores] = useLocalStorage('professores', mockData.professores);
  const [gestores, setGestores] = useLocalStorage('gestores', mockData.gestores); // 🆕 NOVO ESTADO
  const [financeiro, setFinanceiro] = useLocalStorage('financeiro', mockData.financeiro);
  const [treinos, setTreinos] = useLocalStorage('treinos', mockData.treinos);
  const [unidades, setUnidades] = useLocalStorage('unidades', mockData.unidades);
  const [planos, setPlanos] = useLocalStorage('planos', mockData.planos);
  const [produtos, setProdutos] = useLocalStorage('produtos', mockData.produtos);
  const [plataformas, setPlataformas] = useLocalStorage('plataformas', mockData.plataformas);
  const [presencas, setPresencas] = useLocalStorage('presencas', mockData.presencas);
  const [horariosConfiguracao, setHorariosConfiguracao] = useLocalStorage('horariosConfiguracao', mockData.horariosConfiguracao);

  // Estados de sessão
  const [userLogado, setUserLogado] = useState(null);
  const [tipoUsuario, setTipoUsuario] = useState('admin');
  const [activeTab, setActiveTab] = useState('dashboard');
  const [cart, setCart] = useState([]);

  const value = useMemo(() => ({
    alunos, setAlunos,
    professores, setProfessores,
    gestores, setGestores, // 🆕 NOVO ESTADO
    financeiro, setFinanceiro,
    treinos, setTreinos,
    unidades, setUnidades,
    planos, setPlanos,
    produtos, setProdutos,
    plataformas, setPlataformas,
    presencas, setPresencas,
    horariosConfiguracao, setHorariosConfiguracao,
    userLogado, setUserLogado,
    tipoUsuario, setTipoUsuario,
    activeTab, setActiveTab,
    alugueis, setAlugueis, 
    cart, setCart
  }), [
    alunos, setAlunos,
    professores, setProfessores,
    gestores, setGestores, // 🆕 NOVO ESTADO
    financeiro, setFinanceiro,
    treinos, setTreinos,
    unidades, setUnidades,
    planos, setPlanos,
    produtos, setProdutos,
    plataformas, setPlataformas,
    presencas, setPresencas,
    horariosConfiguracao, setHorariosConfiguracao,
    userLogado, setUserLogado,
    tipoUsuario, setTipoUsuario,
    activeTab, setActiveTab,
    alugueis, setAlugueis, 
    cart, setCart
  ]);

  return (
    <AppStateContext.Provider value={value}>
      {children}
    </AppStateContext.Provider>
  );
};