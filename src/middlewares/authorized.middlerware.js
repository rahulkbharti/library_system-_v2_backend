import runQuery from "../helper/query.helper.js";

const CheckPermission = async (permission, email) => {
  const query = `
    SELECT EXISTS (
      SELECT 1
      FROM users u
      JOIN staffs s ON u.user_id = s.user_id
      JOIN group_permissions gp ON s.group_id = gp.group_id
      JOIN permissions p ON gp.permission_id = p.id
      WHERE u.email = ?
      AND p.permission_key = ?
    ) AS has_permission
  `;
  
  try {
    const result = await runQuery(query, [email, permission]);
    return result[0]?.has_permission === 1;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
};

const authorize = (requiredPermission) => {
  return async (req, res, next) => {
    try {
      if (!req.user) {
        return res.status(401).json({
          error: 'Authentication required first',
          code: 'UNAUTHENTICATED'
        });
      }

      const hasPermission = await CheckPermission(requiredPermission, req.user.email);
      
      if (!hasPermission) {
        return res.status(403).json({
          error: `Requires ${requiredPermission} permission`,
          code: 'INSUFFICIENT_PERMISSIONS'
        });
      }

      next();
    } catch (error) {
      console.error('Authorization error:', error);
      res.status(500).json({
        error: 'Authorization check failed',
        code: 'AUTHZ_ERROR'
      });
    }
  };
};

export default authorize;