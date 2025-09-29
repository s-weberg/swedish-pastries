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

    const validation = SwedishPastrySchema.safeParse(newPastry);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid data', details: validation.error });
    }
    pastries.push(validation.data);
    res.json({ message: 'Pastry added successfully', pastry: validation.data });
});


app.put('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id);
    const pastry = pastries.find(p => p.id === pastryId);
    if (!pastry) {
        return res.status(404).json({ message: 'Pastry not found' });
    }
    const updateData = {
        id: pastry.id,
        name: req.body.name || pastry.name,
        description: req.body.description || pastry.description,
        price: req.body.price || pastry.price,
    };
    const validation = SwedishPastrySchema.safeParse(updateData);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid update data', details: validation.error.errors });
    }
    Object.assign(pastry, validation.data);
    res.json({ message: 'Pastry updated successfully', pastry });
});

app.delete('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id); // Convert the ID from the URL to a number
    const initialLength = pastries.length;    // Save the current number of pastries
    pastries = pastries.filter(p => p.id !== pastryId); // Remove the pastry with the matching ID
    if (pastries.length === initialLength) { // Check if no pastry was removed
        return res.status(404).json({ message: 'Pastry not found' });
    }
    res.json({ message: 'Pastry deleted successfully' });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
