<template>
    <div>
      <vue-cal
        :views="['Month', 'Week', 'Day']"
        @cell-click="handleCellClick"
        :events="events"
        :time-from="9 * 60"
        :time-to="21 * 60"
      ></vue-cal>
  
      <div>
        <h2>Book an Appointment</h2>
        <form @submit.prevent="submitBooking">
          <label for="name">Name:</label>
          <input type="text" id="name" v-model="name" required />
  
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="email" required />
  
          <label for="Service">Service:</label>
          <select id="Service" v-model="selectedService" required>
            <option v-for="service in services" :key="service" :value="service">
              {{ service }}
            </option>
          </select>
  
          <button type="submit">Book Now</button>
          <!-- Display the selected time -->
          <p v-if="time">Selected Time: {{ formatTime(time) }}</p>
  
          <!-- Display messages -->
          <p>{{ message }}</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import VueCal from 'vue-cal';
  import 'vue-cal/dist/vuecal.css';
  import axios from 'axios';
  
  export default {
    components: {
      VueCal
    },
    data() {
      return {
        name: '',
        email: '',
        time: '',
        selectedService: '',
        services: [
          'Full Detailing',
          'Interior Detailing',
          'Exterior Detailing'
        ],
        message: '',
        events: []
      };
    },
    methods: {
      handleCellClick(day, event) {
        if (event === undefined) {
          console.log('Cell clicked:', day);
          this.time = day; // Ensure you're assigning the correct date/time object
        } else {
          console.log('Event clicked:', event);
        }
      },
      async submitBooking() {
        console.log("time: " + this.time);
        try {
          if (this.time === '') {
            console.log('Please select a time slot.');
            this.message = 'Please select a time slot.';
            return;
          }
          const response = await fetch('/api/book', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: this.name,
              email: this.email,
              time: this.time,
              service: this.selectedService
            })
          });
  
          if (response.ok) {
            this.message = 'Booking successful!';
            this.name = '';
            this.email = '';
            this.time = '';
            this.selectedService = '';
            await this.fetchBookings(); // Refresh bookings after successful booking
          } else {
            this.message = 'Booking failed. Please try again.';
          }
        } catch (error) {
          this.message = 'Error: ' + error.message;
        }
      },
      async fetchBookings() {
        try {
          const response = await axios.get('http://localhost:3000/api/bookings');
          this.events = response.data.map(event => ({
            title: event.title,
            start: new Date(event.startTime),
            end: new Date(event.endTime)
          }));
        } catch (error) {
          console.error('Error fetching events:', error);
        }
      },
      formatTime(time) {
        const date = new Date(time);
        return date.toLocaleString();
      }
    },
    async mounted() {
      await this.fetchBookings(); // Fetch bookings when component is mounted
    }
  };
  </script>
  
  <style>
  /* Additional custom styles if needed */
  </style>
  