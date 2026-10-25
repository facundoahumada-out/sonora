import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import JWTService from './jwt.js';
import { db, connectDB } from './db.js';
import { loadSongs } from './seeding.js'
const app = express();
const saltRounds = 10;

app.use(cors()); 
app.use(express.json()); 

app.post('/register', async(req, res)=>{
  const { mail, password, name} = req.body;

  try {
    const passwordHash = await bcrypt.hash(password, saltRounds);
    
    await db.collection('users').insertOne({ mail: mail, password: passwordHash, rol: 'Oyente', name:name, genres: []});
    const newUser={mail:mail, rol:'Oyente', name:name};
    const jwtService = new JWTService();
    const generatedToken = jwtService.generateJWT(newUser);
    res.status(201).json({ mensaje: 'Usuario registrado con éxito', token: generatedToken});
  } catch (error) {
    console.error('Error en /register:', error);
    res.status(500).json({ error: 'Error al registrar el usuario' });
  }});
  


app.post('/login', async(req,res)=>{

  const{ mail, password } = req.body;

  try{
    const searchUser = await db.collection('users').findOne({ mail });

    if (!searchUser){
      return res.status(401).json({ error: 'No existe el usuario' });
    }

    const checkPassword = await bcrypt.compare(password, searchUser.password);

    if (!checkPassword){
      return res.status(401).json({error: 'Contrasena incorrecta'})
    }

    const jwtService = new JWTService();
    const generatedToken = jwtService.generateJWT(searchUser);
    res.json({ mensaje: 'Login correcto', token: generatedToken, name:searchUser.name });
  }

  catch (error){
    console.error(error);
    res.status(500).json({error: 'Error en el servidor'})
  }

});
 
const checkToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(403).json({ error: 'Falta token' });
  
  const token = authHeader.split(' ')[1]; 
  const jwtService = new JWTService();
  
  try {
    const user = jwtService.decodeJWT(token);
    res.locals.user = user; 
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Token inválido o expirado' });
  }
};

app.get('/protected', checkToken, (req, res) => { 
  const user = res.locals.user;
  res.json({ mensaje: "Usuario confirmado", user: user });
});

app.patch('/user/preferences', checkToken, async (req,res)=> {
  const {genres}=req.body;
  const user=res.locals.user;
  try{
    await db.collection('users').updateOne({mail: user.mail}, {$set: {genres: genres}});
    res.json({mensaje: 'Géneros guardados'});
  }catch(error){
    console.error(error);
    res.status(500).json({error: 'Error al guardar los géneros'})
  }
});

app.get('/songs', async(req,res)=>{
  try{
    const songs=await db.collection('songs').find({isActive:true}).toArray();
    res.json(songs);
  }catch(error){
    res.status(500).json({error: "No se pudieron obtener las canciones"});
  }
});


const PORT = process.env.PORT;

await connectDB();
await db.collection('users').createIndex({ mail: 1 }, { unique: true });
await loadSongs();
app.listen(PORT, () => {
  console.log("Vicente observando en el puerto " + PORT);
});