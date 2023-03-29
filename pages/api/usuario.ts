import type {NextApiRequest, NextApiResponse} from 'next';
import { validarTokenJWT } from '../../middlewares/ValidarTokenJWT';

const usuarioEndPoint = (req: NextApiRequest, res: NextApiResponse) => {
    res.status(200).json('Usuario autenticado com sucesso');
}

export default validarTokenJWT(usuarioEndPoint);