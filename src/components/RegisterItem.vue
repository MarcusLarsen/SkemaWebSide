<template>
  <div class="auth-container">
    <h2>Register</h2>

    <form @submit.prevent="register">
      <div>
        <label for="userName">Username</label>
        <input type="text" v-model="username" required />
      </div>

      <div>
        <label for="fullName">Full Name</label>
        <input type="text" v-model="fullName" required />
      </div>

      <div>
        <label for="email">Email</label>
        <input type="email" v-model="email" required />
      </div>

      <div>
        <label for="password">Password</label>
        <input type="password" v-model="password" required />
      </div>

      <div>
        <label for="confirmPassword">Confirm Password</label>
        <input type="password" v-model="confirmPassword" required />
      </div>

      <button type="submit">Register</button>
    </form>

    <p @click="goToLogin">Already have an account? Login</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      email: '',
      username: '',
      fullName: '',  // Added fullName
      password: '',
      confirmPassword: '',
      isLogin: false,
      errorMessage: '',
    };
  },
  methods: {
    async register() {
      if (this.password !== this.confirmPassword) {
        this.errorMessage = 'Passwords do not match!';
        return;
      }

      try {
        // Send the API request with the necessary data
        const response = await axios.post('https://localhost:7140/api/Auth/register', {
          userName: this.username,
          email: this.email,
          fullName: this.fullName,  // Include fullName in the request
          password: this.password,
        });

        alert(response.data.message);
        this.isLogin = true; // Switch to login mode after registration
      } catch (error) {
        this.errorMessage = error.response?.data?.message || 'Error during registration';
      }
    },
    goToLogin() {
      this.$router.push('/login'); 
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
</style>