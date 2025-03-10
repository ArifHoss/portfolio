<script setup>
import {projects} from '../stores/projects.js'


const toggleExpand = (id) => {
  projects.value = projects.value.map((exp) =>
    exp.id === id ? { ...exp, expanded: !exp.expanded } : exp,
  )
}
</script>

<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div v-for="project in projects" :key="project.id" class="col-md-8 mb-4">
        <div class="card shadow-sm">
          <div class="card-body">
            <h5 class="card-title">{{ project.title }}</h5>
            <h6 class="card-subtitle mb-2 text-muted">{{ project.company }}</h6>
            <p class="card-text">
              <small>{{ project.duration }}</small>
            </p>
            <p class="card-text">{{ project.shortDescription }}</p>

            <!-- Show full description when expanded -->
            <p v-if="project.expanded" class="card-text">{{ project.fullDescription }}</p>

            <button @click="toggleExpand(project.id)" class="btn btn-primary btn-sm">
              {{ project.expanded ? 'Show Less' : 'Show More' }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  /* Default Light Mode */
  .container {
    background-color: white;
    color: black;
    min-height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-top: 30px;
  }

  /* Dark Mode - Apply styles when `body` has the `dark` class */
  .dark .container {
    background-color: #212529;
    color: white;
  }

  /* Dark mode support */
  .dark .card {
    background-color: #343a40 !important;
    color: white !important;
  }

  .dark .card-body {
    border-color: white !important;
  }

  .dark .btn-primary {
    background-color: #007bff !important;
    border-color: #007bff !important;
  }

  .dark h6 {
    background-color: #343a40 !important;
    color: white !important;
  }
}
</style>
