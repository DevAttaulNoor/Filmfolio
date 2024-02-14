$(document).ready(function () {
    // Initialize the carousel
    $('.carousel').carousel();

    // When the carousel changes its active item
    $('.carousel').on('click', '.carousel-item', function () {
        // Get the index of the clicked carousel item
        var index = $(this).index();

        // Find the corresponding image URL in the bodyLeft section
        var bgImageUrl = [
            'Images/movies/bg-little-mermaid.jpg',
            'Images/movies/bg-the-black-demon.jpeg',
            'Images/movies/bg-the-covenant.jpeg',
            'Images/movies/bg-the-tank.jpeg',
            'Images/movies/bg-65.jpeg'
        ];

        // Change the background image URL of the body
        $('body').css('background-image', 'url(' + bgImageUrl[index] + ')');

        // Find the corresponding image in the bodyLeft section
        var $bodyLeftImages = $('.bodyLeft_Top img');

        // Find the corresponding image URL in the bodyLeft section
        var movieLogoUrl = [
            "Images/the-little-mermaid-title.png",
            "Images/the-black-demon-title.png",
            "Images/the-covenant-title.png",
            "Images/the-tank-title.png",
            "Images/the-65-title.png"
        ];

        // Set the src attribute of the image in the bodyLeft section
        $bodyLeftImages.attr('src', movieLogoUrl[index]);
    });
});
