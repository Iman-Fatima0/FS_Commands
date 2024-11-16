const express=require('express');
const {error}=require('console');
const fs = require('fs');

const app= express();
app.use(express.json());
app.post('/book',(req,res)=>{
    const book=req.body;
    fs.writeFile('example.json',JSON.stringify(book),(err)=>{
        if(err)
        {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else{
            res.status(201).send('Book added successfully');
        }
    })
})

app.get('/book/get',(req,res)=>{

fs.readFile('example.json',(err,data)=>{
    if(err)
    {
        console.log(err);
        res.status(500).send('Server Error');
    }
    else{
       res.json({"message":"Sucessfully displayed",data:JSON.parse(data)});
        console.log(JSON.parse(data));
       
    }
})
})
app.patch('/book/update/:id', (req, res) => {
   const id=req.params.id;
   const update=req.body;
   if(id >0  )
   {
    fs.readFile('example.json',(err,data)=>
    {
        if(err)
        {
            res.status(200).send('cannot read file');
            console.log('file not read');
        }
        else
        {
            const books=JSON.parse(data);
            const index=books.findIndex(book=>book.id===parseInt(id));
            if(index > -1)
            {
                console.log(books[index])
                books[index] = { ...books[index], ...update };
                console.log(books[index])
                fs.writeFile('example.json',JSON.stringify(books) ,(err)=>
                {
                    if(err)
                    {
                        console.log(err);
                        res.status(500).send('Server Error');
                    }
                    else{
                        res.json(books);
                        console.log('books updated successfully')
                    }
                })
            }
            else{
                res.status(404).send('Book not found');
                console.log('book not found');
            }
        }
        
    })
   }
});


app.delete('/book/delete',(req,res)=>
{
    fs.unlink('example.json',(err)=>
    {
        if(err)
        {
            console.log(err);
            res.status(500).send('Server Error');
        }
        else
        {
            res.status(200).send('File deleted successfully');
            console.log('File deleted successfully');
        }
    })
})
{

}

app.listen(3000,()=>{
    console.log('Server is running on port 3000');
});