import { useState, useEffect, useCallback, useMemo } from 'react';

// Hook para filtros avançados
export const useAdvancedFilter = (data, filters) => {
  return useMemo(() => {
    if (!data || !Array.isArray(data)) return [];
    
    return data.filter(item => {
      // Filtro por texto (nome/email)
      if (filters.nome && !item.nome.toLowerCase().includes(filters.nome.toLowerCase()) && 
          !item.email.toLowerCase().includes(filters.nome.toLowerCase())) {
        return false;
      }

      // Filtro por status
      if (filters.status && item.status !== filters.status) {
        return false;
      }

      // Filtro por tipo de plano
      if (filters.tipoPlano && item.tipoPlano !== filters.tipoPlano) {
        return false;
      }

      // Filtro por unidade
      if (filters.unidade && item.unidade !== filters.unidade) {
        return false;
      }

      // Filtro por nível
      if (filters.nivel && item.nivel !== filters.nivel) {
        return false;
      }

      // 🆕 Filtro por situação de vencimento
      if (filters.vencimento) {
        const hoje = new Date();
        
        if (filters.vencimento === 'vencido') {
          if (item.tipoPlano === 'plataforma') return false;
          const vencimento = new Date(item.vencimento);
          if (vencimento >= hoje) return false;
        }
        
        if (filters.vencimento === 'vencendo') {
          if (item.tipoPlano === 'plataforma') return false;
          const vencimento = new Date(item.vencimento);
          const diffDias = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
          if (diffDias > 7 || diffDias < 0) return false;
        }
        
        if (filters.vencimento === 'ok') {
          if (item.tipoPlano === 'plataforma') return false;
          const vencimento = new Date(item.vencimento);
          const diffDias = Math.ceil((vencimento - hoje) / (1000 * 60 * 60 * 24));
          if (diffDias <= 7) return false;
        }
        
        if (filters.vencimento === 'sem-vencimento') {
          if (item.tipoPlano !== 'plataforma') return false;
        }
      }

      return true;
    });
  }, [data, filters]);
};

// Hook para busca com debounce
export const useDebouncedSearch = (searchTerm, delay = 300) => {
  const [debouncedTerm, setDebouncedTerm] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchTerm, delay]);

  return debouncedTerm;
};

// Hook para paginação
export const usePagination = (data, itemsPerPage = 10) => {
  const [currentPage, setCurrentPage] = useState(1);
  
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  
  const goToPage = useCallback((page) => {
    setCurrentPage(Math.max(1, Math.min(page, totalPages)));
  }, [totalPages]);
  
  const nextPage = useCallback(() => {
    goToPage(currentPage + 1);
  }, [currentPage, goToPage]);
  
  const prevPage = useCallback(() => {
    goToPage(currentPage - 1);
  }, [currentPage, goToPage]);

  return {
    currentData,
    currentPage,
    totalPages,
    goToPage,
    nextPage,
    prevPage,
    hasNext: currentPage < totalPages,
    hasPrev: currentPage > 1
  };
};