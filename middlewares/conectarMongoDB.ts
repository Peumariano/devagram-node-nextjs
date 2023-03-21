import {NextApiRequest, NextApiResponse, NextApiHandler} from 'next';
import mongoose from 'mongoose';
import type {RespostaPadraoMsg} from '../types/RespostaPadraoMsg';

export const conectarMongoDB = (handler : NextApiHandler) => 
    async (req : NextApiRequest, res : NextApiResponse<RespostaPadraoMsg>) => {

        //verificar se o bamco de dados esta conectado, se estiver seguir para o endpoint
        // ou proximo middleware
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        //se nao estiver conectado vamos conectar
        //obter a variacvel de ambiente preechida no env
        const {DB_CONEXAO_STRING} = process.env;

        //se a env estiver vazia aborta o uso do sistema e avisa o  programador
        if (!DB_CONEXAO_STRING) {
            return res.status(500).json({ erro: 'Env de configuração do banco de dados não informada'});
        }
        mongoose.connection.on('connected', () => console.log('Banco de dados conectado com sucesso'));
        mongoose.connection.on('error', () => console.log('Ocorreu um erro ao conectar ao banco: ${error}'));
        await mongoose.connect(DB_CONEXAO_STRING);

        //agora posso seguir para o endpoint pois estou conectado no banco
        return handler(req, res);
    }