import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose'
import loginRouter from './routers/login.router';
import registerRouter from './routers/register.router';
import getRouter from './routers/get.router';
import updateRouter from './routers/update.router';
import insertRouter from './routers/insert.router';
import getWaiterRouter from './routers/get_waiter.router';
import changeRouter from './routers/change.router';
import sortRouter from './routers/sort.router';
import searchRouter from './routers/search.router';
import reserveRouter from './routers/reservation.router';

const app = express();

app.use(cors())
app.use(express.json())

mongoose.connect('mongodb://127.0.0.1:27017/pia')
const conn = mongoose.connection
conn.once('open', ()=>{
    console.log("DB ok")
})

const router = express.Router()
router.use('/login', loginRouter)
router.use('/register', registerRouter)
router.use('/get', getRouter)
router.use('/get_waiter', getWaiterRouter)
router.use('/update', updateRouter)
router.use('/insert', insertRouter)
router.use('/change', changeRouter)
router.use('/sort', sortRouter)
router.use('/search', searchRouter)
router.use('/reservation', reserveRouter)

app.use("/" ,router)
app.listen(4000, () => console.log(`Express server running on port 4000`));