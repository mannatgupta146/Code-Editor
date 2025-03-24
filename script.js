function run() {
    let htmlCode = document.getElementById("html-code").value;
    let cssCode = document.getElementById("css-code").value;
    let jsCode = document.getElementById("js-code").value;
    let output = document.getElementById("output");

    const documentContent = `
        <html>
            <head>
                <style>${cssCode}</style>
            </head>
            <body>
                ${htmlCode}
                <script>
                    try {
                        ${jsCode}
                    } catch (error) {
                        console.error(error);
                    }
                </script>
            </body>
        </html>`;

    output.contentDocument.open();
    output.contentDocument.write(documentContent);
    output.contentDocument.close();
}

// Debounce function to prevent excessive function calls on keyup
let timeout;
document.querySelectorAll("textarea").forEach((textarea) => {
    textarea.addEventListener("keyup", () => {
        clearTimeout(timeout);
        timeout = setTimeout(run, 500);
    });
});
