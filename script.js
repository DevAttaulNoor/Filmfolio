fetch("./moviesData.json")
    .then(res => res.json())
    .then(movies => {
        const swiperWrapper = document.querySelector(".swiper-wrapper");
        const titleImg = document.getElementById("movieTitleImage");
        const meta = document.getElementById("movieMeta");
        const desc = document.getElementById("movieDescription");
        const trailerFrame = document.getElementById("trailerFrame");
        const body = document.body;

        const trailerContainer = document.querySelector(".trailerContainer");
        const watchTrailerBtn = document.getElementById("watchTrailerBtn");
        const closeTrailerBtn = document.querySelector(".trailerContainer #close");

        // Insert slides dynamically
        swiperWrapper.innerHTML = movies
            .map(movie => `
      <div class="swiper-slide">
        <img src="${movie.bgImg}" alt="${movie.titleImg}">
      </div>
    `)
            .join("");

        // Initialize Swiper
        const swiper = new Swiper(".swiper-container", {
            centeredSlides: true,
            loop: true,
            speed: 500,
            slidesPerView: 3.5,
            spaceBetween: 0,
            breakpoints: {
                0: { slidesPerView: 1.5 },
                480: { slidesPerView: 1.8 },
                768: { slidesPerView: 2.5 },
                1024: { slidesPerView: 3.5 }
            }
        });

        // Function to update content
        const updateContent = (index) => {
            const movie = movies[index % movies.length];

            titleImg.src = movie.titleImg;
            titleImg.alt = movie.title;

            meta.innerHTML = `
        <span>${movie.year}</span>
        <span><i>${movie.rating}</i></span>
        <span>${movie.duration}</span>
        <span>${movie.genre}</span>
      `;

            desc.textContent = movie.description;

            trailerFrame.src = movie.trailer;

            body.style.transition = "background 1s ease-in-out";
            body.style.background = `
        linear-gradient(to bottom, rgba(0,0,0,0.6), rgba(0,0,0,0.9)),
        url('${movie.bgImg}') center/cover no-repeat
      `;
        };

        // Initial content load
        updateContent(swiper.realIndex);

        // Update content on slide change
        swiper.on("slideChange", () => {
            updateContent(swiper.realIndex);
        });

        // Trailer modal show/hide
        watchTrailerBtn.addEventListener("click", () => {
            trailerContainer.classList.add("show");
        });

        closeTrailerBtn.addEventListener("click", () => {
            trailerContainer.classList.remove("show");
            trailerFrame.src = ""; // Stop video playback
        });
    })
    .catch(err => console.error("Error loading movies data:", err));