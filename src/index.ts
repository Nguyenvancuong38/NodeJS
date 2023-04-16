import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import router from './routes/auth';

const app = express();

const ORIGIN_LOCALHOST = process.env.ORIGIN_LOCALHOST;
const ORIGIN_PRODUCT = process.env.ORIGIN_PRODUCT;

const allowedOrigins: string[] = [ORIGIN_LOCALHOST, ORIGIN_PRODUCT];

const corsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
  credentials: true,
};

app.use(cors(corsOptions));
// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api', router);

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
