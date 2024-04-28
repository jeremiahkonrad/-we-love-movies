/*
Preserve the req.params values from the parent router. If the parent 
 and the child have conflicting param names, the child’s value take 
 precedence.
*/
const router = require("express").Router({ mergeParams: true });
const controller = require("./theaters.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).all(methodNotAllowed);

module.exports = router;
