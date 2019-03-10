import { SandraCoreServer } from '../util/server';
import UserRoutes from './service/user/route';

let env = process.env.NODE_ENV || 'live';
let config = require(`./config.${env}.json`);

let server = new SandraCoreServer(config);

server.applyRoutes(UserRoutes);
server.startListening();