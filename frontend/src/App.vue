<template>
  <div>
    <header>
      <div class="settings">
        <router-link to="/admin">
          <img src="/settings.png" alt="Settings" />
        </router-link>
      </div>
      <div class="titleBox">
        
        <div class="headerItem">
          <img src="/BarrieCleanLogo.png" alt="Car Detailing Services" />
        </div>
        <div class="headerItem">
          <h1>Barrie Clean Car Detailing Services</h1>
        </div>
        <div class="headerItem">
          <img src="/BarrieCleanLogo.png" alt="Car Detailing Services" />
        </div>
        
      </div>
      <nav>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li><router-link to="/service">Service</router-link></li>
          <li><router-link to="/calendar">Bookings</router-link></li>
          <li><router-link to="/contact">Contact</router-link></li>
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
