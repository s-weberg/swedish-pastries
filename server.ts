import express from "express";
import { z } from "zod";
import { de, id } from "zod/v4/locales";

const app = express();

app.use(express.json());

const PORT = 3000;


//type Pastry = z.infer<typeof SwedishPastrySchema>; This is the same as below?
// Define the pastry structure with TypeScript
type Pastry = {
    id: number;
    name: string;
    description: string;
    price: number;
};


let pastries: Pastry[] = [
    {
        id: 1,
        name: "Hallongrotta",
        description: "A classic pastry filled with raspberry jam.",
        price: 15,
    },
    {
        id: 2,
        name: "Kärleksmums",
        description: "Chocolate cake with coconut topping.",
        price: 25,
    },
    {
        id: 3,
        name: "Kanelbulle",
        description: "Sweet bun with cinnamon and sugar.",
        price: 20,
    }
];

//This is the pastry schema with zod. z.object defines a schema for an object.
const SwedishPastrySchema = z.object({
    id: z.number().min(1),
    name: z.string().min(1).max(100),
    description: z.string().min(1).max(300),
    price: z.number().min(10).max(100),
})



app.get('/pastries', (req, res) => {
  res.json(pastries);                   //Return the pastries array.
});

app.post('/pastries', (req, res) => {
    const newPastry = {
        id: pastries.length + 1,        //This assigns a new id. Based on length of array + 1.
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };

    pastries.push(newPastry);
    res.json({ message: 'Pastry added successfully', pastry: newPastry });
});


app.put('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id);
    const pastry = pastries.find(p => p.id === pastryId);
    if (!pastry) {
        return res.status(404).json({ message: 'Pastry not found' });
    }
    pastry.name = req.body.name || pastry.name;
    pastry.description = req.body.description || pastry.description;
    pastry.price = req.body.price || pastry.price;
    res.json({ message: 'Pastry updated successfully', pastry });
});

app.delete('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id);
    pastries = pastries.filter ((p) => p.id !== pastryId);
    res.json({ message: 'Pastry deleted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
