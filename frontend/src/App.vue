<template>
  <div>
    <header>
      <h1>Barrie Clean Car Detailing Services</h1>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
          <li><router-link to="/booking">Book Appointment</router-link></li>
        </ul>
      </nav>
    </header>

    <main>
      <router-view></router-view>
    </main>

    <footer>
      <p>&copy; 2024 Car Detailing Services</p>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

