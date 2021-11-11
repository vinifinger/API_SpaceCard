import { app } from "./app";
app.listen(process.env.PORT || 3001, () => { console.log(`Server listening port ${process.env.PORT || 3001}`); });