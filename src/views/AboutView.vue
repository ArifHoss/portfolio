<script setup>
import { onMounted, ref } from 'vue'

const isMounted = ref(false)

onMounted(() => {
  // Ensure dark mode applies when component is mounted
  if (localStorage.getItem('theme') === 'dark') {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  isMounted.value = true // Ensures the component is properly mounted
})
</script>

<template>
  <div v-if="isMounted" class="container about-container">
    <h1 class="text-center mb-4">About Me</h1>

    <div class="row">
      <!-- Left Side: Personal Bio -->
      <div class="col-md-6">
        <h3>Who am I?</h3>
        <p>
          I am a passionate full-stack developer with expertise in
          <strong>Java, Java EE, Spring Framework, JavaScript, Node.js, Vue.js, ReactJS</strong>,
          and many other technologies. I completed a
          <strong>full-stack developer program at IT-Högskolan, Stockholm</strong>, where I gained a
          strong foundation in both <strong>frontend & backend development</strong>.
        </p>
        <p>
          My work revolves around
          <strong>problem-solving, writing clean and efficient code</strong>, and contributing to
          teams that build amazing products. I'm constantly learning new technologies and frameworks
          to improve my skill set.
        </p>
      </div>

      <!-- Right Side: Skills List -->
      <div class="col-md-6">
        <h3>My Skills</h3>
        <ul class="skills-list">
          <li>Java, Java EE, Spring Framework</li>
          <li>JavaScript, Node.js, Vue.js, ReactJS</li>
          <li>HTML, CSS, MySQL, PostgreSQL</li>
          <li>Docker, Kubernetes, CI/CD</li>
          <li>Git, GitHub, Bitbucket</li>
          <li>Testing, Debugging, Jira, Trello</li>
        </ul>
      </div>
    </div>

    <!-- Education -->
    <div class="mt-5">
      <h3>Education</h3>
      <p>
        <strong>Full-Stack Developer Program</strong> – IT-Högskolan, Stockholm Learned programming
        theory, software development methodologies, and modern frameworks.
      </p>
    </div>

    <!-- Fun Fact -->
    <div class="fun-fact mt-5">
      <h3>Fun Fact 🎣</h3>
      <p>
        I find <strong>fishing</strong> to be the perfect way to unwind and reconnect with nature.
        It's a peaceful escape, teaching patience and tranquility. It’s not just about catching
        fish, it's about appreciating the quiet moments and finding balance.
      </p>
    </div>
  </div>
</template>

<style scoped>
/* About Section Layout */
.about-container {
  background-color: white;
  max-width: 100%;
  /* align-items: center; */
  /* justify-content: center; */
  /* margin: 100px auto; */
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

/* Skills List */
.skills-list {
  list-style: none;
  /* display: flex; */
  padding: 0;
}

.skills-list li {
  background: #f8f9fa;
  padding: 10px;
  margin: 5px 0;
  border-radius: 5px;
  font-size: 16px;
}

.text-center {
  padding: 40px;
}
/* Dark mode background and text */
body.dark .about-container {
  background-color: #212529 !important;
  color: white !important;
}

body.dark .skills-list li {
  background-color: #343a40 !important;
}

/* Responsive */
@media (max-width: 768px) {
  .about-container {
    max-width: 90%;
    text-align: center;
  }
}
</style>
