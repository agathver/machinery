package mappers

import (
	"github.com/kinematic-ci/machinery/server/executors"
	"github.com/kinematic-ci/machinery/server/responses"
	"github.com/kinematic-ci/machinery/server/tasks"
)

func TasksToResponse(t []tasks.Task) responses.TaskList {
	taskInfos := make([]responses.TaskInfo, 0)

	for _, task := range t {
		taskInfo := responses.TaskInfo{
			Id:          task.Id,
			Name:        task.Name,
			Description: task.Description,
		}

		taskInfos = append(taskInfos, taskInfo)
	}

	return responses.TaskList{Tasks: taskInfos}
}

func TaskToTaskDetail(t tasks.Task) responses.TaskDetail {
	return responses.TaskDetail{
		Id:          t.Id,
		Name:        t.Name,
		Description: t.Description,
		Parameters:  parametersToResponse(t.Parameters),
	}
}

func ResultToResponse(r executors.Result) responses.Result {
	return responses.Result{
		StatusCode: r.StatusCode,
		Output:     r.Output,
		Error:      r.Error,
	}
}
func parametersToResponse(params []tasks.Parameters) []responses.Parameters {
	parameterResponses := make([]responses.Parameters, 0)

	for _, p := range params {
		param := responses.Parameters{
			Id:           p.Id,
			Name:         p.Name,
			Description:  p.Description,
			Required:     p.Required,
			Type:         p.Type,
			Pattern:      p.Pattern,
			ErrorMessage: p.ErrorMessage,
			Choices:      choicesToResponse(p.Choices),
		}

		parameterResponses = append(parameterResponses, param)
	}

	return parameterResponses
}

func choicesToResponse(choices []tasks.Choice) []responses.Choice {
	choiceResponses := make([]responses.Choice, 0)

	for _, c := range choices {
		choice := responses.Choice{
			Value:       c.Value,
			Name:        c.Name,
			Description: c.Description,
		}

		choiceResponses = append(choiceResponses, choice)
	}
	return choiceResponses
}
