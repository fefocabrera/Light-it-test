import app from './src';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || '3000'

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
});