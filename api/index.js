require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const app = require('./server')

app.listen(process.env.HOST_PORT, () => console.log(`server is running at ${process.env.HOST_PROTOCOL}://${process.env.HOST_URL}:${process.env.HOST_PORT}`));
