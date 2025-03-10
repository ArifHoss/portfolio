<template>
  <div class="container contact-container">
    <h1 class="text-center mb-3">Contact Information</h1>
    <p class="text-muted text-center mb-4">
      Feel free to connect with me via any of the platforms below. 🚀
    </p>

    <!-- Contact Info -->
    <div class="contact-info text-center">
      <div class="info-item">
        <i class="bi bi-envelope-fill"></i>
        <strong>Email:</strong>
        <a href="mailto:arif.s.hossain@outlook.com">arif.s.hossain@outlook.com</a>
      </div>
      <div class="info-item">
        <i class="bi bi-phone-fill"></i>
        <strong>Phone:</strong>
        <a href="tel:+46763209865">+46 76 320 98 65</a>
      </div>
    </div>

    <!-- Social Links -->
    <div class="social-links text-center mt-4">
      <h5>Find me on</h5>
      <div class="d-flex justify-content-center gap-3 mt-2">
        <a
          href="https://www.linkedin.com/in/arif-hossain-92b438206/"
          class="btn custom-btn linkedin"
          target="_blank"
        >
          <i class="bi bi-linkedin"></i> LinkedIn
        </a>
        <a href="https://github.com/ArifHoss" class="btn custom-btn github" target="_blank">
          <i class="bi bi-github"></i> GitHub
        </a>
        <a href="mailto:arif.s.hossain@outlook.com" class="btn custom-btn email">
          <i class="bi bi-envelope-fill"></i> Email
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* 🔹 Centering & Responsive Layout */
.contact-container {
  max-width: 600px;
  margin: 80px auto;
  padding: 20px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

/* 🔹 Contact Info Styling */
.contact-info {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  width: 100%;
  text-align: left;
}

.info-item {
  font-size: 18px;
  margin-bottom: 15px;
  display: flex;
  align-items: center;
  gap: 10px;
}

.info-item a {
  font-weight: 500;
}

/* 🔹 Social Links */
.social-links h5 {
  margin-bottom: 10px;
}

.custom-btn {
  padding: 10px 20px;
  font-size: 16px;
  font-weight: 500;
  border-radius: 5px;
  text-decoration: none;
  transition: 0.3s;
  display: flex;
  align-items: center;
  gap: 8px;
}

/* 🔹 Button Colors */
.linkedin {
  background-color: #0077b5;
  color: white;
}

.github {
  background-color: black;
  color: white;
}

.email {
  background-color: #6c757d;
  color: white;
}

/* 🔹 Hover Effects */
.custom-btn:hover {
  opacity: 0.85;
  transform: translateY(-2px);
}

/* ✅ Dark Mode Styling */
body.dark .contact-container {
  background-color: #212529;
  color: white;
}

body.dark .contact-info {
  background: #343a40;
  color: white;
}

body.dark .text-muted {
  color: #b0b3b8 !important; /* Lighter gray for better contrast */
}

body.dark .info-item a {
  color: #0d6efd;
}

body.dark .linkedin {
  background-color: #0077b5;
  color: white;
}

body.dark .github {
  background-color: white;
  color: black;
}

body.dark .email {
  background-color: #adb5bd;
  color: black;
}

/* 🔹 Responsive Design */
@media (max-width: 768px) {
  .contact-container {
    max-width: 90%;
    text-align: center;
  }

  .contact-info {
    text-align: center;
  }

  .custom-btn {
    justify-content: center;
  }
}
</style>
