function moveIndicator(index) {
    const indicator = document.querySelector('.indicator');
    const items = document.querySelectorAll('.nav-item');

    // Move the blue bar: index 0 = 0%, index 1 = 100%, etc.
    indicator.style.transform = `translateX(${index * 100}%)`;

    // Update active color for text/icons
    items.forEach(item => item.classList.remove('active'));
    items[index].classList.add('active');
}

// Logic for the "Done" button to navigate back Home
function navigateTo(index) {
    // 1. Move the navigation bar highlight
    moveIndicator(index);
    
    // 2. Add your page transition logic here
    console.log("Navigating to item index: " + index);
    
    // Optional: Hide the success message after clicking
    document.querySelector('.success-card').style.opacity = "0.5";
}