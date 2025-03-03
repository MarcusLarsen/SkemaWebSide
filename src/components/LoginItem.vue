<template>
  <div class="login-container">
    <h2>Login</h2>
    <form @submit.prevent="handleLogin">
        <div>
            <label for="username">Brugernavn:</label>
            <br>
            <input type="text" id="username" v-model="username" required>
        </div>
        <div>
            <label for="password">Adgangskode:</label>
            <input type="password" id="password" v-model="password" required>
        </div>
        <button type="submit" :disabled="loading">{{ loading ? 'Logging in...' : 'Log ind' }}</button>
        <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
    
    <!-- Register Button to Navigate to Registration View -->
    <div class="register-container">
      <button @click="goToRegister">Opret en konto</button>
    </div>
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
      loading: false
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true;
      try {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          username: this.username,
          password: this.password
        });
        
        // Save token in localStorage
        localStorage.setItem('token', response.data.token);
        alert('Login successful!');
        this.$router.push('/dashboard'); // Redirect to dashboard
      } catch (error) {
        // Error handling
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
      // Navigate to the Register page
      this.$router.push('/register');
    }
  }
};
</script>

<style scoped>
.login-container {
  max-width: 300px;
  margin: auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #f9f9f9;
}
.error {
  color: red;
  font-size: 14px;
}
button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}
.register-container {
  text-align: center;
  margin-top: 20px;
}
.register-container button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.register-container button:hover {
  background-color: #45a049;
}
</style>

