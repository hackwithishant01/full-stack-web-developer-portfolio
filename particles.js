// Particles.js configuration and initialization

// Particles configuration object
const particlesConfig = {
    "particles": {
        "number": {
            "value": 80,
            "density": {
                "enable": true,
                "value_area": 800
            }
        },
        "color": {
            "value": ["#0066ff", "#00ccff", "#ffffff"]
        },
        "shape": {
            "type": "circle",
            "stroke": {
                "width": 0,
                "color": "#000000"
            },
            "polygon": {
                "nb_sides": 5
            }
        },
        "opacity": {
            "value": 0.5,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 1,
                "opacity_min": 0.1,
                "sync": false
            }
        },
        "size": {
            "value": 3,
            "random": true,
            "anim": {
                "enable": true,
                "speed": 2,
                "size_min": 0.1,
                "sync": false
            }
        },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#0066ff",
            "opacity": 0.2,
            "width": 1
        },
        "move": {
            "enable": true,
            "speed": 1,
            "direction": "none",
            "random": false,
            "straight": false,
            "out_mode": "out",
            "bounce": false,
            "attract": {
                "enable": false,
                "rotateX": 600,
                "rotateY": 1200
            }
        }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": {
                "enable": true,
                "mode": "grab"
            },
            "onclick": {
                "enable": true,
                "mode": "push"
            },
            "resize": true
        },
        "modes": {
            "grab": {
                "distance": 140,
                "line_linked": {
                    "opacity": 0.5
                }
            },
            "bubble": {
                "distance": 400,
                "size": 40,
                "duration": 2,
                "opacity": 8,
                "speed": 3
            },
            "repulse": {
                "distance": 200,
                "duration": 0.4
            },
            "push": {
                "particles_nb": 4
            },
            "remove": {
                "particles_nb": 2
            }
        }
    },
    "retina_detect": true
};

// Initialize particles when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Skip particles if user prefers reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        createFallbackBackground();
        return;
    }
    
    // Check if particles.js library is loaded
    if (typeof particlesJS !== 'undefined') {
        initializeParticles();
    } else {
        console.warn('Particles.js library not loaded');
        createFallbackBackground();
    }
});

// Initialize particles.js
function initializeParticles() {
    try {
        particlesJS('particles-js', particlesConfig);
        console.log('Particles.js initialized successfully');
    } catch (error) {
        console.error('Error initializing particles.js:', error);
        createFallbackBackground();
    }
}

// Fallback background animation if particles.js fails to load
function createFallbackBackground() {
    const particlesContainer = document.getElementById('particles-js');
    if (!particlesContainer) return;

    // Create CSS-based animated background
    particlesContainer.innerHTML = `
        <div class="fallback-bg">
            <div class="floating-shapes">
                ${createFloatingShapes(20)}
            </div>
        </div>
    `;

    // Add CSS for fallback animation
    addFallbackStyles();
}

// Create floating shapes for fallback
function createFloatingShapes(count) {
    let shapes = '';
    for (let i = 0; i < count; i++) {
        const size = Math.random() * 4 + 2;
        const left = Math.random() * 100;
        const delay = Math.random() * 20;
        const duration = Math.random() * 10 + 15;
        
        shapes += `
            <div class="floating-shape" 
                 style="
                     width: ${size}px; 
                     height: ${size}px; 
                     left: ${left}%; 
                     animation-delay: ${delay}s;
                     animation-duration: ${duration}s;
                 ">
            </div>
        `;
    }
    return shapes;
}

// Add CSS styles for fallback animation
function addFallbackStyles() {
    const style = document.createElement('style');
    style.textContent = `
        .fallback-bg {
            position: absolute;
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
        
        .floating-shapes {
            position: relative;
            width: 100%;
            height: 100%;
        }
        
        .floating-shape {
            position: absolute;
            background: linear-gradient(45deg, #0066ff, #00ccff);
            border-radius: 50%;
            opacity: 0.6;
            animation: float linear infinite;
        }
        
        @keyframes float {
            0% {
                transform: translateY(100vh) rotate(0deg);
                opacity: 0;
            }
            10% {
                opacity: 0.6;
            }
            90% {
                opacity: 0.6;
            }
            100% {
                transform: translateY(-100px) rotate(360deg);
                opacity: 0;
            }
        }
        
        .floating-shape:nth-child(odd) {
            animation-direction: reverse;
        }
        
        .floating-shape:nth-child(3n) {
            background: linear-gradient(45deg, #00ccff, #ffffff);
        }
        
        .floating-shape:nth-child(5n) {
            background: radial-gradient(circle, #0066ff, transparent);
        }
    `;
    document.head.appendChild(style);
}

// Responsive particles configuration
function updateParticlesForDevice() {
    const isMobile = window.innerWidth <= 768;
    const isTablet = window.innerWidth <= 1024 && window.innerWidth > 768;
    
    if (isMobile) {
        // Reduce particles for mobile performance
        particlesConfig.particles.number.value = 30;
        particlesConfig.particles.line_linked.distance = 100;
        particlesConfig.particles.move.speed = 0.5;
    } else if (isTablet) {
        // Medium particles for tablet
        particlesConfig.particles.number.value = 50;
        particlesConfig.particles.line_linked.distance = 120;
        particlesConfig.particles.move.speed = 0.8;
    } else {
        // Full particles for desktop
        particlesConfig.particles.number.value = 80;
        particlesConfig.particles.line_linked.distance = 150;
        particlesConfig.particles.move.speed = 1;
    }
}

// Update particles on window resize
window.addEventListener('resize', function() {
    updateParticlesForDevice();
    
    // Reinitialize particles with new config
    if (typeof particlesJS !== 'undefined' && window.pJSDom && window.pJSDom.length > 0) {
        window.pJSDom.forEach(function(pJS) {
            pJS.pJS.fn.vendors.destroypJS();
        });
        window.pJSDom = [];
        initializeParticles();
    }
});

// Initialize responsive configuration
updateParticlesForDevice();

// Performance monitoring
function monitorParticlesPerformance() {
    let frameCount = 0;
    let lastTime = performance.now();
    
    function checkFPS() {
        frameCount++;
        const currentTime = performance.now();
        
        if (currentTime - lastTime >= 1000) {
            const fps = Math.round(frameCount * 1000 / (currentTime - lastTime));
            
            // If FPS drops below 30, reduce particles
            if (fps < 30 && particlesConfig.particles.number.value > 20) {
                particlesConfig.particles.number.value = Math.max(20, particlesConfig.particles.number.value - 10);
                console.log(`Performance optimization: Reduced particles to ${particlesConfig.particles.number.value}`);
                
                // Reinitialize with reduced particles
                if (typeof particlesJS !== 'undefined') {
                    initializeParticles();
                }
            }
            
            frameCount = 0;
            lastTime = currentTime;
        }
        
        requestAnimationFrame(checkFPS);
    }
    
    // Start monitoring after particles are initialized
    setTimeout(checkFPS, 2000);
}

// Start performance monitoring
if (window.requestAnimationFrame) {
    monitorParticlesPerformance();
}

// Export configuration for external use
window.portfolioParticlesConfig = particlesConfig;

console.log('Particles.js configuration loaded');