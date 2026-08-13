// Premium Interactive Scripts for Organic Grocery Store

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Management (Light / Dark Toggle)
  const themeToggles = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('theme') || 'light';
  
  document.documentElement.setAttribute('data-theme', storedTheme);
  updateThemeIcon(storedTheme);

  themeToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme');
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      
      document.documentElement.setAttribute('data-theme', newTheme);
      localStorage.setItem('theme', newTheme);
      updateThemeIcon(newTheme);
      showAlert(`Switched to ${newTheme} theme`);
    });
  });

  function updateThemeIcon(theme) {
    themeToggles.forEach(toggle => {
      if (theme === 'dark') {
        toggle.innerHTML = '☀️';
        toggle.setAttribute('aria-label', 'Switch to light theme');
      } else {
        toggle.innerHTML = '🌙';
        toggle.setAttribute('aria-label', 'Switch to dark theme');
      }
    });
  }

  // 1b. RTL Direction Management (LTR / RTL Toggle)
  const rtlToggles = document.querySelectorAll('.rtl-toggle-btn');
  const storedDir = localStorage.getItem('dir') || 'ltr';
  
  document.documentElement.setAttribute('dir', storedDir);
  updateRtlIcon(storedDir);
 
  rtlToggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      const currentDir = document.documentElement.getAttribute('dir') || 'ltr';
      const newDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
      
      document.documentElement.setAttribute('dir', newDir);
      localStorage.setItem('dir', newDir);
      updateRtlIcon(newDir);
    });
  });
 
  function updateRtlIcon(dir) {
    rtlToggles.forEach(toggle => {
      if (dir === 'rtl') {
        toggle.innerHTML = 'LTR';
        toggle.setAttribute('aria-label', 'Switch to LTR layout');
      } else {
        toggle.innerHTML = 'RTL';
        toggle.setAttribute('aria-label', 'Switch to RTL layout');
      }
    });
  }

  // 2. Mobile Responsive Menu
  const hamburger = document.querySelector('.hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
      // Animation helper
      const spans = hamburger.querySelectorAll('span');
      if (hamburger.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(6px, 6px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(6px, -6px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // 3. Custom Alert / Notification System
  function showAlert(message) {
    let alertBox = document.querySelector('.alert-popup');
    if (!alertBox) {
      alertBox = document.createElement('div');
      alertBox.className = 'alert-popup';
      document.body.appendChild(alertBox);
    }
    alertBox.textContent = message;
    alertBox.style.display = 'block';
    
    setTimeout(() => {
      alertBox.style.display = 'none';
    }, 3000);
  }

  // 4. FAQ Accordion interaction
  const faqHeaders = document.querySelectorAll('.faq-header');
  faqHeaders.forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isActive = item.classList.contains('active');
      
      // Close all FAQs first
      document.querySelectorAll('.faq-item').forEach(faq => {
        faq.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // 5. Back to Top Button Behavior
  const backToTopBtn = document.querySelector('.back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 6. Contact Form Validation and Submission
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const phone = document.getElementById('phone').value.trim();
      const message = document.getElementById('message').value.trim();
      
      if (!name || !email || !message) {
        showAlert('Please fill in all required fields.');
        return;
      }
      
      if (!validateEmail(email)) {
        showAlert('Please enter a valid email address.');
        return;
      }

      showAlert('Thank you! Your enquiry has been submitted successfully.');
      contactForm.reset();
    });
  }

  // 7. Product Catalog Filter
  const filterButtons = document.querySelectorAll('.filter-btn');
  const productCards = document.querySelectorAll('.product-card');

  if (filterButtons.length > 0 && productCards.length > 0) {
    filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        // Toggle active button
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-filter');

        productCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          if (category === 'all' || cardCategory === category) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }

  // 8. Subscription Box Interactive Preview / Selection
  const subSelection = document.getElementById('subscriptionSelect');
  const subPriceDisplay = document.getElementById('subPriceDisplay');
  const subDetailDisplay = document.getElementById('subDetailDisplay');

  if (subSelection && subPriceDisplay && subDetailDisplay) {
    const plansInfo = {
      'produce': { price: '$35.00', detail: 'Includes 8-10 seasonal organic vegetables & fresh fruits, perfect for individuals or couples.' },
      'family': { price: '$65.00', detail: 'Includes 15-18 types of vegetables, fruits, and greens, sized for a family of four.' },
      'pantry': { price: '$85.00', detail: 'Includes premium natural pantry items, cold-pressed oils, grains, seeds, and healthy organic snacks.' }
    };

    subSelection.addEventListener('change', (e) => {
      const selectedPlan = e.target.value;
      if (plansInfo[selectedPlan]) {
        subPriceDisplay.textContent = plansInfo[selectedPlan].price;
        subDetailDisplay.textContent = plansInfo[selectedPlan].detail;
      }
    });
  }

  // Helper function for email validation
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  // Add animations on scroll
  const scrollElements = document.querySelectorAll('.feature-box, .category-card, .product-card, .subscription-card');
  const elementInView = (el, dividend = 1) => {
    const elementTop = el.getBoundingClientRect().top;
    return (
      elementTop <= (window.innerHeight || document.documentElement.clientHeight) / dividend
    );
  };

  const displayScrollElement = (element) => {
    element.classList.add('animate-fade-in');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach((el) => {
      if (elementInView(el, 1.15)) {
        displayScrollElement(el);
      }
    });
  };

  window.addEventListener('scroll', () => { 
    handleScrollAnimation();
  });
});
