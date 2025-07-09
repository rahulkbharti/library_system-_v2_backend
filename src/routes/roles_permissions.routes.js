import express from 'express';
import GroupRouter from './roles_organizations/groups.routes.js';
import PermissionRouter from './roles_organizations/permissions.routes.js';
import PermissionGroupRouter from './roles_organizations/groups_permissions.routes.js';

const router = express.Router();

router.use('/groups', GroupRouter);
router.use('/permissions', PermissionRouter);
router.use('/group-permissions', PermissionGroupRouter);

export default router;