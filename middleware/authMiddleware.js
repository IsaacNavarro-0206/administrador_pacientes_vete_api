import jwt from 'jsonwebtoken';
import Veterinario from '../models/Veterinario.js';

const checkAuth = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            // Eliminar la palabra bearer del token
            token = req.headers.authorization.split(' ')[1];

            // Decoded al token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Crear una sesión con la información del veterinario
            req.veterinario = await Veterinario.findById(decoded.id).select('-password -token -confirmado');
            return next();
        } catch (e) {
            const error = new Error('Token no válido');
            return res.status(403).json({ msg: error.message });
        }
    }

    if (!token) {
        const error = new Error('Token no válido o inexistente');
        res.status(403).json({ msg: error.message });
    }

    next();
}

export default checkAuth;