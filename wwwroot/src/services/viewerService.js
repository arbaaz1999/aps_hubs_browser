import { authService } from './authService';

class ViewerService {
    initViewer(container) {
        return new Promise((resolve, reject) => {
            if (!window.Autodesk || !window.Autodesk.Viewing) {
                reject(new Error('Autodesk Viewing libraries not loaded'));
                return;
            }

            window.Autodesk.Viewing.Initializer(
                {
                    env: 'AutodeskProduction',
                    getAccessToken: authService.getAccessToken.bind(authService)
                },
                () => {
                    const config = {
                        extensions: ['Autodesk.DocumentBrowser']
                    };
                    const viewer = new window.Autodesk.Viewing.GuiViewer3D(container, config);
                    viewer.start();
                    viewer.setTheme('light-theme');
                    resolve(viewer);
                }
            );
        });
    }

    loadModel(viewer, urn) {
        const onDocumentLoadSuccess = (doc) => {
            viewer.loadDocumentNode(doc, doc.getRoot().getDefaultGeometry());
        };

        const onDocumentLoadFailure = (code, message) => {
            // alert('Could not load model. See console for more details.');
            console.error(message);
        };

        if (window.Autodesk && window.Autodesk.Viewing && window.Autodesk.Viewing.Document) {
            window.Autodesk.Viewing.Document.load(
                'urn:' + urn,
                onDocumentLoadSuccess,
                onDocumentLoadFailure
            );
        }
    }
}

export const viewerService = new ViewerService();