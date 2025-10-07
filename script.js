fetch("./moviesData.json").then(res => res.json()).then(movies => {
    const swiperWrapper = document.querySelector(".swiper-wrapper");
    const titleImg = document.getElementById("movieTitleImage");
    const meta = document.getElementById("movieMeta");
    const desc = document.getElementById("movieDescription");
    const trailerFrame = document.getElementById("trailerFrame");
    const body = document.body; // 👈 for background changes

    // Insert slides dynamically
    swiperWrapper.innerHTML = movies.map(movie => `
      <div class="swiper-slide">
        <img src="${movie.bgImg}" alt="${movie.titleImg}">
      </div>
    `).join("");

    // Initialize Swiper
    const swiper = new Swiper(".swiper-container", {
        centeredSlides: true,
        loop: true,
        speed: 500,
        slidesPerView: 3,
        spaceBetween: 0,
    });

    // Function to update movie details + background
    const updateContent = (index) => {
        const movie = movies[index % movies.length];

        // 🎞️ Update text/image/trailer content
        titleImg.src = movie.titleImg;
        meta.innerHTML = `
        <span>${movie.year}</span>
        <span><i>${movie.rating}</i></span>
        <span>${movie.duration}</span>
        <span>${movie.genre}</span>
      `;
        desc.textContent = movie.description;
        trailerFrame.src = movie.trailer;

        // 🌈 Smoothly change body background
        body.style.transition = "background 1s ease-in-out";
        body.style.background = `
        linear-gradient(to bottom, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.9)),
        url('${movie.bgImg}') center/cover no-repeat
      `;
    };

    // Initial content + background
    updateContent(0);

    // Update when slide changes
    swiper.on("slideChange", () => {
        updateContent(swiper.realIndex);
    });
});