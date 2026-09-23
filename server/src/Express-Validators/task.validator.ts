import { body,param } from "express-validator";

export const createTaskValidator = [

  body("title").trim().notEmpty().withMessage("Title is required"),
  body("description").trim().notEmpty().withMessage("Description is required"),
  body("assignee").trim().notEmpty().withMessage("Assignee is required"),
  body("status").isIn(["todo", "in-progress", "completed"]).withMessage("Invalid status"),
  body("dueDate").isISO8601().withMessage("Invalid date"),

];

export const getSingleTaskValidator = [

    param("taskId").isMongoId().withMessage("Invalid Mongo Id")

]

export const updateTaskValidator = [

    body("title").optional().trim().isString().withMessage("Title must be string"),
    body("description").optional().isString().withMessage("description must be string"),
    body("assignee").optional().isString().withMessage("assignee must be string"),
    body("dueDate").optional().isISO8601().withMessage("Invalid date"),
    body("status").optional().isIn(["todo","in-progress","completed"]).withMessage("Invalid Status"),
    
    param("taskId").isMongoId().withMessage("Invalid Mongo Id")

]

export const deleteTaskValidator = [

    param("taskId").isMongoId().withMessage("Invalid Mongo Id")
    
]