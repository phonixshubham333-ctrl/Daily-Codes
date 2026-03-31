const express = require("express");

const app = express();

const user = [
    {
        name:"Mathew",
        Kidneys:[
            {healthy:false},
            {healthy:true}
        ]
    }
]

app.use(express.json());

app.get('/', function(req, res) {

    const mathewKidneys = user[0].Kidneys;
    const noOfKidneys = mathewKidneys.length;

    const mathewhealthyKidneys = mathewKidneys.filter(function(kidney){
        return kidney.healthy == true;
    });

    const mathewunhealthyKidneys = noOfKidneys - mathewhealthyKidneys.length;

    res.json({
        healthy: mathewhealthyKidneys.length,
        unhealthy: mathewunhealthyKidneys
    });
});


app.post('/' , function(req,res){
    const ishealthy = req.body.ishealthy;
    user[0].Kidneys.push({
        healthy:ishealthy
    })
    res.json({
        msg:"Done"
    })
})

//Update
// app.put('/' , function(req,res){
//     for(let i=0;i<user[0].Kidneys.length;i++){
//         user[0].Kidneys[i].healthy=true;
//     }
//     res.json({
//         msg:"Done!!"
//     })
// })

//Lets write a better version of Put request here by applying status code 
function isThereAtleastONEUnHealthyKidneys (){
    let atlestOneUnHealthyKidneys = false;
    for(let i=0;i<user[0].Kidneys.length;i++){
        if(!user[0].Kidneys.healthy){
            atlestOneUnHealthyKidneys=true;
        }
    }
    return atlestOneUnHealthyKidneys;
}
app.put('/' , function(req,res){
    if(isThereAtleastONEUnHealthyKidneys()){
        for(let i=0;i<user[0].Kidneys.length;i++){
        user[0].Kidneys[i].healthy=true;
    }
    res.json({
        msg:"Done!!"
    })
    }
    else{
        res.sendStatus(411);
    }
})

//Removing all unhealthy Kidneys
app.delete('/', function(req,res){
    let userblankkidneys= [];
    for(let i=0;i<user[0].Kidneys.length;i++){
        if(user[0].Kidneys[i].healthy){
           userblankkidneys.push({
            healthy:true
           })
        }
    }user[0].Kidneys=userblankkidneys;
    res.json({
        msg:"Delete Done!!"
    })

})

app.listen(3000);