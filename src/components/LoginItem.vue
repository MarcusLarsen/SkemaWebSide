<template>
  <div class="auth-container">
    <h2>Login</h2>

    <form @submit.prevent="handleLogin">
      <div>
        <label for="userName">Username</label>
        <input type="text" id="userName" v-model="username" required />
      </div>
      <div>
        <label for="password">Password</label>
        <input type="password" id="password" v-model="password" required />
      </div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Logging in...' : 'Login' }}
      </button>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>

    <p @click="goToRegister">Create an account</p>
  </div>
</template>

<script>
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://localhost:7140/api',
});

api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

api.interceptors.response.use(response => {
  return response;
}, error => {
  if (error.response && error.response.status === 401) {
    localStorage.removeItem('token');
    window.location.href = '/login'; 
  }
  return Promise.reject(error);
});

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
      this.errorMessage = '';

      try {
        const response = await axios.post('http://localhost:5255/api/Auth/Login', {
          userName: this.username,  
          password: this.password,
        });

        const token = response.data.token;
        localStorage.setItem('token', token);
        alert('Login successful!');

        this.$router.push('/skema');  
      } catch (error) {
        console.error("Login error:", error);

        if (error.response) {
          if (error.response.status === 401) {
            this.errorMessage = 'Invalid username or password.';
          } else {
            this.errorMessage = error.response.data.message || 'An error occurred. Please try again later.';
          }
        } else {
          this.errorMessage = 'Network error. Please try again later.';
        }
      } finally {
        this.loading = false;
      }
    },
    async fetchProtectedData() {
      try {
        const response = await api.get('/protected-route'); // Eksempel på beskyttet endpoint
        console.log('Protected data:', response.data);
      } catch (error) {
        console.error('Error fetching protected data:', error);
      }
    },
    goToRegister() {
      this.$router.push('/register'); 
    },
  },
};
</script>

<style scoped>
.auth-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  max-width: 400px;
  margin: 20px;
  padding: 20px;
  background: white;
  border-radius: 10px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

form {
  width: 100%;
}

form div {
  width: 100%;
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  box-sizing: border-box;
}

button:hover {
  background-color: #45a049;
}

p {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 10px;
}
</style>