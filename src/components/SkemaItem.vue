<template>
    <div class="schedule-container">
      <h2>Skemaoversigt</h2>
  
      <!-- Dropdown til valg af hovedforløb -->
      <label for="course">Vælg hovedforløb:</label>
      <select v-model="selectedCourse" @change="fetchSchedule">
        <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
      </select>
  
      <!-- Skema tabel -->
      <div v-if="loading" class="loading">Indlæser skema...</div>
      <div v-else-if="error" class="error">Fejl: {{ error }}</div>
      <table v-else>
        <thead>
          <tr>
            <th>Dato</th>
            <th v-for="(subject, index) in dynamicSubjects" :key="index">{{ subject }}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(entry, index) in schedule" :key="index">
            <td>{{ entry.date }}</td>
            <td v-for="(subject, idx) in dynamicSubjects" :key="idx">
              {{ entry[subject]?.name || '-' }}
              <div class="progress-bar" v-if="entry[subject]">
                <div class="progress" :style="{ width: calculateProgress(entry[subject].startDate, entry[subject].endDate) + '%' }"></div>
                <span>{{ calculateProgress(entry[subject].startDate, entry[subject].endDate) }}% tilbage</span>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    data() {
      return {
        selectedCourse: "",
        courses: ["H1", "H2", "H3", "H4", "H5", "H6"],
        schedule: [],
        dynamicSubjects: [], // Extracted from API instead of being hardcoded
        loading: false,
        error: null,
      };
    },
    methods: {
      async fetchSchedule() {
        this.loading = true;
        this.error = null;
        try {
          const response = await axios.get(`http://localhost:7140/api/Day/schedule?course=${this.selectedCourse}`);
          this.schedule = response.data;
  
          // Extract subjects dynamically from API response
          if (this.schedule.length > 0) {
            this.dynamicSubjects = Object.keys(this.schedule[0]).filter((key) => key !== "date");
          }
        } catch (error) {
          this.error = "Kunne ikke hente skemaet.";
        } finally {
          this.loading = false;
        }
      },
      calculateProgress(startDate, endDate) {
        if (!startDate || !endDate) return 0;
  
        const start = new Date(startDate);
        const end = new Date(endDate);
        const now = new Date();
  
        if (now < start) return 100; // Before start
        if (now > end) return 0; // Already finished
  
        const totalDuration = end - start;
        const remainingTime = end - now;
  
        return Math.round((remainingTime / totalDuration) * 100);
      },
    },
    mounted() {
      this.fetchSchedule();
    },
  };
  </script>
  
  <style scoped>
  .schedule-container {
    max-width: 800px;
    margin: auto;
  }
  
  select {
    margin-bottom: 10px;
  }
  
  .loading {
    color: blue;
    font-weight: bold;
  }
  
  .error {
    color: red;
    font-weight: bold;
  }
  
  .progress-bar {
    width: 100%;
    height: 10px;
    background-color: #ddd;
    margin-top: 5px;
    position: relative;
  }
  
  .progress {
    height: 10px;
    background-color: #4caf50;
  }
  
  .progress-bar span {
    position: absolute;
    top: -20px;
    left: 50%;
    transform: translateX(-50%);
    font-size: 12px;
    color: #000;
  }
  </style>
  