import express from 'express';
import prisma from './client';

export const app = express();
const port = 3000;

app.use(express.json());

app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] Requête reçue : ${req.method} ${req.url}`);
  next(); // Passe à la prochaine fonction middleware ou route
});

// Route pour obtenir la liste des utilisateurs
app.get('/users', async (_req, res) => {
  const users = await prisma.user.findMany({ include: { posts: true } }); // Récupère tous les utilisateurs et leurs posts
  res.status(200).send(users);
});

// Route pour obtenir un utilisateur en particulier
app.get('/user/:id', (req, res) => {
  res.status(200).send(`Utilisateur ${req.params.id}`);
});

app.post('/user', (req, res) => {
  res.send(`Ajout de l'utilisateur ${req.body.name}`);
});

app.listen(port, () => {
  console.log(`Mon serveur démarre sur le port ${port}`);
});
