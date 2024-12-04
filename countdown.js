// Fecha de lanzamiento: 7 de abril de 2024
const countDownDate = new Date("Apr 7, 2025 00:00:00").getTime();

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
    let cuposDisponibles = 0; // Cambia este número para actualizar la barra
    
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
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    function toggleMenu() {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Gestionar el scroll del body
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : 'auto';
        
        // Reiniciar las animaciones de los elementos del menú
        if (!navMenu.classList.contains('active')) {
            navLinks.forEach(link => {
                link.parentElement.style.opacity = '0';
                link.parentElement.style.transform = 'translateY(20px)';
            });
        }
    }
    
    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }

    // Cerrar menú al hacer clic en los enlaces
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            toggleMenu();
        });
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
    const modalPlan = document.getElementById('modalPlanSelect');
    const modal = document.getElementById('modalPago');
    const planText = document.getElementById('plan-seleccionado');
    const metodosContainer = document.querySelector('.metodos-pago');
    
    // Si es el plan gratuito, redirigir directamente a la descarga
    if (tipoPlan === 'lite') {
        window.location.href = '#beta';
        return;
    }
    
    // Cerrar el modal de selección de plan si está abierto
    if (modalPlan) {
        modalPlan.style.display = 'none';
    }
    
    // Para los planes pagos, mostrar el modal con los métodos de pago
    const precio = tipoPlan === 'mensual' ? '$5 USD' : '$45 USD';
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
    
    // Mostrar el modal de pagos
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

function cerrarModalPago() {
    const modal = document.getElementById('modalPago');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Event listeners para cerrar modales
document.addEventListener('DOMContentLoaded', function() {
    // Event listeners para los botones de cerrar (X)
    const closeButtons = document.querySelectorAll('.close');
    closeButtons.forEach(button => {
        button.addEventListener('click', function() {
            const modal = this.closest('.modal');
            if (modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    });

    // Cerrar modales al hacer clic fuera de ellos
    window.addEventListener('click', function(event) {
        const modalPago = document.getElementById('modalPago');
        const modalPlan = document.getElementById('modalPlanSelect');
        
        if (event.target === modalPago) {
            modalPago.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
        if (event.target === modalPlan) {
            modalPlan.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// Función para ajustar el layout según el tamaño de pantalla
function adjustLayoutForScreenSize() {
  const isMobile = window.innerWidth <= 768;
  const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
  
  // Ajustar elementos según el dispositivo
  document.querySelectorAll('.feature').forEach(feature => {
    feature.style.minHeight = isMobile ? 'auto' : isTablet ? '300px' : '350px';
  });

  // Ajustar tamaño de fuente para el contador
  const countdownValues = document.querySelectorAll('.countdown-value');
  countdownValues.forEach(value => {
    value.style.fontSize = isMobile ? '1.5rem' : isTablet ? '2rem' : '2.5rem';
  });
}

// Ejecutar al cargar y al cambiar el tamaño de la ventana
window.addEventListener('load', adjustLayoutForScreenSize);
window.addEventListener('resize', adjustLayoutForScreenSize);


