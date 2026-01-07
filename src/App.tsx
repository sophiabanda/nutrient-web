import { useEffect, useRef } from 'react';

function App() {
    const containerRef = useRef(null);

    useEffect(() => {
        const container = containerRef.current;
        let cleanup = () => {};

        (async () => {
            const NutrientViewer = (await import('@nutrient-sdk/viewer'))
                .default;

            // Ensure there’s only one `NutrientViewer` instance.
            NutrientViewer.unload(container);

            if (container && NutrientViewer) {
                NutrientViewer.load({
                    container,
                    // You can also specify a file in public directory, for example /nutrient-web-demo.pdf.
                    useCDN: true,
                    document:
                        'https://www.nutrient.io/downloads/nutrient-web-demo.pdf',
                    // '/resume.pdf',
                });
            }

            cleanup = () => {
                NutrientViewer.unload(container);
            };
        })();

        return cleanup;
    }, []);

    // Set the container height and width.
    return (
        // Make sure to set the container height and width explicitly.
        <div ref={containerRef} style={{ height: '100vh', width: '100vw' }} />
    );
}

export default App;
