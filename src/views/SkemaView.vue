<template>
  <div class="schedule-container">
    <h2>Skemaoversigt</h2>
    
    <!-- Dropdown til valg af hovedforløb -->
    <label for="course">Vælg hovedforløb:</label>
    <select v-model="selectedCourse" @change="fetchSchedule">
      <option v-for="course in courses" :key="course" :value="course">{{ course }}</option>
    </select>
    
    <!-- Skema tabel -->
    <table>
      <thead>
        <tr>
          <th>Dato</th>
          <th v-for="(subject, index) in subjects" :key="index">{{ subject }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(entry, index) in schedule" :key="index">
          <td>{{ entry.date }}</td>
          <td v-for="(subject, idx) in subjects" :key="idx">
            {{ entry[subject]?.name || '-' }}
            <!-- Progressbar baseret på tid -->
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
import axios from 'axios';

export default {
  data() {
    return {
      selectedCourse: '',
      courses: ['H1', 'H2', 'H3', 'H4', 'H5', 'H6'],
      subjects: ['Fag1', 'Fag2', 'Fag3', 'Fag4', 'Fag5', 'Fag6'],
      schedule: []
    };
  },
  methods: {
    async fetchSchedule() {
      try {
        const response = await axios.get(`http://localhost:5000/api/schedule?course=${this.selectedCourse}`);
        this.schedule = response.data;
      } catch (error) {
        console.error('Fejl ved hentning af skema:', error);
      }
    },
    calculateProgress(startDate, endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();
      
      if (now < start) return 100;
      if (now > end) return 0;
      
      const totalDuration = end - start;
      const timePassed = now - start;
      
      return Math.round(((end - now) / totalDuration) * 100);
    }
  },
  mounted() {
    this.fetchSchedule();
  }
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