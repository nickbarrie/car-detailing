import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/Home.vue';
import Contact from './components/Contact.vue';
import BookingCalendar from './components/BookingCalendar.vue';
import Service from './components/ServiceDetail.vue';
import SignIn from './components/SignIn.vue';
import Admin from './components/Admin.vue';
import { auth } from './firebase'; // Import auth from your firebase configuration

const routes = [
  { path: '/', component: Home },
  { path: '/contact', component: Contact },
  { path: '/calendar', component: BookingCalendar },
  { path: '/service', component: Service },
  { path: '/signin', component: SignIn },
  { path: '/admin', component: Admin, meta: { requiresAuth: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
  const isAuthenticated = auth.currentUser;

  if (requiresAuth) {
    if (!isAuthenticated) {
      next('/signin'); // Redirect to sign-in page if not authenticated
    } else {
      const userEmail = auth.currentUser.email;
      const allowedEmail = 'nickbarrie12@gmail.com'; // Replace with your email

      if (to.path === '/admin' && userEmail !== allowedEmail) {
        next('/'); // Redirect to home if the email does not match
      } else {
        next(); // Proceed to the route
      }
    }
  } else {
    next(); // Proceed to the route
  }
});

export default router;
