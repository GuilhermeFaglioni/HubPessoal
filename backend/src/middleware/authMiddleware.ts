import  jwt  from "jsonwebtoken";

export function authMiddleware(req: any, res: any, next: any) {
    const authHeader = req.headers['authorization'];
    if(!authHeader) {
        return res.status(401).json({message: 'Token não fornecido'});
    }

    const token = authHeader.split(' ')[1];
    if(!token) {
        return res.status(401).json({message: 'Token malformado'});
    }

    const jwtSecret = process.env.JWT_SECRET;
    if(!jwtSecret) {
        return res.status(500).json({message: 'Erro no servidor'});
    }

    try {
        const decodedPayload = jwt.verify(token, jwtSecret);

        req.user = decodedPayload;
        next();
    } catch (error) {
        return res.status(401).json({message: 'Token inválido'});
    }
}