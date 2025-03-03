<template>
    <div class="auth-container">
      <h2 v-if="isLogin">Login</h2>
      <h2 v-else>Register</h2>
  
      <form @submit.prevent="submitForm">
        <div>
          <label for="email">Email</label>
          <input type="email" v-model="email" required />
        </div>
        <div>
          <label for="password">Password</label>
          <input type="password" v-model="password" required />
        </div>
        <div v-if="!isLogin">
          <label for="confirmPassword">Confirm Password</label>
          <input type="password" v-model="confirmPassword" required />
        </div>
  
        <button type="submit">{{ isLogin ? 'Login' : 'Register' }}</button>
      </form>
  
      <p @click="toggleForm">{{ isLogin ? 'Create an account' : 'Already have an account? Login' }}</p>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        email: '',
        password: '',
        confirmPassword: '',
        isLogin: true,
      };
    },
    methods: {
      toggleForm() {
        this.isLogin = !this.isLogin;
      },
      submitForm() {
        if (!this.isLogin && this.password !== this.confirmPassword) {
          alert('Passwords do not match!');
          return;
        }
  
        const payload = {
          email: this.email,
          password: this.password,
        };
  
        if (this.isLogin) {
          this.login(payload);
        } else {
          this.register(payload);
        }
      },
      async login(payload) {
        // Call your login API
        // This could be a POST request to your backend
        console.log('Logging in:', payload);
      },
      async register(payload) {
        // Call your registration API
        // This could be a POST request to your backend
        console.log('Registering user:', payload);
      },
    },
  };
  </script>
  
  <style scoped>
  .auth-container {
    /* Styling for your login/registration screen */
  }
  </style>
  