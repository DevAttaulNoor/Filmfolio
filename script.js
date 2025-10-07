fetch("./moviesData.json")
    .then(res => res.json())
    .then(movies => {
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        const titleImg = document.getElementById("movieTitleImage");
        const meta = document.getElementById("movieMeta");
        const desc = document.getElementById("movieDescription");
        const trailerFrame = document.getElementById("trailerFrame");
        const body = document.body;
        const watchTrailerBtn = document.getElementById("watchTrailerBtn");
        const trailerContainer = document.querySelector(".trailerContainer");
        const closeBtn = document.querySelector(".trailerContainer #close");

        // Insert slides dynamically
        swiperWrapper.innerHTML = movies
            .map(movie => `
        <div class="swiper-slide">
          <img src="${movie.bgImg}" alt="${movie.titleImg}">
        </div>
      `)
            .join("");

        // Initialize Swiper with responsive breakpoints
        const swiper = new Swiper(".swiper-container", {
            centeredSlides: true,
            loop: true,
            speed: 500,
            slidesPerView: 3,
            spaceBetween: 0,
            breakpoints: {
                0: { slidesPerView: 1.5 },
                480: { slidesPerView: 2.5 },
                768: { slidesPerView: 2 },
                1024: { slidesPerView: 2.5 },
                1280: { slidesPerView: 3 }
            }
        });

        // Function to update movie details + background + trailer
        const updateContent = (index) => {
            const movie = movies[index % movies.length];

            titleImg.src = movie.titleImg;
            titleImg.alt = movie.titleImg;

            meta.innerHTML = `
        <span>${movie.year}</span>
        <span><i>${movie.rating}</i></span>
        <span>${movie.duration}</span>
        <span>${movie.genre}</span>
      `;

            desc.textContent = movie.description;

            // Store trailer link for button click
            watchTrailerBtn.dataset.trailer = movie.trailer;

            // Smoothly change body background
            body.style.transition = "background 1s ease-in-out";
            body.style.background = `
        linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)),
        url('${movie.bgImg}') center/cover no-repeat
      `;
        };

        // Load initial content
        updateContent(swiper.realIndex);

        // Update content on slide change
        swiper.on("slideChange", () => {
            updateContent(swiper.realIndex);
        });

        // Open trailer modal
        watchTrailerBtn.addEventListener("click", () => {
            trailerContainer.classList.add("show");
            trailerFrame.src = watchTrailerBtn.dataset.trailer;
        });

        // Close trailer modal
        closeBtn.addEventListener("click", () => {
            trailerContainer.classList.remove("show");
            trailerFrame.src = ""; // Stop trailer
        });
    })
    .catch(err => console.error("Error loading movies data:", err));