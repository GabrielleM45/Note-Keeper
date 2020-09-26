const router = require("express").Router();
const fs = require("fs");
const notesData = require('../db/db.json');
var id = notesData.length + 1;



function writeFile(notesData) {
    fs.writeFile("../db.json", JSON.stringify(notesData), function(err, result) {
        if (err) throw err;
        console.log("apiroutes file" + err.stack);
    });
}

router.get("/api/notes", function(req, res) {
    return res.json(notesData);
});

router.post("/api/notes", function(req, res) {
    console.log(req.body);
    req.body.id = id++
        notesData.push(req.body);
    fs.writeFile("./db/db.json", JSON.stringify(notesData), function() {
        res.json(notesData);
    })
});

router.delete("/api/notes/:id", function(req, res) {
    var id = req.params.id
    for (let i = 0; i < notesData.length; i++) {
        if (notesData[i].id === parseInt(id)) {
            notesData.splice(i, 1)
        }
    }
    fs.writeFile("./db/db.json", JSON.stringify(notesData), function() {
        res.json(notesData)
    })
})

// router.delete("/api/notes/:id", function(req, res) {
//     console.log(req.body);
//     notesData.remove(req.body.id);


//         fs.writeFile("./db/db.json", JSON.stringify(notesData), function() {
//             res.json(notesData);
//         })
// });
//     for (var i = 0; i < notesData.length; i++) {
//         if (notesData[i].id === req.params.id) {
//             notesData.splice(i, 1);
//         }
//     }

//     fs.writeFile("./db/db.json", JSON.stringify(notesData), function() {
//         res.json(notesData);
//     })
// });

// // fs.writeFile(notesData);
// // res.json(notesData);



module.exports = router;