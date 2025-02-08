const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const auth = require('./middleware/auth');
const User = require('./models/User');
const Todo = require('./models/Todo');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('Connected to MongoDB successfully');
})
.catch((error) => {
  console.error('MongoDB connection error:', error);
});

// Auth Routes
app.post('/api/signup', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.status(201).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: 'Email already exists' });
  }
});

app.post('/api/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      throw new Error();
    }
    const token = jwt.sign({ userId: user._id }, JWT_SECRET);
    res.json({ user, token });
  } catch (error) {
    res.status(401).json({ error: 'Invalid login credentials' });
  }
});

// Protected Todo Routes
app.get('/api/todos', auth, async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(todos);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching todos' });
  }
});

app.post('/api/todos', auth, async (req, res) => {
  try {
    const todo = new Todo({
      ...req.body,
      user: req.user._id
    });
    await todo.save();
    res.status(201).json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error creating todo' });
  }
});

app.put('/api/todos/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      { $set: req.body },
      { new: true }
    );
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.json(todo);
  } catch (error) {
    res.status(500).json({ error: 'Error updating todo' });
  }
});

app.delete('/api/todos/:id', auth, async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user._id 
    });
    if (!todo) {
      return res.status(404).json({ error: 'Todo not found' });
    }
    res.status(204).end();
  } catch (error) {
    res.status(500).json({ error: 'Error deleting todo' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
}); 