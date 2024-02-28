const router = require('express').Router();
import apiRoutes from './api/';
import homeRoutes from './homeRoutes';
import dashboardRoutes from './dashboardRoutes';

router.use('/', homeRoutes);
router.use('/api', apiRoutes);
router.use('/dashboard', dashboardRoutes);

export default router