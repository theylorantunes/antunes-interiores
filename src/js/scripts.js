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
    // --- SWIPER ---

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
                    spaceBetween: 40,
                }
            }
        });
    }

    // --- DARK MODE (mobile e desk)---

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


    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', toggleTheme);
    }
    if (mobileThemeToggleBtn) {
        mobileThemeToggleBtn.addEventListener('click', toggleTheme);
    }
});

