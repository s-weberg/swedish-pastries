import express from "express";
import { z } from "zod";
import { de } from "zod/v4/locales";

const app = express();

app.use(express.json());

const PORT = 3000;

let pastries = [
    {
        name: "Hallongrotta",
        description: "A classic pastry filled with raspberry jam.",
        price: 15,
    },
    {
        name: "Kärleksmums",
        description: "Chocolate cake with coconut topping.",
        price: 25,
    },
    {
        name: "Kanelbulle",
        description: "Sweet bun with cinnamon and sugar.",
        price: 20,
    }
];

//This is the pastry schema with zod. z.object defines a schema for an object.
const SwedishPastrySchema = z.object({
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(300),
    price: z.number().min(10).max(100),
})


app.get('/pastries', (req, res) => {
  res.json(SwedishPastrySchema);
});

app.post('/pastries', (req, res) => {
    const newPastry = req.body;
    name: pastries.length + 1;
    description: req.body.description;
    price: req.body.price;

    pastries.push(newPastry);
    res.json({ message: "New pastry added", pastry: newPastry });
})








app.post('/')








app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
