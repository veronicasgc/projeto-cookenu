import app from "./app"
import { userRouter } from "./routes/userRouter"
import {recipeRouter} from "./routes/recipeRouter"
import { friendshipRouter } from "./routes/friendshipsRouter"



app.use('/user/', userRouter)
app.use('/recipe/', recipeRouter)
app.use('/friendships/',friendshipRouter)