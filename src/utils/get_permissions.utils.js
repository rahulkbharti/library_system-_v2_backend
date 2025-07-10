import runQuery from "../helper/query.helper.js";

const Permissions = async (email) => {
  const query = ` 
SELECT p.permission_key as permission, p.description
FROM permissions p
WHERE p.id IN (
    SELECT gp.permission_id
    FROM group_permissions gp
    WHERE gp.group_id IN (
        SELECT s.group_id
        FROM staffs s
        WHERE s.user_id = (
            SELECT u.user_id 
            FROM users u 
            WHERE u.email = ?
        )
    )
);`;
 const result =  await runQuery(query,[email]);
 if(result.error) return result.error;
 return result;
};

export default Permissions;
