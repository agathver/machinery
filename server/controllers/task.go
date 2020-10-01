package controllers

import (
	"github.com/agathver/machinery/server/mappers"
	"github.com/agathver/machinery/server/responses"
	"github.com/agathver/machinery/server/tasks"
	"github.com/gin-gonic/gin"
	"net/http"
)

type TaskController struct {
	tasks []tasks.Task
}

func NewTaskController(tasks []tasks.Task) *TaskController {
	return &TaskController{tasks: tasks}
}

func (t TaskController) List(c *gin.Context) {
	c.JSON(http.StatusOK, mappers.TasksToResponse(t.tasks))
}

func (t TaskController) Get(c *gin.Context) {
	for _, task := range t.tasks {
		if task.Id == c.Param("id") {
			c.JSON(http.StatusOK, mappers.TaskToTaskDetail(task))
			return
		}
	}

	c.JSON(http.StatusNotFound, responses.NotFound)
}

func (t TaskController) Execute(c *gin.Context) {
	c.Status(http.StatusNoContent)
}
