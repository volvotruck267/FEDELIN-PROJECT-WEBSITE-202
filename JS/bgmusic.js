document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('backgroundMusic');
    const playPauseBtn = document.getElementById('playPauseBtn');
    const volumeBtn = document.getElementById('volumeBtn');
    const musicControl = document.getElementById('musicControl');
    
    let isPlaying = false;
    let isMuted = false;
    
    audio.volume = 0.75;
    
    // Show/hide controls based on scroll position
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const windowHeight = window.innerHeight;
        const documentElement = document.documentElement.scrollHeight;
        
        if (scrollTop + window.innerHeight >= documentElement - 100) {
            musicControl.classList.add('show');
        } else {
            musicControl.classList.remove('show');
        }
    });
    
    playPauseBtn.addEventListener('click', function() {
        if (isPlaying) {
            audio.pause();
            playPauseBtn.textContent = '▶️';
            isPlaying = false;
        } else {
            audio.play().then(() => {
                playPauseBtn.textContent = '⏸️';
                isPlaying = true;
            }).catch(error => {
                console.log('Audio play failed:', error);
            });
        }
    });
    
    volumeBtn.addEventListener('click', function() {
        if (isMuted) {
            audio.volume = 0.75;
            volumeBtn.textContent = '🔊';
            isMuted = false;
        } else {
            audio.volume = 0;
            volumeBtn.textContent = '🔇';
            isMuted = true;
        }
    });
    
    // Auto-play music immediately when page loads
    audio.play().then(() => {
        playPauseBtn.textContent = '⏸️';
        isPlaying = true;
        console.log('Music started playing automatically');
    }).catch(error => {
        console.log('Autoplay blocked, user interaction required:', error);
        // If autoplay fails, try again on first user interaction
        document.addEventListener('click', function() {
            if (!isPlaying) {
                audio.play().then(() => {
                    playPauseBtn.textContent = '⏸️';
                    isPlaying = true;
                });
            }
        }, { once: true });
    });
});