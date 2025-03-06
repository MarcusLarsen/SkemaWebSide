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
      console.log('Logging in:', payload);
    },
    async register(payload) {
      console.log('Registering user:', payload);
    },
  },
};
</script>

<style scoped>
/* Ensure the html and body fill the full height */
html, body {
  height: 100%;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f0f0; /* Optional background color */
}

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

form div {
  margin-bottom: 10px;
}

input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

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

p {
  text-align: center;
  margin-top: 10px;
  cursor: pointer;
}
</style>