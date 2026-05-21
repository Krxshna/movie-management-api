import express from 'express';
import dotenv from 'dotenv';

import { DB_NAME } from './constants.js';

import participants from './controllers/participantController.js';
import movies from './controllers/movieController.js';
import { removeHeaders } from './middlewares/removeResHeaders.js';
import user from './controllers/userController.js';
import { connectRabbitMQ } from './config/rabbitMQ.js';
import uid from 'tiny-uid';
import { checkHealthStatus } from './services/healthService.js';

dotenv.config();

import connect from './config/db.js';
import { logMsg } from './lib/logProducer.js';
import swaggerUI from 'swagger-ui-express';
import YAML from 'yamljs';

const swaggerDocument = YAML.load('./swagger.yml');

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(removeHeaders);

//middleware
// const logHelper = (req,res,next) => {
//     console.log('Inside the middleware function');
//     next();  //to execute next methods without stuck
// };

app.use((req,res,next) => {
    req.logId = uid(7);
    next();
});

app.use('/docs',swaggerUI.serve,swaggerUI.setup(swaggerDocument));

//to add middleware to all endpoints available
//app.use(logHelper);


//to use it for a single route
// app.get('/ping',logHelper, (req,res) => {
//     res.status(200).json({message:'pong'})
// })


app.get('/healthCheck',checkHealthStatus);
app.get('/ping', (req, res) => {
    const logId = req?.logId;
    logMsg(logId,'Inside ping method route',{test:'ping'});
    res.status(200).json({ message: 'pong',logId: req?.logId });
});
app.use('/participants',participants);
app.use('/movies',movies);
app.use('/auth',user);

const PORT = process.env.PORT || 8000;

(async () => {
    await connect(DB_NAME);
    await connectRabbitMQ();

    app.listen(PORT, () =>
      console.log(`The server has started on port ${PORT}`)
    );
})();