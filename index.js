const express =require("express");
const app = express();
const port =8080;
const path =require("path");
app.set("view engine","ejs"); //ejs ke liye likhe hai
app.use(express.urlencoded({extends:true}));  //express ko samjh aata hai data.
app.set("views",path.join(__dirname,"views")); //views ke folder se access lene ke liyee..
const { v4: uuidv4 } = require('uuid');  //uuid package hai id ke liye use kiye hai terminal me ja ke npm i uuid 
const methodOverride = require("method-override");//mrthod overide kiye hai npm install method-override..
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"public")));  //public folder se accesss lene ke liyee..

//koi database nhi hai esiliye array bna ke data store karenge...
let posts =[
    {
    id:uuidv4(),
    username :"coder_prashant_1718",
    content :"The Journey of Code: From Vision to a Global Q&A Platform It all began with a simple idea: What if there was a space where people could ask any question and anyone with knowledge could answer? This was the spark that set Arjun, a third-year B.Tech student, on a journey into the vast and complex world of technology. What started as a classroom thought soon evolved into a full-fledged mission: building a Quora-like platform where curiosity met expertise.",
    }, 
    {  
    id:uuidv4(),
    username :"pohographer_rahul",
    content :"The Art of Capturing Moments: Beyond the Lens Photography is more than just snapping a picture ; it’s about capturing a moment, a story, and an emotion. Whether you're a seasoned professional or a budding  hobbyist, the journey through the lens can be as varied and dynamic as the subjects you shoot. To truly stand out as a photographer in today’s visually saturated world, mastering  the technical basics is crucial. Understanding the three pillars of exposure—aperture, shutter speed, and ISO—forms the foundation of any great photo. Balancing these elements allows you to manipulate light, capture sharp motion, or create dreamlike blurs. Composition techniques such as the rule of thirds, leading lines, and symmetry serve as the blueprint for compelling images, guiding the viewers eye and creating balance within the frame. Additionally, natural light can be a photographers best friend; learning to read the light, such as utilizing the soft, warm tones of golden hour or the dramatic effects of midday sun, can greatly enhance your work.",
    },
    {
    id:uuidv4(),  
    username :"hacker_alex",
    content :"In today's digital age, hacking has evolved into a multifaceted domain that extends beyond the stereotypical image of hooded figures typing away in dimly lit rooms. At its core, hacking encompasses a range of activities, from ethical hacking aimed at improving security systems to malicious attacks that exploit vulnerabilities for personal gain. Ethical hackers, often referred to as white hat hackers, play a crucial role in the cybersecurity landscape. They are hired by organizations to identify and rectify weaknesses in their systems, employing the same techniques as their malicious counterparts but with the intent of enhancing security rather than compromising it. On the other hand, black hat hackers engage in illegal activities, such as data breaches, identity theft, and the spread of malware, often causing significant harm to individuals and organizations alike.",
    },
    
];

app.get("/posts",(req,res)=>{   // main route hai index.js
    res.render("index.ejs",{posts});
});
 
app.get("/posts/new", (req, res) => {  //new post ke liye route bnaiye huaii..
    res.render("new.ejs");
});

app.post("/posts",(req,res) => {      //new post me data dengee new.ejs se form lega usme
    let { username , content } = req.body;
    let id =uuidv4();
    posts.push({id,username , content});  //array me push karba liye ..
    res.redirect("/posts");       //route ko connnect kr rhe hai..
});

//koi bhi ek individual post ko kholne ke liye ..
app.get("/posts/:id",(req,res) =>{
  let {id} = req.params;
  let post =posts.find((p) => id === p.id);
  res.render("show.ejs",{post});
});
//hoppscoth pe edit kare hai...
app.patch ("/posts/:id",(req,res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post =posts.find((p) => id === p.id);
    post.content =newContent;
    console.log(post);
    res.redirect("/posts");
})

//edit posts route..
app.get("/posts/:id/edit", (req,res) =>{
    let {id} =req.params;
    let post =posts.find((p) => id === p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req, res)=>{
    let {id} =req.params;
    posts =posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening to port : 8080");//port ke liye likhte hai..
});
