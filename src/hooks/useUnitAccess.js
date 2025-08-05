import { useMemo } from 'react';
import { useAppState } from './useContext';

// 🆕 Hook para controle de acesso baseado em unidade
export const useUnitAccess = () => {
  const { userLogado, tipoUsuario } = useAppState();
  
  return useMemo(() => {
    // Admin tem acesso a todas as unidades
    if (tipoUsuario === 'admin') {
      return {
        hasFullAccess: true,
        allowedUnits: ['Centro', 'Zona Sul', 'Zona Norte', 'Barra'],
        currentUnit: null,
        isGestor: false
      };
    }
    
    // Gestor só tem acesso à sua unidade
    if (tipoUsuario === 'gestor' && userLogado?.unidadeResponsavel) {
      return {
        hasFullAccess: false,
        allowedUnits: [userLogado.unidadeResponsavel],
        currentUnit: userLogado.unidadeResponsavel,
        isGestor: true
      };
    }
    
    // Outros usuários (professor, aluno) têm acesso limitado
    return {
      hasFullAccess: false,
      allowedUnits: userLogado?.unidade ? [userLogado.unidade] : [],
      currentUnit: userLogado?.unidade || null,
      isGestor: false
    };
  }, [userLogado, tipoUsuario]);
};

// 🆕 Hook para filtrar dados por unidade automaticamente
export const useUnitFilteredData = (data, dataType = 'default') => {
  const { hasFullAccess, currentUnit } = useUnitAccess();
  
  return useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    // Admin vê todos os dados
    if (hasFullAccess) {
      return data;
    }
    
    // Gestor e outros veem apenas dados da sua unidade
    if (currentUnit) {
      return data.filter(item => {
        // Para diferentes tipos de dados, verificar o campo correto
        switch (dataType) {
          case 'alunos':
            return item.unidade === currentUnit;
          case 'professores':
            return item.unidade === currentUnit || !item.unidade; // Professores podem não ter unidade específica
          case 'planos':
            return item.unidade === currentUnit;
          case 'financeiro':
            return item.unidade === currentUnit || !item.unidade; // Transações podem ser gerais
          case 'presencas':
            // Para presenças, verificar se o aluno pertence à unidade
            return true; // Por enquanto, deixar passar - será refinado quando integrar com dados de alunos
          default:
            return item.unidade === currentUnit || !item.unidade;
        }
      });
    }
    
    return data;
  }, [data, hasFullAccess, currentUnit, dataType]);
};