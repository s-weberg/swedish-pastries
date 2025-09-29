import express from "express";
import { z } from "zod";

const app = express();

app.use(express.json());

const PORT = 3000;

//This is the pastry schema with zod
const SwedishPastrySchema = z.object({
    id: z.number(),
    name: z.string(),
    price: z.number()
})




// id: 1, name: "", price?:""

app.get('/', (req, res) => {
  res.send('Hello, Swedish Pastries!');
});








app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
