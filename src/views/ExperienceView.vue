<script setup>
import { ref } from 'vue'
import { experiences } from '../stores/experiences.js'

// Make a reactive copy so Vue tracks updates properly
const experienceList = ref(experiences)

// Toggle showMore property
const toggleMore = (project) => {
  project.showMore = !project.showMore
}
</script>

<template>
  <div class="container">
    <h1 class="text-center mb-4">My Experience</h1>

    <div v-for="experience in experienceList" :key="experience.title" class="experience">
      <h2>{{ experience.title }}</h2>
      <h4>{{ experience.company }} · {{ experience.type }}</h4>
      <p><strong>Duration:</strong> {{ experience.duration }}</p>
      <p><strong>Location:</strong> {{ experience.location }}</p>

      <div v-if="experience.projects">
        <div v-for="project in experience.projects" :key="project.name" class="project">
          <h3>{{ project.name }}</h3>
          <p><strong>Period:</strong> {{ project.period }}</p>
          <p><strong>Technologies:</strong> {{ project.technologies.join(', ') }}</p>

          <!-- Short description -->
          <p v-if="!project.showMore">{{ project.description.substring(0, 150) }}...</p>

          <!-- Full description when expanded -->
          <p v-if="project.showMore">{{ project.description }}</p>

          <!-- Toggle button -->
          <button @click="toggleMore(project)" class="btn btn-outline-primary">
            {{ project.showMore ? 'Show Less' : 'Read More' }}
          </button>
        </div>
      </div>

      <p v-else>{{ experience.description }}</p>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 100%;
  /* margin: 50px auto; */
}

/* Light Mode Styles */
.experience {
  background: #f8f9fa;
  padding: 15px;
  border-radius: 10px;
  margin-top: 20px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.project {
  background: white;
  padding: 15px;
  border-radius: 10px;
  margin-top: 10px;
  border: 1px solid #ddd;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

.btn {
  margin-top: 10px;
  transition:
    background 0.3s ease,
    color 0.3s ease;
}

/* ✅ Dark Mode Styles */
body.dark .experience {
  background: #343a40 !important; /* Dark Gray */
  color: white !important;
}

body.dark .project {
  background: #212529 !important; /* Even Darker Gray */
  color: white !important;
  border-color: #444 !important;
}

body.dark .btn-outline-primary {
  color: white;
  border-color: white;
}

body.dark .btn-outline-primary:hover {
  background: white;
  color: black;
}

/* Ensure text is readable in both modes */
body.dark h1,
body.dark h2,
body.dark h3,
body.dark h4,
body.dark p {
  color: white !important;
}
</style>
