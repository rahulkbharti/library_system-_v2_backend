const PermissionModel = {
    add: async (permissionData) => {
        return {
            message: "Permission added successfully {Dummy}",
            permission: permissionData
        };
    },
    view: async (permissionId) => {
        if (permissionId) {
            return [{
                permission_id: permissionId,
                name: "create_content",
                description: "Allows creating new content",
                category: "content",
                is_system: false,
                created_at: "2023-01-01"
            }];
        }
        return [
            {
                permission_id: 1,
                name: "create_content",
                description: "Allows creating new content",
                category: "content",
                is_system: false,
                created_at: "2023-01-01"
            },
            {
                permission_id: 2,
                name: "delete_users",
                description: "Allows deleting user accounts",
                category: "administration",
                is_system: true,
                created_at: "2023-01-01"
            }
        ];
    },
    update: async (permissionData) => {
        if (!permissionData.permission_id) {
            return { error: "Permission ID is required for update" };
        }
        return {
            message: "Permission updated successfully {Dummy}",
            permission: permissionData
        };
    },
    delete: async (permissionId) => {
        if (!permissionId) {
            return { error: "Permission ID is required for deletion" };
        }
        return {
            message: "Permission deleted successfully {Dummy}",
            permission_id: permissionId
        };
    }
};

export default PermissionModel;