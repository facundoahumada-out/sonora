import dotenv from 'dotenv';
import { db } from './db.js';
dotenv.config();
const JAMENDO_CLIENT_ID=process.env.JAMENDO_CLIENT_ID;
const seeds=[{offset: 200, limit: 200},{offset: 400, limit:100}];
export async function loadSongs(){
    try {
        const count=await db.collection('songs').countDocuments();
        if (count>0){
            console.log(`La base de datos ya contiene ${count} canciones. Se omite el seeding.`);
            return;
        }
    let addedSongs=[];
    
    for (const adding of seeds){
        const url=`https://api.jamendo.com/v3.0/tracks/?client_id=${JAMENDO_CLIENT_ID}&format=json&limit=${adding.limit}&offset=${adding.offset}&audioformat=mp32&order=popularity_week&include=musicinfo`;
        const response=await fetch(url);
        const data=await response.json();
        if(data.results){
        addedSongs=addedSongs.concat(data.results);}
    }
    console.log(`Se obtuvieron ${addedSongs.length} canciones de Jamendo`);

    for(const track of addedSongs){
        await db.collection('songs').insertOne({id: track.id, title: track.name, artist_name: track.artist_name, album_name: track.album_name, duration: track.duration, cover_image: track.image, audio_url: track.audio, genres: track.musicinfo?.tags?.genres, isActive: true});

    }
        console.log('Base de datos rellenada');

    }
    catch(error){
        console.error('Error al cargar canciones', error);
    }
}