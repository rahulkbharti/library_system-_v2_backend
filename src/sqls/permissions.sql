select p.key from  group_permissions gp
inner join permissions p on p.id = gp.permission_id 
where gp.group_id = 1;

-- check if user has permission to edit book (Specific permission)
-- This query checks if a user with the email 
SELECT EXISTS (
    SELECT 1
    FROM users u
    JOIN staffs s ON u.user_id = s.user_id
    JOIN group_permissions gp ON s.group_id = gp.group_id
    JOIN permissions p ON gp.permission_id = p.id
    WHERE u.email = "bob@example.com"
    AND p.permission_key = 'EDIT_BOOK'
) AS has_permission;

-- Get all permissions for a user by email
SELECT p.permission_key as permission, p.description
FROM permissions p
WHERE p.id IN (
    SELECT gp.permission_id
    FROM group_permissions gp
    JOIN staffs s ON gp.group_id = s.group_id
    JOIN users u ON s.user_id = u.user_id
    WHERE u.email = "bob@example.com"
);


select * from group_permissions gp 
inner join staffs s on gp.group_id = gp.group_id ;