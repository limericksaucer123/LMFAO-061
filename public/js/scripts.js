

/**
 * Eleventy Client-Side Scripts
 * Place this in /src/assets/js/scripts.js 
 * and ensure it's copied via addPassthroughCopy in .eleventy.js
 */

$(document).ready(function () {

    // ===== 1. Menu Toggle =====
    // Tip: Use 'button' tags for .menu-toggle for better accessibility in 11ty layouts
    $('.menu-toggle').on('click', function () {
        $('.nav, .nav ul').toggleClass('showing');
    });

    // ===== 2. Slick Slider =====
    // Ensure .post-wrapper contains your Eleventy {% for %} loop items
    $('.post-wrapper').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 2000,
        // Using custom arrows defined in your layout
        nextArrow: $('.next'),
        prevArrow: $('.prev'),
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3,
                    infinite: true,
                    dots: true
                }
            },
            {
                breakpoint: 768, // Adjusted standard breakpoint
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    // In scripts.js
$('.post-wrapper').slick({
    // ... your previous settings ...
});

// Add this:
// Recalculate layout once all images in the carousel are fully loaded
$('.post-wrapper').on('lazyLoaded', function(event, slick, image, source){
    $(this).slick('setPosition');
});
// A fallback for standard loading:
$(window).on('load', function() {
    $('.post-wrapper').slick('setPosition');
});

    // ===== 3. CKEditor (Conditional) =====
    // In Eleventy, we check if the element exists to avoid console errors
    // on pages that don't have the editor (like the homepage).
    const editorElement = document.querySelector('#body');
    
    if (editorElement) {
        ClassicEditor
            .create(editorElement, {
                toolbar: [
                    'heading', '|', 'bold', 'italic', 'link', 
                    'bulletedList', 'numberedList', 'blockQuote'
                ],
                heading: {
                    options: [
                        { model: 'paragraph', title: 'Paragraph', class: 'ck-heading_paragraph' },
                        { model: 'heading1', view: 'h1', title: 'Heading 1', class: 'ck-heading_heading1' },
                        { model: 'heading2', view: 'h2', title: 'Heading 2', class: 'ck-heading_heading2' }
                    ]
                }
            })
            .catch(error => {
                console.warn('CKEditor failed to load. This is expected if the script is missing on this page.');
                console.error(error);
            });
    }
});