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
    gap: 50px;
    height: 100%;
    perspective: 1000px;
}

.service-card {
    width: 100%;
    height: 350px;
    position: relative;
}

    .service-card:hover {
        transform: scale(1.05);
        transition-duration: .5s;
    
}

.card {
    width: 100%;
    height: 100%;
    transition: transform 0.6s;
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
    background-color: #f9f9f9;
}

.card-back {
    background-color: #2196f3;
    color: white;
    transform: rotateY(180deg);
}

.card.flipped {
    transform: rotateY(180deg);
}

.service-card img {
    width: 30%;
    height: auto;
    border-radius: 5px;
    margin-bottom: 15px;
    max-width: 100%;
    


}

@media (max-width: 768px) {
    .services-container {
        flex-direction: column;
    }
}

@media (min-width: 768px) {
    .services-container {
        flex-direction: row;
    }
}
</style>