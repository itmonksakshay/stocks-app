import express from 'express';
import cors from 'cors';
import { TypedRequestBody } from './types/apiTypes';
import { DailyHistoricalDataRequest } from 'dhanhq';
import { getHistoricalData } from './controllers/dhanAPIController';
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.get('/callbackUrl', (req, res) => {
  res.send('Hello, TypeScript with Express!');
});

app.post('/api/historical', async(req:TypedRequestBody<DailyHistoricalDataRequest>, res) => {
  try{
    const result = await getHistoricalData(req.body);
    res.status(200).send(result);
  } catch(e){
    res.status(500).send({status:500,message:(e as Error).message})
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});