package controllers

import (
	"github.com/agathver/machinery/server/tasks"
	"github.com/gin-gonic/gin"
	"net/http"
)

type TaskController struct {
	tasks []tasks.Task
}

type Error struct {
	Message string
}

func (e Error) Error() string {
	return e.Message
}

var _ error = Error{}

var notFound = Error{
	Message: "Not found",
}

func NewTaskController(tasks []tasks.Task) *TaskController {
	return &TaskController{tasks: tasks}
}

func (t TaskController) List(c *gin.Context) {
	c.JSON(http.StatusOK, t.tasks)
}

func (t TaskController) Get(c *gin.Context) {
	for _, task := range t.tasks {
		if task.Id == c.Param("id") {
			c.JSON(http.StatusOK, task)
			return
		}
	}

	c.JSON(http.StatusNotFound, notFound)
}

func (t TaskController) Execute(c *gin.Context) {
	c.Status(http.StatusNoContent)
}
