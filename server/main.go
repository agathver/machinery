package main

import (
	docker "github.com/docker/docker/client"
	"github.com/gin-gonic/gin"
	"github.com/kinematic-ci/machinery/server/config"
	"github.com/kinematic-ci/machinery/server/controllers"
	"github.com/kinematic-ci/machinery/server/executors"
	"github.com/kinematic-ci/machinery/server/tasks"
	"github.com/kinematic-ci/machinery/server/utils"
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
