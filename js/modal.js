(() => {

    // return on mobile
    if (navigator.userAgent.match(/Android/i) ||
        navigator.userAgent.match(/iPhone/i) ||
        navigator.userAgent.match(/iPad/i)) {
        return;
    }

    let modal = document.getElementById('modal');
    let image = document.getElementById('modal-image');
    let video = document.getElementById('modal-video');

    /** @type {Element} */
    let media;
    /** @type {string} */
    let mediaEvent;

    /** @type {Animation} */
    let backgroundAnimation;
    /** @type {Animation} */
    let mediaAnimation;
    let leaving = false;

    for (let item of document.getElementsByClassName('zoomable')) {
        item.addEventListener('click', evt => {
            let target = evt.target;

            modal.style.visibility = 'visible';
            backgroundAnimation = modal.animate(
                [
                    { backgroundColor: 'rgba(0, 0, 0, 0)' },
                    { backgroundColor: 'rgba(0, 0, 0, 0.85)' },
                ], {
                duration: 200,
                easing: 'ease-out',
            });

            if (target.tagName == 'IMG') {
                media = image;
                media.src = target.src;
                mediaEvent = 'onload';
            } else {
                media = video;

                let a = target.getElementsByTagName('source');
                let b = media.getElementsByTagName('source');
                b[0].src = a[0].src;
                b[1].src = a[1].src;
                b[0].type = a[0].type;
                b[1].type = a[1].type;

                media.load();
                mediaEvent = 'oncanplay';
            }

            media[mediaEvent] = () => {
                media[mediaEvent] = null;
                media.style.display = 'block';

                let srcRect = target.getBoundingClientRect();
                let dstRect = media.getBoundingClientRect();

                mediaAnimation = media.animate(
                    [
                        { position: 'absolute', left: srcRect.left + 'px', top: srcRect.top + 'px', width: srcRect.width + 'px' },
                        { position: 'absolute', left: dstRect.left + 'px', top: dstRect.top + 'px', width: dstRect.width + 'px' },
                    ], {
                    duration: 200,
                    easing: 'ease-out',
                });
            };
        });
    }

    modal.addEventListener('click', () => {
        if (!leaving) {
            leaving = true;

            backgroundAnimation.onfinish = () => {
                leaving = false;
                modal.style.visibility = 'hidden';
            }
            backgroundAnimation.playbackRate = -1;
            backgroundAnimation.play();

            if (mediaAnimation) {
                mediaAnimation.onfinish = () => {
                    media.style.display = 'none';
                }
                mediaAnimation.playbackRate = -1;
                mediaAnimation.play();
                mediaAnimation = null;
            } else {
                media[mediaEvent] = null;
            }
        }
    });

})();
