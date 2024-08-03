import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import BookingCalendar from './components/BookingCalendar.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },
  { path: '/calendar', component: BookingCalendar }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
