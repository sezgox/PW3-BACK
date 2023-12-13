import cors from 'cors';
import express, { Application } from 'express';
import routesProducts from '../routes/products';
import routesUser from '../routes/user';
import { Product } from './products';
import { User } from './user';

class Server {
    private app: Application;
    private port: string;

    constructor(){
        this.app = express();
        this.port = process.env.PORT || '3001';
        this.listen();
        this.midlewares();
        this.routes();
        this.dbConnection();
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log('Listening port ' + this.port);
        });
    }

    routes(){
        this.app.use('/api/products', routesProducts);
        this.app.use('/api/user', routesUser);
    }

    midlewares(){
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnection(){
        try{
            await Product.sync();
            await User.sync();
        }catch (error){
            console.log('Not connected to DB', error);
        }
    }
}

export default Server;
