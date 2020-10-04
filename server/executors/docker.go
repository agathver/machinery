package executors

import (
	"context"
	"fmt"
	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/api/types/network"
	"github.com/docker/docker/client"
	"github.com/kinematic-ci/machinery/server/tasks"
	"github.com/pkg/errors"
	"io/ioutil"
	"time"
)

type DockerExecutor struct {
	client *client.Client
}

var _ Executor = DockerExecutor{}

func NewDockerExecutor(client *client.Client) *DockerExecutor {
	return &DockerExecutor{client: client}
}

func (e DockerExecutor) Execute(ctx context.Context, task tasks.Task, parameters []string) (Result, error) {
	image := task.Image

	exists, err := e.imageExists(ctx, image)

	if err != nil {
		return Result{}, errors.Wrap(err, "error checking for image existence")
	}

	if !exists {
		err := e.pullImage(ctx, image)

		if err != nil {
			return Result{}, errors.Wrap(err, "cannot pull docker image")
		}
	}

	envVars := append(task.EnvVars, parameters...)

	containerName := fmt.Sprintf("%s-%d", task.Id, time.Now().Unix())
	createdContainer, err := e.createContainer(ctx, image, containerName, envVars)

	if err != nil {
		return Result{}, errors.Wrap(err, "error creating container")
	}

	err = e.client.ContainerStart(ctx, createdContainer.ID, types.ContainerStartOptions{})

	if err != nil {
		return Result{}, errors.Wrap(err, "error starting container")
	}

	containerID := createdContainer.ID

	response, err := e.client.ContainerAttach(ctx, containerID, types.ContainerAttachOptions{
		Stream: true,
		Stdin:  false,
		Stdout: true,
		Stderr: true,
		Logs:   true,
	})
	if err != nil {
		return Result{}, errors.Wrap(err, "error attaching to container")
	}

	output, err := ioutil.ReadAll(response.Reader)

	if err != nil {
		return Result{}, errors.Wrap(err, "error reading container output")
	}

	result, err := e.client.ContainerInspect(ctx, containerID)

	if err != nil {
		return Result{}, errors.Wrap(err, "error inspecting container")
	}

	return Result{
		StatusCode: result.State.ExitCode,
		Output:     string(output),
		Error:      result.State.Error,
	}, nil
}

func (e DockerExecutor) imageExists(ctx context.Context, image string) (bool, error) {
	_, _, err := e.client.ImageInspectWithRaw(ctx, image)

	if client.IsErrNotFound(err) {
		return true, nil
	}

	if err != nil {
		return false, errors.Wrap(err, "error inspecting image")
	}

	return false, nil
}

func (e DockerExecutor) createContainer(ctx context.Context, image string, containerName string, vars []string) (container.ContainerCreateCreatedBody, error) {
	createdContainer, err := e.client.ContainerCreate(ctx,
		&container.Config{Image: image, Env: vars},
		&container.HostConfig{},
		&network.NetworkingConfig{},
		containerName)
	return createdContainer, err
}

func (e DockerExecutor) pullImage(ctx context.Context, image string) error {
	_, err := e.client.ImagePull(ctx, image, types.ImagePullOptions{})
	if err != nil {
		return errors.Wrap(err, "cannot pull image from registry")
	}
	return nil
}
