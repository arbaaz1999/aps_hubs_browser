import { customFetch } from "./customFetch";

class HubsService {
    async getJSON(url) {
        const resp = await customFetch(url);
        if (!resp.ok) {
            // alert('Could not load tree data. See console for more details.');
            console.error(await resp.text());
            return [];
        }
        return resp.json();
    }

    createTreeNode(id, text, icon, children = false) {
        return { id, text, children, itree: { icon } };
    }

    async getHubs() {
        const hubs = await this.getJSON('/api/hubs');
        return hubs.map(hub =>
            this.createTreeNode(`hub|${hub.id}`, hub.name, 'icon-hub', true)
        );
    }

    async getProjects(hubId) {
        const projects = await this.getJSON(`/api/hubs/${hubId}/projects`);
        return projects.map(project =>
            this.createTreeNode(`project|${hubId}|${project.id}`, project.name, 'icon-project', true)
        );
    }

    async getContents(hubId, projectId, folderId = null) {
        const url = `/api/hubs/${hubId}/projects/${projectId}/contents` +
            (folderId ? `?folder_id=${folderId}` : '');
        const contents = await this.getJSON(url);
        return contents.map(item => {
            if (item.folder) {
                return this.createTreeNode(
                    `folder|${hubId}|${projectId}|${item.id}`,
                    item.name,
                    'icon-my-folder',
                    true
                );
            } else {
                return this.createTreeNode(
                    `item|${hubId}|${projectId}|${item.id}`,
                    item.name,
                    'icon-item',
                    true
                );
            }
        });
    }

    async getVersions(hubId, projectId, itemId) {
        const versions = await this.getJSON(`/api/hubs/${hubId}/projects/${projectId}/contents/${itemId}/versions`);
        return versions.map(version =>
            this.createTreeNode(`version|${version.id}`, version.name, 'icon-version')
        );
    }
}

export const hubsService = new HubsService();