package main

import (
	"github.com/agathver/machinery/server/config"
	"github.com/agathver/machinery/server/controllers"
	"github.com/agathver/machinery/server/executors"
	"github.com/agathver/machinery/server/tasks"
	"github.com/agathver/machinery/server/utils"
	docker "github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
)

func main() {

	cfg, err := config.Load()
	utils.Must(err)

	taskList, err := tasks.Load(cfg.Tasks)
	utils.Must(err)

	server := gin.Default()

	client, err := docker.NewClientWithOpts(docker.FromEnv)
	utils.Must(errors.Wrap(err, "error creating docker client"))

	executor := executors.NewDockerExecutor(client)
	taskController := controllers.NewTaskController(taskList, executor)

	server.GET("/v1/tasks", taskController.List)
	server.GET("/v1/tasks/:id", taskController.Get)
	server.POST("/v1/tasks/:id/execute", taskController.Execute)

	utils.Must(server.Run(cfg.ListenAddress()))
}
