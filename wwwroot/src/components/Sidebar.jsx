import React, { useEffect, useRef } from 'react';
import { hubsService } from '../services/hubsService';

const Sidebar = ({ onVersionSelect }) => {
    const treeContainerRef = useRef(null);
    const treeRef = useRef(null);

    useEffect(() => {
        initializeTree();
        return () => {
            // Cleanup tree if needed
            if (treeRef.current) {
                treeRef.current = null;
            }
        };
    }, []);

    const initializeTree = () => {
        if (!window.InspireTree || !window.InspireTreeDOM) {
            console.error('InspireTree libraries not loaded');
            return;
        }

        const tree = new window.InspireTree({
            data: function (node) {
                if (!node || !node.id) {
                    return hubsService.getHubs();
                } else {
                    const tokens = node.id.split('|');
                    switch (tokens[0]) {
                        case 'hub':
                            return hubsService.getProjects(tokens[1]);
                        case 'project':
                            return hubsService.getContents(tokens[1], tokens[2]);
                        case 'folder':
                            return hubsService.getContents(tokens[1], tokens[2], tokens[3]);
                        case 'item':
                            return hubsService.getVersions(tokens[1], tokens[2], tokens[3]);
                        default:
                            return [];
                    }
                }
            }
        });

        tree.on('node.click', function (event, node) {
            event.preventTreeDefault();
            const tokens = node.id.split('|');
            if (tokens[0] === 'version') {
                onVersionSelect(tokens[1]);
            }
        });

        treeRef.current = new window.InspireTreeDOM(tree, {
            target: treeContainerRef.current
        });
    };

    return (
        <div id="sidebar">
            <div ref={treeContainerRef} id="tree" />
        </div>
    );
};

export default Sidebar;