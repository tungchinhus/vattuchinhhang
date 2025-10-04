import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import recaptchaRouter from './recaptcha';

const app = express();
app.use(cors());
app.use(express.json());

app.use(recaptchaRouter);

const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`API running on port ${port}`);
});


