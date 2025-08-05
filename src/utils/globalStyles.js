// Global styling utilities for scrollbars and theme-related styles

export const criarBarraRolagemBonita = () => {
  if (typeof document !== 'undefined') {
    
    const estiloAntigo = document.getElementById('barras-bonitas-sistema');
    if (estiloAntigo) {
      estiloAntigo.remove();
    }
    
    const estilosCSS = `
      /* 🎯 BARRA DO MENU (mantém perfeita) */
      .menu-barra-bonita::-webkit-scrollbar {
        width: 6px;
      }
      
      .menu-barra-bonita::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
        border-radius: 3px;
        margin: 8px 0;
      }
      
      .menu-barra-bonita::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.25);
        border-radius: 3px;
        transition: all 0.2s ease;
      }
      
      .menu-barra-bonita::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      
      /* 🌟 SISTEMA - MUITO MAIS VISÍVEL */
      ::-webkit-scrollbar {
        width: 6px;
      }
      
      /* 🌞 MODO CLARO - OPACIDADE ALTA PARA SER VISÍVEL */
      ::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.08);  /* ✅ Track mais visível */
        border-radius: 3px;
        margin: 8px 0;
      }
      
      ::-webkit-scrollbar-thumb {
        background: rgba(0, 0, 0, 0.4);   /* ✅ 40% bem visível */
        border-radius: 3px;
        transition: all 0.2s ease;
      }
      
      ::-webkit-scrollbar-thumb:hover {
        background: rgba(0, 0, 0, 0.6);   /* ✅ 60% no hover */
      }
      
      /* 🌙 MODO ESCURO - Mantém perfeito */
      .dark ::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.08);
      }
      
      .dark ::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.25);
      }
      
      .dark ::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.4);
      }
      
      /* 🦊 FIREFOX - Opacidades altas */
      /* Modo claro - bem visível */
      html:not(.dark) * {
        scrollbar-width: thin;
        scrollbar-color: rgba(0, 0, 0, 0.4) rgba(0, 0, 0, 0.08);
      }
      
      /* Modo escuro - mantém perfeito */
      .dark * {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.08);
      }
      
      /* Menu no Firefox */
      .menu-barra-bonita {
        scrollbar-width: thin;
        scrollbar-color: rgba(255, 255, 255, 0.25) rgba(255, 255, 255, 0.08);
      }
    `;

    const novoEstilo = document.createElement("style");
    novoEstilo.type = "text/css";
    novoEstilo.id = "barras-bonitas-sistema";
    novoEstilo.innerText = estilosCSS;
    document.head.appendChild(novoEstilo);
  }
};

// Initialize styles when module is loaded
if (typeof window !== 'undefined') {
  criarBarraRolagemBonita();
}