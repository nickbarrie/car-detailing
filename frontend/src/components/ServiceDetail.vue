<template>
    <div>
        <main>
            <section id="services">
                <h2>Our Services</h2>
                <div class="services-container">
                    <div v-for="(service, index) in services" :key="index" class="service-card">
                        <div class="card" :class="{ flipped: flippedCards[index] }" @click="flipCard(index)">
                            <div class="card-front">
                                <img :src="service.imageSrc" :alt="service.title" />
                                <h3>{{ service.title }}</h3>
                            </div>
                            <div class="card-back">
                                <h3>{{ service.title }}</h3>
                                <p>{{ service.description }}</p>
                                <ul>
                                    <li v-for="detail in service.details" :key="detail">{{ detail }}</li>
                                </ul>
                                <p>{{ service.pricing }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            services: [
                {
                    imageSrc: '/sponge.png',
                    title: 'Exterior Wash',
                    description: 'Get your car looking shiny and new with our comprehensive exterior wash service.',
                    details: ['Hand wash', 'Waxing', 'Tire cleaning'],
                    pricing: '$50-$100 depending on condition and size of vehicle'
                },
                {
                    imageSrc: '/vaccum.png',
                    title: 'Interior Cleaning',
                    description: 'Keep the inside of your car spotless with our interior cleaning service.',
                    details: ['Vacuuming', 'Dashboard polish', 'Seat cleaning'],
                    pricing: '$60-$100 depending on condition and size of vehicle'
                },
                {
                    imageSrc: '/cleaningSet.png',
                    title: 'Full Detail',
                    description: 'Experience a complete car makeover with our full detail package.',
                    details: ['Exterior wash', 'Interior cleaning', 'Engine detail'],
                    pricing: '$100-$200 depending on condition and size of vehicle'
                }
            ],
            flippedCards: [false, false, false]
        };
    },
    methods: {
        flipCard(index) {
            this.flippedCards[index] = !this.flippedCards[index];
        }
    }
};
</script>

<style>
#services {
    text-align: center;
}

.services-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 40px;
    perspective: 1200px;
    flex-wrap: wrap;
}

/* ===== CARD WRAPPER ===== */
.service-card {
    width: 300px;
    height: 380px;
    position: relative;
    transition: transform 0.3s ease;
}

    .service-card:hover {
        transform: scale(1.05);
        transition-duration: .5s;
    
}

.card {
    width: 100%;
    height: 100%;
    transition: transform 0.6s ease;
    transform-style: preserve-3d;
    position: relative;
}

.card-front,
.card-back {
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    justify-content: center;
    align-items: center;
    text-align: center;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    position: absolute;
    top: 0;
    left: 0;
}

.card-front {
    background: #1a1a1a;
    border: 1px solid #2a2a2a;
    box-shadow: 0 8px 20px rgba(0, 0, 0, 0.5);
}

.card-front h3 {
    margin-top: 10px;
    color: #f5f5f5;
}

/* ===== BACK ===== */
.card-back {
    background: linear-gradient(135deg, #5a102a, #9f1239);
    color: white;
    transform: rotateY(180deg);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.6);
}

.card-back h3 {
    margin-bottom: 10px;
}

.card-back p {
    font-size: 0.9rem;
    margin-bottom: 10px;
}

.card-back ul {
    list-style: none;
    padding: 0;
    margin-bottom: 10px;
}

.card-back li {
    font-size: 0.9rem;
    margin: 5px 0;
}

/* ===== FLIP ===== */
.card.flipped {
    transform: rotateY(180deg);
}

/* ===== IMAGE ===== */
.service-card img {
    width: 80px;
    height: auto;
    margin-bottom: 15px;
    filter: brightness(0.9);
    transition: 0.3s ease;
}

.service-card:hover img {
    filter: brightness(1.2);
    transform: scale(1.05);
}

/* ===== RESPONSIVE ===== */
@media (max-width: 768px) {
    .services-container {
        flex-direction: column;
    }
}
</style>