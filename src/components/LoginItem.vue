<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
      <div>
        <label for="username">Brugernavn:</label>
        <input type="text" id="username" v-model="username" required />
      </div>
      <div>
        <label for="password">Adgangskode:</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <div class="button-container">
        <button type="submit" class="login-btn" :disabled="loading">
          {{ loading ? 'Logging in...' : 'Log ind' }}
        </button>
        <button type="button" class="register-btn" @click="goToRegister">
          Opret en konto
        </button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: '',
      errorMessage: '',
      loading: false,
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password,
        });

        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        this.$router.push('/dashboard'); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          this.errorMessage = 'Ugyldigt brugernavn eller adgangskode.';
        } else {
          this.errorMessage = 'Der opstod en fejl. Prøv igen senere.';
        }
      } finally {
        this.loading = false;
      }
    },
    goToRegister() {
      this.$router.push('/register');
    },
  },
};
</script>

<style scoped>
/* Ensure html and body take up the full height */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Optional background color */
}

/* The auth-container is now centered on the page */
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;  /* Set a max width for the box */
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

/* Input styling */
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

/* Button styling */
button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* Adjust paragraph for toggling forms */
p {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}

form div {
  margin-bottom: 10px;
}
</style>