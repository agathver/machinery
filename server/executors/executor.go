package executors

import (
	"context"
	"github.com/agathver/machinery/server/tasks"
)

type Result struct {
	StatusCode int
	Output     string
	Error      string
}

type Executor interface {
	Execute(ctx context.Context, task tasks.Task) (Result, error)
}
