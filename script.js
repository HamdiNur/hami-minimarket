// Image Slider Functionality
let currentSlideIndex = 0
let slideInterval

function showSlide(index) {
  const slides = document.querySelectorAll(".slide")
  const dots = document.querySelectorAll(".dot")

  // Wrap around if index is out of bounds
  if (index >= slides.length) {
    currentSlideIndex = 0
  } else if (index < 0) {
    currentSlideIndex = slides.length - 1
  } else {
    currentSlideIndex = index
  }

  // Remove active class from all slides and dots
  slides.forEach((slide) => slide.classList.remove("active"))
  dots.forEach((dot) => dot.classList.remove("active"))

  // Add active class to current slide and dot
  slides[currentSlideIndex].classList.add("active")
  dots[currentSlideIndex].classList.add("active")
}

function changeSlide(direction) {
  showSlide(currentSlideIndex + direction)
  resetSlideInterval()
}

function currentSlide(index) {
  showSlide(index)
  resetSlideInterval()
}

function autoSlide() {
  currentSlideIndex++
  showSlide(currentSlideIndex)
}

function resetSlideInterval() {
  clearInterval(slideInterval)
  slideInterval = setInterval(autoSlide, 5000)
}

// Start auto-sliding when page loads
document.addEventListener("DOMContentLoaded", () => {
  showSlide(0)
  slideInterval = setInterval(autoSlide, 5000)
})

// Form Validation
const contactForm = document.getElementById("contactForm")

contactForm.addEventListener("submit", (e) => {
  e.preventDefault()

  // Clear previous errors
  clearErrors()

  // Get form values
  const name = document.getElementById("name").value.trim()
  const email = document.getElementById("email").value.trim()
  const phone = document.getElementById("phone").value.trim()
  const address = document.getElementById("address").value.trim()
  const message = document.getElementById("message").value.trim()

  let isValid = true

  // Name validation
  if (name === "") {
    showError("name", "Name is required")
    isValid = false
  } else if (name.length < 2) {
    showError("name", "Name must be at least 2 characters")
    isValid = false
  }

  // Email validation
  if (email === "") {
    showError("email", "Email is required")
    isValid = false
  } else if (!isValidEmail(email)) {
    showError("email", "Please enter a valid email address")
    isValid = false
  }

  // Phone validation
  if (phone === "") {
    showError("phone", "Phone number is required")
    isValid = false
  } else if (!isValidPhone(phone)) {
    showError("phone", "Please enter a valid phone number")
    isValid = false
  }

  // Address validation
  if (address === "") {
    showError("address", "Address is required")
    isValid = false
  } else if (address.length < 5) {
    showError("address", "Please enter a complete address")
    isValid = false
  }

  // Message validation
  if (message === "") {
    showError("message", "Message is required")
    isValid = false
  } else if (message.length < 10) {
    showError("message", "Message must be at least 10 characters")
    isValid = false
  }

  // If form is valid, show success message
  if (isValid) {
    document.getElementById("successMessage").classList.add("show")
    contactForm.reset()

    // Hide success message after 5 seconds
    setTimeout(() => {
      document.getElementById("successMessage").classList.remove("show")
    }, 5000)
  }
})

function showError(fieldId, errorMessage) {
  const field = document.getElementById(fieldId)
  const errorElement = document.getElementById(fieldId + "Error")

  field.classList.add("error")
  errorElement.textContent = errorMessage
}

function clearErrors() {
  const errorMessages = document.querySelectorAll(".error-message")
  const inputFields = document.querySelectorAll(".form-group input, .form-group textarea")

  errorMessages.forEach((error) => (error.textContent = ""))
  inputFields.forEach((field) => field.classList.remove("error"))
}

function isValidEmail(email) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

function isValidPhone(phone) {
  const phoneRegex = /^[\d\s\-+$$$$]{10,}$/
  return phoneRegex.test(phone)
}

// Back to Top Button
const backToTopButton = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.pageYOffset > 300) {
    backToTopButton.classList.add("show")
  } else {
    backToTopButton.classList.remove("show")
  }
})

backToTopButton.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  })
})

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// ----- Mobile Menu Toggle -----
document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menu-toggle")
  const navMenu = document.getElementById("nav-menu")

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      navMenu.classList.toggle("show")

      // Optional: change the icon from ☰ to ✖
      const icon = menuToggle.querySelector("i")
      if (icon) {
        icon.classList.toggle("fa-bars")
        icon.classList.toggle("fa-times")
      }
    })
  }
})
  // ----- Cart -----
  const cartItems = {};
  function updateCartCount() {
    const total = Object.values(cartItems).reduce((a, b) => a + b, 0);
    const cartCount = document.getElementById("cartCount");
    if (cartCount) {
      cartCount.textContent = total;
      cartCount.classList.add("cart-bump");
      setTimeout(() => cartCount.classList.remove("cart-bump"), 300);
    }
  }

  document.querySelectorAll(".cart-control").forEach((ctrl) => {
    const product = ctrl.dataset.product;
    const minusBtn = ctrl.querySelector(".cart-minus");
    const plusBtn = ctrl.querySelector(".cart-plus");
    const qtyDisplay = ctrl.querySelector(".cart-quantity");

    cartItems[product] = 0;

    plusBtn.addEventListener("click", () => {
      cartItems[product]++;
      qtyDisplay.textContent = cartItems[product];
      updateCartCount();
    });
    minusBtn.addEventListener("click", () => {
      if (cartItems[product] > 0) {
        cartItems[product]--;
        qtyDisplay.textContent = cartItems[product];
        updateCartCount();
      }
    });
  });

  // Search functionality
  const searchInput = document.getElementById("searchInput")
  searchInput.addEventListener("input", filterProducts)

  // Category filter functionality
  const filterButtons = document.querySelectorAll(".filter-btn")
  filterButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      e.target.classList.add("active")
      filterProducts()
    })
  })

  // Price filter functionality
  const priceRange = document.getElementById("priceRange")
  const priceValue = document.getElementById("priceValue")

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = e.target.value
    filterProducts()
  })


function filterProducts() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase()
  const activeCategory = document.querySelector(".filter-btn.active").getAttribute("data-category")
  const maxPrice = Number.parseFloat(document.getElementById("priceRange").value)

  const productCards = document.querySelectorAll(".product-card")

  productCards.forEach((card) => {
    const productName = card.getAttribute("data-name").toLowerCase()
    const productCategory = card.getAttribute("data-category")
    const productPrice = Number.parseFloat(card.getAttribute("data-price"))

    const matchesSearch = productName.includes(searchTerm)
    const matchesCategory = activeCategory === "all" || productCategory === activeCategory
    const matchesPrice = productPrice <= maxPrice

    if (matchesSearch && matchesCategory && matchesPrice) {
      card.classList.remove("hidden")
    } else {
      card.classList.add("hidden")
    }
  })
}
