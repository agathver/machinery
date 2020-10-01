package main

import (
	"github.com/agathver/machinery/server/config"
	"github.com/agathver/machinery/server/controllers"
	"github.com/agathver/machinery/server/tasks"
	"github.com/agathver/machinery/server/utils"
	"github.com/gin-gonic/gin"
)

func main() {

	cfg, err := config.Load()
	utils.Must(err)

	taskList, err := tasks.Load(cfg.Tasks)
	utils.Must(err)

	server := gin.Default()

	taskController := controllers.NewTaskController(taskList)

	server.GET("/v1/tasks", taskController.List)
	server.GET("/v1/tasks/:id", taskController.Get)
	server.POST("/v1/tasks/:id/execute", taskController.Execute)

	utils.Must(server.Run(cfg.ListenAddress()))
}
