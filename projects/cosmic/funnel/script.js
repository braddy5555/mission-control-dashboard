// Cosmic Puppies Landing Page - Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Lead form handling
    const leadForm = document.getElementById('leadForm');
    if (leadForm) {
        leadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(leadForm);
            const data = {
                timestamp: new Date().toISOString(),
                source: 'cosmicpuppies.nl',
                funnel_stage: 'lead_captured'
            };
            
            // Get all input values
            const inputs = leadForm.querySelectorAll('input, select');
            inputs.forEach(input => {
                if (input.name || input.placeholder) {
                    const key = input.name || input.placeholder.toLowerCase().replace(/\s+/g, '_');
                    data[key] = input.value;
                }
            });
            
            // Store lead data (in production, this would send to backend)
            console.log('Lead captured:', data);
            
            // Show success message
            showNotification('🚀 Report requested! Check your email within 24 hours.', 'success');
            
            // Clear form
            leadForm.reset();
            
            // Store in localStorage for demo purposes
            let leads = JSON.parse(localStorage.getItem('cosmic_leads') || '[]');
            leads.push(data);
            localStorage.setItem('cosmic_leads', JSON.stringify(leads));
        });
    }
    
    // Notification system
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <span>${message}</span>
            <button onclick="this.parentElement.remove()">×</button>
        `;
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 24px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)' : 'var(--gradient)'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            box-shadow: 0 10px 40px rgba(0,0,0,0.3);
            z-index: 10000;
            display: flex;
            align-items: center;
            gap: 16px;
            font-weight: 500;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Add animations to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // Intersection Observer for scroll animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.pain-card, .service-card, .result-card, .timeline-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    // Navbar scroll effect
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        } else {
            navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        }
        
        lastScroll = currentScroll;
    });
    
    // Dynamic year in footer
    const yearSpan = document.querySelector('.footer-bottom p');
    if (yearSpan) {
        yearSpan.innerHTML = yearSpan.innerHTML.replace('2025', new Date().getFullYear());
    }
    
    // Calendly integration placeholder
    document.querySelectorAll('.cta-nav, .btn-primary').forEach(btn => {
        if (btn.textContent.includes('Book') || btn.textContent.includes('Call')) {
            btn.addEventListener('click', function(e) {
                if (this.getAttribute('href') === '#contact') {
                    // Let smooth scroll handle it
                    return;
                }
                // In production, this would open Calendly
                console.log('Calendly integration: Open scheduling modal');
            });
        }
    });
    
    // Console easter egg for developers
    console.log('%c🚀 Cosmic Puppies Agency', 'font-size: 24px; font-weight: bold; color: #6366f1;');
    console.log('%cBuilding AI systems that print money while you sleep.', 'font-size: 14px; color: #06b6d4;');
    console.log('%cReady to extract? Contact: nadim@cosmicpuppies.nl', 'font-size: 12px; color: #64748b;');
    
});
