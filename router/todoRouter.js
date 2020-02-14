const express = require("express");
const TodoTask = require("../models/TodoTask");

const router = express.Router();

// GET METHOD
router.get("/", async(req, res) => {

    const page = req.query.page;
    const todoTasks = await TodoTask.find().skip((page - 1) * tasks).limit(3);
    //const sorted = request.query.sort + 1;

    res.render("todo.ejs", { todoTasks });
});

//POST METHOD
router.post('/', async(req, res) => {
    const todoTask = new TodoTask({
        content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});

//UPDATE

router.route("/edit/:id")
    .get((req, res) => {
        const id = req.params.id;
        TodoTask.find({}, (err, tasks) => {
            res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
        });
    })
    .post((req, res) => {
        const id = req.params.id;
        const content = req.body.content
        TodoTask.findByIdAndUpdate(id, { content: content }, err => {
            if (err) return res.send(500, err);
            res.redirect("/");
        });
    });

//DELETE
router.route("/remove/:id").get((req, res) => {
    const id = req.params.id;
    TodoTask.findByIdAndRemove(id, err => {
        if (err)
            return res.send(500, err);
        res.redirect("/");
    });
});

module.exports = router;

const tasks = 3
router.get("/AtoZ", async(request, response) => {
    console.log(request.query);
    const page = request.query.page;
    const sorted = request.query.sort + 1;
    const todoTasks = await TodoTask.find().sort({ content: sorted }).skip((page - 1) * tasks).limit(3);
    response.render("todo", { todoTasks });
});