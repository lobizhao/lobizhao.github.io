(() => {

    const lazyLoadObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                lazyLoadObserver.unobserve(entry.target);
                entry.target.load();
                entry.target.onloadeddata = (event) => {
                    let loadingIcon = event.target.parentElement.getElementsByClassName('loading');
                    loadingIcon[0].style.display = 'none';
                }
            }
        });
    });

    const playPauseObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.readyState >= 2) {
                    entry.target.loop = true;
                    entry.target.play();
                } else {
                    entry.target.oncanplay = (event) => {
                        event.target.loop = true;
                        event.target.play();
                        event.target.oncanplay = null;
                    }
                }
            } else {
                if (entry.target.oncanplay) {
                    entry.target.oncanplay = null;
                } else {
                    entry.target.pause();
                }
            }
        });
    });

    for (let video of document.getElementsByTagName('video')) {
        if (video.classList.contains('zoomable')) {
            lazyLoadObserver.observe(video);
            playPauseObserver.observe(video);
        }
    }

})();
