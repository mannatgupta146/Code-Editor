// script.js
document.addEventListener('DOMContentLoaded', () => {
    const editors = {
        html: document.getElementById('html-code'),
        css: document.getElementById('css-code'),
        js: document.getElementById('js-code'),
        output: document.getElementById('output')
    };

    // Debounce function for better performance
    const debounce = (callback, delay = 300) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => callback(...args), delay);
        };
    };

    const updatePreview = () => {
        try {
            const html = editors.html.value;
            const css = `<style>${editors.css.value}</style>`;
            const js = editors.js.value;
            
            const doc = editors.output.contentDocument;
            doc.open();
            doc.write(`${html}${css}<script>${js}<\/script>`);
            doc.close();
        } catch (error) {
            console.error('Error updating preview:', error);
        }
    };

    // Event listeners with debouncing
    editors.html.addEventListener('input', debounce(updatePreview));
    editors.css.addEventListener('input', debounce(updatePreview));
    editors.js.addEventListener('input', debounce(updatePreview));

    // Initial preview
    updatePreview();
});