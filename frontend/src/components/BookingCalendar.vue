<template>
    <vue-cal
      :views="['month', 'week', 'day']"
      :events="events"
    ></vue-cal>
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
        events: []  // Array to hold events for the calendar
      };
    },
    async mounted() {
      try {
        const response = await axios.get('http://localhost:3000/api/bookings');
        
        // Assuming response.data is an array of event objects as shown in your example
        this.events = response.data.map(event => ({
          title: event.title,
          start: new Date(event.startTime),
          end: new Date(event.endTime)
        }));
  
      } catch (error) {
        console.error('Error fetching events:', error);
      }
    }
  };
  </script>
  
  <style>
  /* Additional custom styles if needed */
  </style>
  