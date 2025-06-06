import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __dirname = path.dirname(fileURLToPath(import.meta.url));

app.use(express.json());
// app.use(express.static('PlanET/dist'));
app.use(express.static(path.join(__dirname, 'PlanET/dist')));

const port = process.env.PORT || 8080 ;
app.listen(port , () =>{
    console.log(`Listening on port ${port}`);
});

app.get('/api/pirates/:id',(req,res)=>{
    const id = req.params.id;
    const pirate = getPirate(id);
    if(!pirate){
        res.status(404).send({error:`Pirate ${id} not found`});
    }else{
        res.send({data:pirate});
    }
});
// app.get('*', (req, res) => {
//     res.sendFile(path.resolve(__dirname, 'PlanET/dist/index.html'));
// });
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'PlanET/dist', 'index.html'));
  });

function getPirate(id){
    const pirates =[
        {id: 1 , name:`Klaus Stortebeker`,active:'1392-1401' , country:"Germany"},
        {id: 2 , name:`Tuanku Abbas`,active:'to 1844' , country:"Germany"},
        {id: 3 , name:`Ching Shih`,active:'18007-1810' , country:"Germany"}
    ];
    return pirates.find( p => p.id == id);
}