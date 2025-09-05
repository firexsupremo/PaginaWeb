// Navegación responsive
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Cerrar menú al hacer clic en un enlace
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        navToggle.classList.remove('active');
    });
});

// Sistema de pestañas para la comparación de eras
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');

tabButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remover clase active de todos los botones
        tabButtons.forEach(btn => btn.classList.remove('active'));
        // Añadir clase active al botón clickeado
        button.classList.add('active');
        
        // Ocultar todos los paneles
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Mostrar el panel correspondiente
        const tabId = button.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Animación de aparición al hacer scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, observerOptions);

// Observar elementos para animación
document.querySelectorAll('.feature-card, .era-card, .myth-reality').forEach(el => {
    observer.observe(el);
});

// Smooth scroll para enlaces de navegación
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Efecto de cambio de color en la navbar al hacer scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)';
    }
});

// Funcionalidad del carrusel de imágenes - ACTUALIZADO PARA 6 IMÁGENES
function initCarousel() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    const prevBtn = document.querySelector('.carousel-btn-prev');
    const nextBtn = document.querySelector('.carousel-btn-next');
    
    let currentSlide = 0;
    const slideCount = slides.length;
    
    // Función para actualizar el carrusel
    function updateCarousel() {
        // Ocultar todas las diapositivas
        slides.forEach(slide => {
            slide.classList.remove('active');
        });
        
        // Mostrar la diapositiva actual
        slides[currentSlide].classList.add('active');
        
        // Actualizar dots
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }
    
    // Navegación con botones
    nextBtn.addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    });
    
    prevBtn.addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateCarousel();
    });
    
    // Navegación con dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateCarousel();
        });
    });
    
    // Autoavance del carrusel
    let carouselInterval = setInterval(() => {
        currentSlide = (currentSlide + 1) % slideCount;
        updateCarousel();
    }, 5000);
    
    // Pausar el autoavance al interactuar con el carrusel
    const carouselContainer = document.querySelector('.carousel-container');
    carouselContainer.addEventListener('mouseenter', () => {
        clearInterval(carouselInterval);
    });
    
    carouselContainer.addEventListener('mouseleave', () => {
        carouselInterval = setInterval(() => {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        }, 5000);
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight') {
            currentSlide = (currentSlide + 1) % slideCount;
            updateCarousel();
        } else if (e.key === 'ArrowLeft') {
            currentSlide = (currentSlide - 1 + slideCount) % slideCount;
            updateCarousel();
        }
    });
    
    // Inicializar el carrusel
    updateCarousel();
}

// Inicializar cuando el documento esté cargado
document.addEventListener('DOMContentLoaded', () => {
    initCarousel();
});