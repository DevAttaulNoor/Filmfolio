let currentIndex = 0;
const slides = document.querySelectorAll('.movie-banners img');
const totalSlides = slides.length;

function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    
    slides.forEach((slide, index) => {
        const distance = Math.abs(index - currentIndex);
        const scale = 1 / (distance + 1);
        const opacity = scale > 0.5 ? 1 : 0.5; // Adjust opacity based on scale
        slide.style.transform = `scale(${scale})`;
        slide.style.opacity = opacity;
    });

    const offset = -currentIndex * 100;
    document.querySelector('.movie-banners').style.transform = `translateX(${offset}%)`;
}
