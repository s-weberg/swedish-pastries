import express from "express";
import { z } from "zod";


//Creates the express application
const app = express();

//Middleware to parse JSON bodies
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

//Creates an array of pastries with data.
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
//Validates that the data matches the expected structure.
const SwedishPastrySchema = z.object({
    id: z.number().min(1),                  //id must be a number. At least 1.   
    name: z.string().min(1).max(100),      //name must be a string. At least 1 character, max 100 characters.
    description: z.string().min(1).max(300), //description must be a string. At least 1 character, max 300 characters.
    price: z.number().min(10).max(100),   //price must be a number. At least 10, max 100.
})


//GET - list all pastries.
app.get('/pastries', (req, res) => {
  res.json(pastries);                   //Sends the array as JSON response.
});

//POST - add a new pastry.
app.post('/pastries', (req, res) => {
    const newPastry = {
        id: pastries.length + 1,        //This assigns a new id. Based on length of array + 1.
        name: req.body.name,
        description: req.body.description,
        price: req.body.price,
    };

    // Validate the new pastry data
    const validation = SwedishPastrySchema.safeParse(newPastry);
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid data', details: validation.error }); //If validation fails, return 400 with error.
    }
    pastries.push(validation.data);
    res.json({ message: 'Pastry added successfully', pastry: validation.data });    //If validation success, add to array and return success message.
});

//PUT - update a pastry by id.
app.put('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id);
    const pastry = pastries.find(p => p.id === pastryId);
    if (!pastry) {
        return res.status(404).json({ message: 'Pastry not found' });
    }
    const updateData = {            //Create an object with updated data.
        id: pastry.id,
        name: req.body.name || pastry.name,
        description: req.body.description || pastry.description,
        price: req.body.price || pastry.price,
    };
    const validation = SwedishPastrySchema.safeParse(updateData);       //Validates the updated data.
    if (!validation.success) {
        return res.status(400).json({ error: 'Invalid update data', details: validation.error });
    }
    Object.assign(pastry, validation.data);                     //If validation success, update the pastry in the array.
    res.json({ message: 'Pastry updated successfully', pastry });
});

//DELETE - delete a pastry by id.
app.delete('/pastries/:id', (req, res) => {
    const pastryId = parseInt(req.params.id); // Convert URL ID to a number
    const originalLength = pastries.length; // Save the original length

    // Create a new array (excluding the pastry with the matching ID).
    pastries = pastries.filter(p => p.id !== pastryId); // Keep all pastries except the one to delete.

    // Check if the length changed (if a pastry was removed).
    if (pastries.length === originalLength) {
        return res.status(404).json({ message: 'Pastry not found' });
    }

    res.json({ message: 'Pastry deleted successfully' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
