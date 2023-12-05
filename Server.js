const express = require("express");
const fs = require("fs").promises;

const app = express();//כך בניתי שרת
app.get("/toys", async(req, res) => {
    try {
        let text = await fs.readFile("./myToysDb.json", "utf-8");
        let arr = JSON.parse(text)
        res.json(arr);
    }
    catch (err) {
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    }
})

app.get("/toys/:id", async(req, res) => {
    try {
        let text = await fs.readFile("./myToysDb.json", "utf-8");
        let arr = JSON.parse(text)
        let toy = arr.find(item => item.id == req .params.id)
        if(!toy)
        res.status(404).send("לא נמצא משחק עם כזה קוד");
        res.json(toy);
    }
    catch (err) {
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    }

})
app.delete("/toys/:id",  async(req, res) => {

    try {
        let text = await fs.readFile("./myToysDb.json", "utf-8");
        let arr = JSON.parse(text)
        let toyIndex = arr.findIndex(item => item.id == req.params.id)
        if(toyIndex==-1)
        res.status(404).send("לא נמצא משחק עם כזה קוד");
     let toy=  arr.splice(toyIndex,1)
     await fs.writeFile("./myToysDb.json",JSON.stringify(arr) );
        res.json(toy);
        
    }
    catch (err) {
        res.status(400).send("התרחשה שגיאה בקבלת הנתונים")
    }
})

app.listen(5500,()=>{console.log("listening on port 5500")})