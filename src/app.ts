import express from 'express';
import Route from './route';

const app = express();

app.use(express.json());
app.use(Route);

export default app;
