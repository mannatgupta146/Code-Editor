// script.js
document.addEventListener('DOMContentLoaded', () => {
    // DOM Elements
    const tabs = document.querySelectorAll('.tab');
    const editors = document.querySelectorAll('.code-editor');
    const htmlEditor = document.getElementById('html-code');
    const cssEditor = document.getElementById('css-code');
    const jsEditor = document.getElementById('js-code');
    const output = document.getElementById('output');
    const refreshBtn = document.querySelector('.refresh-btn');
    const resetBtn = document.querySelector('.reset-btn');
    const fullscreenBtn = document.querySelector('.fullscreen-btn');
    const statusIndicator = document.createElement('span');
    statusIndicator.className = 'status-indicator';
    document.querySelector('.preview-header').appendChild(statusIndicator);

    // State
    let isFullscreen = false;

    // Tab Switching
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            editors.forEach(e => e.classList.remove('active'));
            
            tab.classList.add('active');
            const editorType = tab.dataset.editor;
            document.querySelector(`.${editorType}-editor`).classList.add('active');
        });
    });

    // Update Preview
    const updatePreview = () => {
        statusIndicator.classList.add('active');
        
        try {
            const html = htmlEditor.value;
            const css = `<style>${cssEditor.value}</style>`;
            const js = `<script>${jsEditor.value}<\/script>`;
            
            const doc = output.contentDocument;
            doc.open();
            doc.write(html + css + js);
            doc.close();
        } catch (error) {
            console.error('Error updating preview:', error);
        }
        
        setTimeout(() => {
            statusIndicator.classList.remove('active');
        }, 1000);
    };

    // Debounce Function
    const debounce = (func, delay = 300) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), delay);
        };
    };

    // Fullscreen Toggle
    const toggleFullscreen = () => {
        if (!isFullscreen) {
            document.querySelector('.preview-side').requestFullscreen()
                .then(() => {
                    isFullscreen = true;
                    fullscreenBtn.innerHTML = '<i class="fa-solid fa-compress"></i>';
                    fullscreenBtn.title = 'Exit Fullscreen';
                })
                .catch(err => {
                    console.error('Fullscreen error:', err);
                });
        } else {
            document.exitFullscreen()
                .then(() => {
                    isFullscreen = false;
                    fullscreenBtn.innerHTML = '<i class="fa-solid fa-expand"></i>';
                    fullscreenBtn.title = 'Enter Fullscreen';
                })
                .catch(err => {
                    console.error('Exit fullscreen error:', err);
                });
        }
    };

    // Reset Editors
    const resetEditors = () => {
        if (confirm('Are you sure you want to reset all code?')) {
            htmlEditor.value = '';
            cssEditor.value = '';
            jsEditor.value = '';
            updatePreview();
        }
    };

    // Event Listeners
    htmlEditor.addEventListener('input', debounce(updatePreview));
    cssEditor.addEventListener('input', debounce(updatePreview));
    jsEditor.addEventListener('input', debounce(updatePreview));
    refreshBtn.addEventListener('click', updatePreview);
    resetBtn.addEventListener('click', resetEditors);
    fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Fullscreen Change Handler
    document.addEventListener('fullscreenchange', () => {
        isFullscreen = !!document.fullscreenElement;
        fullscreenBtn.innerHTML = isFullscreen ? 
            '<i class="fa-solid fa-compress"></i>' : 
            '<i class="fa-solid fa-expand"></i>';
        fullscreenBtn.title = isFullscreen ? 'Exit Fullscreen' : 'Enter Fullscreen';
    });

    // Initial Preview
    updatePreview();
});