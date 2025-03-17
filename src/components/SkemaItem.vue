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
            <!-- Kontroller om fag er tilgængeligt -->
            <div v-if="entry[subject]">
              {{ entry[subject].name || '-' }}
              <div class="progress-bar">
                <div class="progress" :style="{ width: calculateProgress(entry[subject].startDate, entry[subject].endDate) + '%' }"></div>
                <span>{{ calculateProgress(entry[subject].startDate, entry[subject].endDate) }}% tilbage</span>
              </div>
            </div>
            <div v-else>-</div>  <!-- Hvis fag ikke findes -->
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
      selectedCourse: "", // Vælg kursus fra dropdown
      courses: ["H1", "H2", "H3", "H4", "H5", "H6"],  // Kursusmuligheder
      schedule: [],  // Skemaet vil blive fyldt med data fra API
      dynamicSubjects: [],  // Fagene bliver dynamisk hentet fra API
      loading: false,  // Indlæsningsstatus
      error: null,  // Fejlmeddelelser
      mockScheduleData: [ // Mock data til testing
        {
          date: "2025-03-17",
          "Matematik": { name: "Matematik", startDate: "2025-03-17T09:00:00", endDate: "2025-03-17T10:30:00" },
          "Fysik": { name: "Fysik", startDate: "2025-03-17T11:00:00", endDate: "2025-03-17T12:30:00" },
        },
        {
          date: "2025-03-18",
          "Matematik": { name: "Matematik", startDate: "2025-03-18T09:00:00", endDate: "2025-03-18T10:30:00" },
          "Kemi": { name: "Kemi", startDate: "2025-03-18T11:00:00", endDate: "2025-03-18T12:30:00" },
        }
      ]
    };
  },
  methods: {
    // Funktion til at hente skemaet for det valgte kursus
    async fetchSchedule() {
      if (!this.selectedCourse) {
        this.error = "Vælg et kursus først.";
        return;
      }
      this.loading = true;
      this.error = null;

      try {
        // Hent skemaet fra API (eller din backend)
        const response = await axios.get(`http://localhost:5255/api/Days/schedule?course=${this.selectedCourse}`);
        this.schedule = response.data;

        console.log("API response:", response.data);  // Debugger API-responsen

        // Ekstraher fagene dynamisk fra API-responsen
        if (this.schedule.length > 0) {
          this.dynamicSubjects = Object.keys(this.schedule[0]).filter((key) => key !== "date");
        }
      } catch (error) {
        console.error(error);  // Log fejl for debugging
        this.error = "Kunne ikke hente skemaet.";
        
        // Brug mock data, hvis API-kaldet mislykkes
        this.schedule = this.mockScheduleData;

        // Ekstraher fagene fra mock data
        if (this.schedule.length > 0) {
          this.dynamicSubjects = Object.keys(this.schedule[0]).filter((key) => key !== "date");
        }
      } finally {
        this.loading = false;
      }
    },
    // Beregn fremskridtet for hvert fag (baseret på datoer)
    calculateProgress(startDate, endDate) {
      if (!startDate || !endDate) return 0;

      const start = new Date(startDate);
      const end = new Date(endDate);
      const now = new Date();

      if (now < start) return 100; // Før start
      if (now > end) return 0; // Allerede afsluttet

      const totalDuration = end - start;
      const remainingTime = end - now;

      return Math.round((remainingTime / totalDuration) * 100);
    },
  },
  mounted() {
    this.fetchSchedule();  // Hent skemaet når komponenten bliver monteret
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