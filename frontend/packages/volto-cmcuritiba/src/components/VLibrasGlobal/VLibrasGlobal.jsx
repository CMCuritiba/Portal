import React, { useEffect, useState } from 'react';
import './VLibrasGlobal.css';

const VLibrasGlobal = () => {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // Marca que estamos no cliente
        setIsClient(true);
        
        console.log('🤟 VLibras: Iniciando componente');

        // Cria um botão VLibras funcional imediatamente
        const createVLibrasButton = () => {
            // Remove qualquer botão existente primeiro
            const existing = document.getElementById('vlibras-accessibility-button');
            if (existing) { 
                existing.remove();
            }

            const vlibrasButton = document.createElement('div');
            vlibrasButton.id = 'vlibras-accessibility-button';
            vlibrasButton.setAttribute('role', 'button');
            vlibrasButton.setAttribute('tabindex', '0');
            vlibrasButton.setAttribute('aria-label', 'Ativar tradução para Libras');
            vlibrasButton.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 999999 !important;
                width: 60px !important;
                height: 60px !important;
                background-color: #1351b4 !important;
                border-radius: 50% !important;
                cursor: pointer !important;
                box-shadow: 0 4px 12px rgba(19, 81, 180, 0.4) !important;
                display: flex !important;
                align-items: center !important;
                justify-content: center !important;
                color: white !important;
                font-size: 24px !important;
                font-family: Arial, sans-serif !important;
                user-select: none !important;
                transition: all 0.3s ease !important;
                border: 2px solid transparent !important;
            `;
            vlibrasButton.innerHTML = '🤟';
            vlibrasButton.title = 'VLibras - Tradução para Libras';
            
            // Efeitos visuais para acessibilidade
            vlibrasButton.addEventListener('mouseenter', () => {
                vlibrasButton.style.transform = 'scale(1.1)';
                vlibrasButton.style.boxShadow = '0 6px 16px rgba(19, 81, 180, 0.6)';
            });
            
            vlibrasButton.addEventListener('mouseleave', () => {
                vlibrasButton.style.transform = 'scale(1)';
                vlibrasButton.style.boxShadow = '0 4px 12px rgba(19, 81, 180, 0.4)';
            });

            vlibrasButton.addEventListener('focus', () => {
                vlibrasButton.style.borderColor = '#ffff00';
                vlibrasButton.style.outline = '2px solid #ffff00';
                vlibrasButton.style.outlineOffset = '2px';
            });

            vlibrasButton.addEventListener('blur', () => {
                vlibrasButton.style.borderColor = 'transparent';
                vlibrasButton.style.outline = 'none';
            });
            
            // Função de clique/ativação
            const activateVLibras = () => {
                console.log('🤟 VLibras ativado');
                
                // Verifica se o VLibras oficial está carregado
                if (window.VLibras && window.VLibras.Widget) {
                    const vlibrasWidget = document.querySelector('[vw]');
                    if (vlibrasWidget) {
                        vlibrasWidget.style.display = 'block';
                        // Esconde o botão customizado quando o oficial aparece
                        vlibrasButton.style.display = 'none';
                        
                        // Salva no localStorage que o usuário quer VLibras ativo
                        localStorage.setItem('accessibility-vlibras', 'true');
                        
                        // Dispara evento personalizado para o Header
                        window.dispatchEvent(new CustomEvent('vlibras-activated'));
                    }
                } else {
                    alert('VLibras está carregando... Aguarde alguns segundos e tente novamente.');
                }
            };

            // Eventos de clique e teclado
            vlibrasButton.addEventListener('click', activateVLibras);
            vlibrasButton.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activateVLibras();
                }
            });

            document.body.appendChild(vlibrasButton);
            console.log('🤟 VLibras: Botão criado e adicionado');
        };

        // Cria o botão imediatamente
        createVLibrasButton();

        // Carrega o VLibras oficial em paralelo
        const loadOfficialVLibras = () => {
            // Verifica se já existe
            if (document.querySelector('[vw]')) {
                console.log('🤟 VLibras: Container oficial já existe');
                return;
            }

            // Cria estrutura conforme documentação oficial
            const vlibrasContainer = document.createElement('div');
            vlibrasContainer.setAttribute('vw', '');
            vlibrasContainer.className = 'enabled';
            vlibrasContainer.style.cssText = `
                position: fixed !important;
                bottom: 20px !important;
                right: 20px !important;
                z-index: 999998 !important;
                display: none !important;
            `;

            const accessButton = document.createElement('div');
            accessButton.setAttribute('vw-access-button', '');
            accessButton.className = 'active';

            const pluginWrapper = document.createElement('div');
            pluginWrapper.setAttribute('vw-plugin-wrapper', '');

            const topWrapper = document.createElement('div');
            topWrapper.className = 'vw-plugin-top-wrapper';

            pluginWrapper.appendChild(topWrapper);
            vlibrasContainer.appendChild(accessButton);
            vlibrasContainer.appendChild(pluginWrapper);

            document.body.appendChild(vlibrasContainer);
            console.log('🤟 VLibras: Container oficial criado');

            // Carrega script oficial se não existe
            if (!document.querySelector('script[src*="vlibras-plugin"]')) {
                console.log('🤟 VLibras: Carregando script oficial...');

                const script = document.createElement('script');
                script.src = 'https://vlibras.gov.br/app/vlibras-plugin.js';
                script.async = true;
                
                script.onload = () => {
                    console.log('🤟 VLibras: Script carregado, inicializando...');
                    
                    setTimeout(() => {
                        if (window.VLibras && !window.VLibras.initialized) {
                            try {
                                new window.VLibras.Widget('https://vlibras.gov.br/app');
                                window.VLibras.initialized = true;
                                console.log('🤟 VLibras: Widget oficial inicializado!');
                                
                                // Se o usuário já tinha ativado antes, mostra automaticamente
                                const wasEnabled = localStorage.getItem('accessibility-vlibras') === 'true';
                                if (wasEnabled) {
                                    vlibrasContainer.style.display = 'block';
                                    const customBtn = document.getElementById('vlibras-accessibility-button');
                                    if (customBtn) {
                                        customBtn.style.display = 'none';
                                    }
                                }
                            } catch (error) {
                                console.error('🤟 VLibras: Erro ao inicializar:', error);
                            }
                        }
                    }, 1000);
                };
                
                script.onerror = () => {
                    console.error('🤟 VLibras: Erro ao carregar script oficial');
                };
                
                document.head.appendChild(script);
            }
        };

        // Carrega VLibras oficial após 1 segundo
        setTimeout(loadOfficialVLibras, 1000);

        return () => {
            console.log('🤟 VLibras: Cleanup');
        };
    }, []);

    // Só renderiza no cliente para evitar erro de hidratação
    if (!isClient) {
        return null;
    }

    // Não renderiza nada visível no DOM React
    return null;
};

export default VLibrasGlobal; 