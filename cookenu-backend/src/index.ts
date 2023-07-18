import app from "./app"
import { userRouter } from "./routes/userRouter"
import {recipeRouter} from "./routes/recipeRouter"

app.use('/recipe/', recipeRouter)
app.use('/user/', userRouter)
