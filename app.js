const express = require("express");
const mongoose = require("mongoose");
const ejs = require("ejs");


const app = express();

//middleware

app.set('view engine', ejs);

app.use(express.urlencoded({
    extended:true
}));

app.use(express.json());

app.use(express.static("public"));

//database

mongoose.connect("mongodb://localhost:27017/taskDB");

const taskSchema={
    tittle: String,
    remember: Number,
    date: String
};

const Task = mongoose.model("Task", taskSchema);

//routes

////////////////////////Many Objects Request////////////////////////////////////

app.route("/tasks")

        .get(
            function(req,res){

            Task.find(function(err, foundTasks){
        
                if(!err){
                    res.send(foundTasks);
        
                }else{
                    res.send(err);
                }
            })

            console.log("this should do the work");
        
        })

        .post(
            function(req,res){

            const newTask = Task({
                tittle:req.body.tittle,
                remember:req.body.remember,
                date:req.body.date
            });
        
            newTask.save(function(err){
                if(!err){
                    res.send("Succefully added a new task");
                }else{
                    res.send(err);
                }
            });
        
            console.log(req.body.tittle);
            console.log(req.body.remember);
            console.log(req.body.date);
        })

        .delete(
            function(req,res){
        Task.deleteMany(function(err){
            if(!err){
                res.send("Succefully deleted toa esta mierda chama");
            }else{
                res.send(err);
            }

            });
        });

////////////////////////Single Object Request////////////////////////////////////

app.route("/tasks/:tittle")

        .get(function(req,res){

            Task.findOne({tittle: req.params.tittle},function(err,foundTask){
                if(foundTask){
                    res.send(foundTask);

                }else{
                    res.send("No Tasks matching that tittle was found");

                }
            });

        })

        .put(function(req,res){
            Task.updateOne({tittle: req.params.tittle},
                {tittle: req.body.tittle, remember: req.body.remember, date: req.body.date},
                {upsert:true},
                function(err){
                    if(!err){
                        res.send("Succefully udate");
                    }

                });
        });




app.listen(3000,function(){
    console.log("server running on http://127.0.0.1:3000")
})



/*app.get("/tasks",function(req,res){

    Task.find(function(err, foundTasks){

        if(!err){
            res.send(foundTasks);

        }else{
            res.send(err);
        }
    })
    console.log("this should do the work");

});

app.post("/tasks",function(req,res){

    const newTask = Task({
        tittle:req.body.tittle,
        remember:req.body.remember,
        date:req.body.date
    });

    newTask.save(function(err){
        if(!err){
            res.send("Succefully added a new task");
        }else{
            res.send(err);
        }
    });

    console.log(req.body.tittle);
    console.log(req.body.remember);
    console.log(req.body.date);
});

app.delete("/tasks",function(req,res){
    Task.deleteMany(function(err){
        if(!err){
            res.send("Succefully deleted toa esta mierda chama");
        }else{
            res.send(err);
        }

    });
});*/