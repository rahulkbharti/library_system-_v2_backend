const GroupPermissionsModel = {
    add: async (permissionData) => {
        return {
            message: "Group permission added successfully {Dummy}",
            permission: permissionData
        };
    },
    view: async (permissionId) => {
        if (permissionId) {
            return [{
                permission_id: permissionId,
                group_id: 1,
                resource: "dashboard",
                can_view: true,
                can_edit: false,
                can_delete: false,
                created_at: "2023-01-01"
            }];
        }
        return [
            {
                permission_id: 1,
                group_id: 1,
                resource: "dashboard",
                can_view: true,
                can_edit: false,
                can_delete: false,
                created_at: "2023-01-01"
            },
            {
                permission_id: 2,
                group_id: 2,
                resource: "settings",
                can_view: true,
                can_edit: true,
                can_delete: false,
                created_at: "2023-01-02"
            }
        ];
    },
    update: async (permissionData) => {
        if (!permissionData.permission_id) {
            return { error: "Permission ID is required for update" };
        }
        return {
            message: "Group permission updated successfully {Dummy}",
            permission: permissionData
        };
    },
    delete: async (permissionId) => {
        if (!permissionId) {
            return { error: "Permission ID is required for deletion" };
        }
        return {
            message: "Group permission deleted successfully {Dummy}",
            permission_id: permissionId
        };
    }
};

export default GroupPermissionsModel;