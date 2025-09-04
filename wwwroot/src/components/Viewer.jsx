import React, { useEffect, useRef } from 'react';
import { viewerService } from '../services/viewerService';

const Viewer = ({ modelUrn, onViewerInit }) => {
    const viewerContainerRef = useRef(null);
    const viewerRef = useRef(null);

    useEffect(() => {
        initializeViewer();
        return () => {
            // Cleanup viewer on unmount
            if (viewerRef.current) {
                viewerRef.current.finish();
                viewerRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (modelUrn && viewerRef.current) {
            loadModel(modelUrn);
        }
    }, [modelUrn]);

    const initializeViewer = async () => {
        try {
            const viewer = await viewerService.initViewer(viewerContainerRef.current);
            viewerRef.current = viewer;
            onViewerInit(viewer);
        } catch (error) {
            console.error('Failed to initialize viewer:', error);
            // alert('Could not initialize viewer. See console for more details.');
        }
    };

    const loadModel = (urn) => {
        if (viewerRef.current) {
            viewerService.loadModel(viewerRef.current, urn);
        }
    };

    return <div ref={viewerContainerRef} id="preview"></div>;
};

export default Viewer;