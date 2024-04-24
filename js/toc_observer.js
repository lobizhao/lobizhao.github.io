(() => {

    const catalog = document.getElementById('catalog');
    const content = document.getElementById('content');

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const id = entry.target.firstChild.getAttribute('id');
            if (entry.intersectionRatio > 0) {
                catalog.querySelector(`li a[href="#${id}"]`).classList.add('active');
            } else {
                catalog.querySelector(`li a[href="#${id}"]`).classList.remove('active');
            }
        });
    });

    const container = document.createElement('div');

    /** @type {HTMLElement} */
    let section = null

    content.childNodes.forEach(child => {
        if (child.tagName == 'H1' || child.tagName == 'H2' || child.tagName == 'H3' ||
            child.tagName == 'H4' || child.tagName == 'H5' || child.tagName == 'H6') {
            section = document.createElement('section');
            container.appendChild(section);
            observer.observe(section);
        }

        if (section) {
            section.appendChild(child);
        }
    });

    content.appendChild(container);

})();

