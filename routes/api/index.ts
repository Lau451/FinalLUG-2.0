import { Router } from 'express';
import cartRoutes from './cart';
import productRoutes from './product';


const router = Router();

router.use('/cart', cartRoutes);
router.use('/product', productRoutes);

// se pueden agregar todas las rutas que se necesiten, estaran dentro de /api
export default router;