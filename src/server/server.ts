import path from 'path';
import express, { Express } from 'express';
import logger from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import connectDB from './db/connect';
import Dispatcher from './controllers';

const STATIC_PATH = path.join(__dirname, '../../public');
const { PORT = 8080 } = process.env;

const isProduction = process.env.NODE_ENV === 'production';

const app: Express = express();
connectDB();

if (isProduction) {
  app.use(helmet());
  app.use(logger('combined'));
} else {
  app.use(logger('dev'));
}
app.use(bodyParser.json({ limit: '5mb' }));
app.use(bodyParser.urlencoded({ limit: '5mb', extended: true }));
app.use(cookieParser());
app.use(express.json());
app.use(express.static(STATIC_PATH));

app.use('/api', Dispatcher);

app.get('*', (_, res) => {
  res.render('index');
});

app.listen(PORT, () => {
  console.log(`exerciseReservation app server listening on port:${PORT}`);
});
