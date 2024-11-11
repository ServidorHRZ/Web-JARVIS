// Fecha de lanzamiento: 1 de diciembre de 2024
const countDownDate = new Date("Dec 1, 2024 00:00:00").getTime();

// Actualizar el contador cada segundo
const x = setInterval(function() {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    // Cálculos de tiempo para días, horas, minutos y segundos
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Mostrar el resultado en los elementos con id="days", "hours", "minutes" y "seconds"
    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;

    // Si la cuenta regresiva termina, mostrar un mensaje
    if (distance < 0) {
        clearInterval(x);
        document.getElementById("countdown").innerHTML = "¡Jarvis IA ya está disponible!";
    }
}, 1000);

document.addEventListener('DOMContentLoaded', function() {
    const progressBar = document.getElementById('beta-progress');
    const spotsCounter = document.getElementById('spots-counter');
    const totalSpots = 100;
    
    // AQUÍ DEFINES EL NÚMERO DE CUPOS DISPONIBLES
    let cuposDisponibles = 50; // Cambia este número para actualizar la barra
    
    function updateProgress() {
        // Asegurarse de que los cupos estén entre 0 y 100
        cuposDisponibles = Math.min(Math.max(cuposDisponibles, 0), totalSpots);
        
        // Calcular el porcentaje
        const percentage = (cuposDisponibles / totalSpots) * 100;
        
        // Actualizar el ancho de la barra
        progressBar.style.width = `${percentage}%`;
        
        // Actualizar el contador de texto
        spotsCounter.textContent = `${cuposDisponibles} cupos restantes`;

        // Actualizar el color según la cantidad de cupos
        progressBar.className = 'progress-bar';
        if (cuposDisponibles > 70) {
            progressBar.classList.add('progress-high');
        } else if (cuposDisponibles > 30) {
            progressBar.classList.add('progress-medium');
        } else {
            progressBar.classList.add('progress-low');
        }
    }

    // Función para cambiar el número de cupos
    window.cambiarCupos = function(nuevoCupos) {
        cuposDisponibles = nuevoCupos;
        updateProgress();
    }

    // Inicializar con 100 cupos
    updateProgress();

    // Cerrar el modal cuando se hace clic en la X
    document.querySelector('.close').addEventListener('click', function() {
        document.getElementById('modalPago').style.display = 'none';
        document.body.style.overflow = 'auto'; // Restaura el scroll del body
    });

    // Cerrar el modal cuando se hace clic fuera de él
    window.addEventListener('click', function(event) {
        const modal = document.getElementById('modalPago');
        if (event.target == modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto'; // Restaura el scroll del body
        }
    });

    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    const menuItems = document.querySelectorAll('nav ul li a');
    
    // Función para alternar el menú
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Bloquear/desbloquear el scroll del body
        if (navMenu.classList.contains('active')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
    
    // Event listener para el botón de menú
    menuToggle.addEventListener('click', toggleMenu);
    
    // Cerrar menú al hacer clic en un enlace
    menuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            toggleMenu();
            
            // Scroll suave a la sección
            e.preventDefault();
            const targetId = item.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                targetSection.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Cerrar menú al hacer scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > lastScroll && navMenu.classList.contains('active')) {
            toggleMenu();
        }
        lastScroll = currentScroll;
    });
    
    // Cerrar menú al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (navMenu.classList.contains('active') && 
            !navMenu.contains(e.target) && 
            !menuToggle.contains(e.target)) {
            toggleMenu();
        }
    });
});

// Funciones para el modal de pagos
function abrirModalPago(tipoPlan) {
    // Cerrar el modal de selección de plan
    document.getElementById('modalPlanSelect').style.display = 'none';
    
    const modal = document.getElementById('modalPago');
    const planText = document.getElementById('plan-seleccionado');
    const metodosContainer = document.querySelector('.metodos-pago');
    
    // Mostrar el plan seleccionado
    const precio = tipoPlan === 'mensual' ? '$7 USD' : '$70 USD';
    planText.textContent = `Plan seleccionado: ${tipoPlan.charAt(0).toUpperCase() + tipoPlan.slice(1)} - ${precio}`;
    
    // Limpiar los métodos de pago existentes
    metodosContainer.innerHTML = '';
    
    // Métodos de pago con enlaces a WhatsApp
    const metodosPago = `
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20PayPal" target="_blank" class="metodo-pago">
            <img src="IMG/paypal.png" alt="PayPal">
            <span>PayPal</span>
        </a>
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20Daviplata" target="_blank" class="metodo-pago">
            <img src="IMG/daviplata.png" alt="Daviplata">
            <span>Daviplata</span>
        </a>
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20Bancolombia%20a%20la%20Mano" target="_blank" class="metodo-pago">
            <img src="IMG/bancolombia.png" alt="Bancolombia a la Mano">
            <span>Bancolombia a la Mano</span>
        </a>
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20Nequi" target="_blank" class="metodo-pago">
            <img src="IMG/nequi.png" alt="Nequi">
            <span>Nequi</span>
        </a>
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20Nu" target="_blank" class="metodo-pago">
            <img src="IMG/nu.png" alt="Nu">
            <span>Nu</span>
        </a>
        <a href="https://wa.me/573167699072?text=Quiero%20adquirir%20el%20plan%20${tipoPlan}%20mediante%20Western%20Union" target="_blank" class="metodo-pago">
            <img src="IMG/western-union.png" alt="Western Union">
            <span>Western Union</span>
        </a>
    `;
    
    metodosContainer.innerHTML = metodosPago;
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Previene el scroll del body
}
function mostrarOpcionesPlan() {
    const modal = document.getElementById('modalPlanSelect');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function cerrarModalPlan() {
    const modal = document.getElementById('modalPlanSelect');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Cerrar modales al hacer clic fuera de ellos
window.addEventListener('click', function(event) {
    const modalPlan = document.getElementById('modalPlanSelect');
    const modalPago = document.getElementById('modalPago');
    
    if (event.target == modalPlan) {
        modalPlan.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
    if (event.target == modalPago) {
        modalPago.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});

