const OrganizationModel = {
    add: async (orgData) => {
        return {
            message: "Organization added successfully {Dummy}",
            organization: orgData
        };
    },
    view: async (orgId) => {
        if (orgId) {
            return [{
                org_id: orgId,
                name: "Acme Corp",
                description: "Sample organization",
                industry: "Technology",
                website: "https://acme.example.com",
                status: "active",
                created_at: "2023-01-01",
                updated_at: "2023-01-01"
            }];
        }
        return [
            {
                org_id: 1,
                name: "Acme Corp",
                description: "Technology solutions provider",
                industry: "Technology",
                website: "https://acme.example.com",
                status: "active",
                created_at: "2023-01-01",
                updated_at: "2023-01-01"
            },
            {
                org_id: 2,
                name: "Globex Inc",
                description: "Global manufacturing company",
                industry: "Manufacturing",
                website: "https://globex.example.com",
                status: "active",
                created_at: "2023-01-05",
                updated_at: "2023-02-15"
            }
        ];
    },
    update: async (orgData) => {
        if (!orgData.org_id) {
            return { error: "Organization ID is required for update" };
        }
        return {
            message: "Organization updated successfully {Dummy}",
            organization: orgData
        };
    },
    delete: async (orgId) => {
        if (!orgId) {
            return { error: "Organization ID is required for deletion" };
        }
        return {
            message: "Organization deleted successfully {Dummy}",
            org_id: orgId
        };
    }
};

export default OrganizationModel;