const GroupModel = {
    add: async (groupData) => {
        return {
            message: "Group added successfully {Dummy}",
            group: groupData
        };
    },
    view: async (groupId) => {
        if (groupId) {
            return [{
                group_id: groupId,
                name: "Sample Group",
                description: "This is a sample group",
                created_at: "2023-01-01",
                created_by: 101,
                status: "active"
            }];
        }
        return [
            {
                group_id: 1,
                name: "Admin Team",
                description: "Administrators group",
                created_at: "2023-01-01",
                created_by: 101,
                status: "active"
            },
            {
                group_id: 2,
                name: "Developers",
                description: "Software development team",
                created_at: "2023-01-02",
                created_by: 102,
                status: "active"
            }
        ];
    },
    update: async (groupData) => {
        if (!groupData.group_id) {
            return { error: "Group ID is required for update" };
        }
        return {
            message: "Group updated successfully {Dummy}",
            group: groupData
        };
    },
    delete: async (groupId) => {
        if (!groupId) {
            return { error: "Group ID is required for deletion" };
        }
        return {
            message: "Group deleted successfully {Dummy}",
            group_id: groupId
        };
    }
};

export default GroupModel;