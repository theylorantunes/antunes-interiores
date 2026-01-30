document.addEventListener('DOMContentLoaded', () => {

    // --- LÓGICA DO MENU MOBILE ---
    const mobileBtn = document.getElementById('mobile-menu-btn');
    const closeBtn = document.getElementById('close-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    function toggleMenu() {
        mobileMenu.classList.toggle('translate-x-full');
        document.body.classList.toggle('overflow-hidden');
    }

    if (mobileBtn && closeBtn && mobileMenu) {
        mobileBtn.addEventListener('click', toggleMenu);
        closeBtn.addEventListener('click', toggleMenu);
        mobileLinks.forEach(link => {
            link.addEventListener('click', toggleMenu);
        });
    }

    // --- LÓGICA DO FORMULÁRIO E MODAL ---
    const btnOpenForm = document.getElementById('btn-open-form');
    const infoBlock = document.getElementById('contact-info');
    const formBlock = document.getElementById('contact-form');

    const successModal = document.getElementById('success-modal');
    const modalContent = document.getElementById('modal-content');
    const modalOverlay = document.getElementById('modal-overlay');
    const closeModalBtn = document.getElementById('close-modal-btn');

    function showModal() {
        successModal.classList.remove('hidden');
        setTimeout(() => {
            modalOverlay.classList.remove('opacity-0');
            modalContent.classList.remove('opacity-0', 'scale-90');
            modalContent.classList.add('scale-100');
        }, 10);
    }

    function hideModal() {
        modalOverlay.classList.add('opacity-0');
        modalContent.classList.add('opacity-0', 'scale-90');
        modalContent.classList.remove('scale-100');
        setTimeout(() => {
            successModal.classList.add('hidden');
        }, 300);
    }

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', hideModal);
        modalOverlay.addEventListener('click', hideModal);
    }

    if (btnOpenForm && infoBlock && formBlock) {
        btnOpenForm.addEventListener('click', (e) => {
            e.preventDefault();
            infoBlock.classList.remove('opacity-100');
            infoBlock.classList.add('opacity-0');
            setTimeout(() => {
                infoBlock.classList.add('hidden');
                formBlock.classList.remove('hidden');
                setTimeout(() => {
                    formBlock.classList.remove('opacity-0');
                    formBlock.classList.add('opacity-100');
                    formBlock.classList.remove('translate-x-20');
                    formBlock.classList.add('translate-x-0');
                }, 50);
            }, 500);
        });

        const phoneInput = formBlock.querySelector('input[type="tel"]');
        if (phoneInput) {
            phoneInput.addEventListener('input', (e) => {
                let value = e.target.value.replace(/\D/g, '');
                if (value.length > 11) value = value.slice(0, 11);
                if (value.length > 10) {
                    value = value.replace(/^(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
                } else if (value.length > 6) {
                    value = value.replace(/^(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
                } else if (value.length > 2) {
                    value = value.replace(/^(\d{2})(\d{0,5})/, '($1) $2');
                } else {
                    value = value.replace(/^(\d*)/, '($1');
                }
                e.target.value = value;
            });
        }

        formBlock.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;
            const nameInput = formBlock.querySelector('input[type="text"]');
            const emailInput = formBlock.querySelector('input[type="email"]');

            const setError = (input, hasError) => {
                if (hasError) {
                    input.classList.add('border-red-500', 'placeholder-red-400');
                    input.classList.remove('border-gray-300');
                    isValid = false;
                } else {
                    input.classList.remove('border-red-500', 'placeholder-red-400');
                    input.classList.add('border-gray-300');
                }
            };

            setError(nameInput, nameInput.value.trim() === '');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            setError(emailInput, !emailRegex.test(emailInput.value.trim()));

            if (isValid) {
                showModal();
                formBlock.reset();
            }
        });
    }

    if (document.querySelector('.mySwiper')) {
        const swiper = new Swiper(".mySwiper", {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
                dynamicBullets: true,
            },
            navigation: {
                nextEl: ".custom-next",
                prevEl: ".custom-prev",
            },
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            breakpoints: {
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            }
        });
    }

    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = document.getElementById('theme-icon');
    const mobileThemeToggleBtn = document.getElementById('theme-toggle-mobile');
    const mobileThemeIcon = document.getElementById('theme-icon-mobile');

    function updateIcons(isDark) {
        const iconClassToRemove = isDark ? 'fa-moon' : 'fa-sun';
        const iconClassToAdd = isDark ? 'fa-sun' : 'fa-moon';
        if (themeIcon) {
            themeIcon.classList.remove(iconClassToRemove);
            themeIcon.classList.add(iconClassToAdd);
        }
        if (mobileThemeIcon) {
            mobileThemeIcon.classList.remove(iconClassToRemove);
            mobileThemeIcon.classList.add(iconClassToAdd);
        }
    }

    function toggleTheme() {
        document.documentElement.classList.toggle('dark');
        const isDark = document.documentElement.classList.contains('dark');
        updateIcons(isDark);
        localStorage.theme = isDark ? 'dark' : 'light';
    }

    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
        updateIcons(true);
    } else {
        document.documentElement.classList.remove('dark');
        updateIcons(false);
    }

    if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
    if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);


    
    
    const chatWindow = document.getElementById('chat-window');
    const openChatBtn = document.getElementById('open-chat-btn');
    const closeChatBtn = document.getElementById('close-chat-btn');
    const sendBtn = document.getElementById('send-btn');
    const chatInput = document.getElementById('chat-input');
    const messagesArea = document.getElementById('chat-messages');

    let isChatOpen = false;

    const API_URL = '/api/chat';

    let conversationHistory = [
        {
            role: "system",
            content: `Você é o assistente virtual oficial da **Antunes Interiores**.
            
            ## Sua Personalidade
            - Sofisticado, elegante e acolhedor.
            - Especialista em Design de Interiores, Projetos Executivos e Obras.
            - Responde sempre em **Português do Brasil**.
            - Use formatação Markdown (negrito, listas) para facilitar a leitura.
            
            ## Seus Objetivos
            1. Tirar dúvidas sobre estilos de decoração e serviços da Antunes.
            2. Encantar o cliente.
            3. Sugerir sutilmente que o cliente agende uma reunião ou chame no WhatsApp para um orçamento detalhado.
            
            Se o cliente perguntar preços exatos, diga que depende da metragem e complexidade, e convide para o WhatsApp.`
        }
    ];


    function toggleChat() {
        isChatOpen = !isChatOpen;
        if (isChatOpen) {
            chatWindow.classList.remove('hidden');
            
            chatWindow.classList.add('flex'); 
            
            messagesArea.classList.add('flex-1', 'overflow-y-auto', 'min-h-0');
            // -------------------------------------

            setTimeout(() => {
                chatWindow.classList.remove('scale-95', 'opacity-0');
                chatWindow.classList.add('scale-100', 'opacity-100');
            }, 10);

            if (messagesArea.children.length === 0) {
                setTimeout(() => {
                    addMessage("Olá! Bem-vindo à Antunes Interiores. ✨", 'bot');
                    setTimeout(() => addMessage("Sou sua inteligência de design. Como posso transformar seu ambiente hoje?", 'bot'), 800);
                }, 500);
            }
        } else {
            chatWindow.classList.add('scale-95', 'opacity-0');
            chatWindow.classList.remove('scale-100', 'opacity-100');
            setTimeout(() => {
                chatWindow.classList.add('hidden');
                chatWindow.classList.remove('flex');
            }, 300);
        }
    }

    function addMessage(text, sender, isLoading = false) {
        const div = document.createElement('div');
        const isUser = sender === 'user';
        
        if (isLoading) div.id = 'loading-indicator';

        div.className = `flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 animate-fade-in shrink-0`;

        let contentHtml = text;
        if (isLoading) {
            contentHtml = `<div class="flex items-center gap-2 text-xs text-gray-500">
                             <i class="fas fa-circle-notch fa-spin"></i>
                             <span>Antunes está pensando...</span>
                           </div>`;
        } else if (!isUser && window.marked) {
            contentHtml = window.marked.parse(text);
        }

        const bubbleStyle = isUser 
            ? 'bg-[#A68A64] text-white rounded-br-none shadow-md' 
            : 'bg-gray-100 dark:bg-[#2c2c2c] text-gray-700 dark:text-gray-200 rounded-bl-none border border-gray-200 dark:border-gray-700 shadow-sm';

        div.innerHTML = `
            <div class="max-w-[85%] px-4 py-3 rounded-2xl text-sm leading-relaxed ${bubbleStyle} prose-sm prose-p:my-1 prose-ul:my-1 break-words break-all overflow-hidden min-w-0">
                ${contentHtml}
            </div>
        `;

        messagesArea.appendChild(div);

        setTimeout(() => {
            div.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 100);
    }


    async function fetchAzureBot(messages) {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ messages: messages }),
            });

            if (!response.ok) {
                console.error('Erro API interna:', response.status);
                throw new Error('Falha na comunicação com o servidor');
            }

            const data = await response.json();
            return data.choices?.[0]?.message?.content || 'Desculpe, não consegui formular uma resposta.';
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async function handleSend() {
        const text = chatInput.value.trim();
        if (!text) return;

        addMessage(text, 'user');
        chatInput.value = '';
        chatInput.focus();

      
        conversationHistory.push({ role: "user", content: text });

        
        addMessage("", 'bot', true);

        try {
            
            const botText = await fetchAzureBot(conversationHistory);

            
            const loadingDiv = document.getElementById('loading-indicator');
            if (loadingDiv) loadingDiv.remove();

            addMessage(botText, 'bot');
            conversationHistory.push({ role: "assistant", content: botText });

        } catch (error) {
            
            const loadingDiv = document.getElementById('loading-indicator');
            if (loadingDiv) loadingDiv.remove();
            
            addMessage("Tive um problema de conexão. Que tal continuarmos no WhatsApp?", 'bot');
            
            const btnDiv = document.createElement('div');
            btnDiv.className = "flex justify-start mb-4";
            btnDiv.innerHTML = `
                <a href="https://wa.me/5511999999999" target="_blank" class="px-4 py-2 bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold uppercase rounded-full shadow-md transition-transform hover:scale-105 flex items-center gap-2">
                    <i class="fab fa-whatsapp text-lg"></i> Falar no WhatsApp
                </a>
            `;
            messagesArea.appendChild(btnDiv);
            messagesArea.scrollTop = messagesArea.scrollHeight;
        }
    }

    // Listeners
    if (openChatBtn && closeChatBtn) {
        openChatBtn.addEventListener('click', toggleChat);
        closeChatBtn.addEventListener('click', toggleChat);

        sendBtn.addEventListener('click', handleSend);
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSend();
        });
    }
});