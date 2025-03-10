<script setup>
import { ref, onMounted } from 'vue'
import { RouterLink } from 'vue-router'

const isDark = ref(false)

onMounted(() => {
  // Immediately apply dark mode on page load
  const savedTheme = localStorage.getItem('theme') === 'dark'
  isDark.value = savedTheme
  if (savedTheme) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }
})

const toggleTheme = () => {
  isDark.value = !isDark.value
  document.body.classList.toggle('dark', isDark.value)
  localStorage.setItem('theme', isDark.value ? 'dark' : 'light')
}

const navLinks = [
  { name: 'About', path: '/about' },
  { name: 'Projects', path: '/project' },
  { name: 'Experience', path: '/experience' },
  { name: 'Contact', path: '/contact' },
]
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
    <div class="container-fluid">
      <RouterLink class="navbar-brand" to="/">Arif</RouterLink>

      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li v-for="link in navLinks" :key="link.path" class="nav-item">
            <RouterLink class="nav-link" :to="link.path" active-class="active">
              {{ link.name }}
            </RouterLink>
          </li>
        </ul>
        <button @click="toggleTheme" class="btn btn-outline-secondary" title="Toggle Dark Mode">
          {{ isDark ? '🌙' : '☀️' }}
        </button>
      </div>
    </div>
  </nav>
</template>

<style scoped>
/* Optional dark mode styles */
.dark {
  background-color: #212529;
  color: white;
}

.dark .navbar {
  background-color: #343a40 !important;
}

.dark .nav-link,
.dark .navbar-brand {
  color: white !important;
}

.dark .btn-outline-secondary {
  color: white;
  border-color: white;
}
</style>
