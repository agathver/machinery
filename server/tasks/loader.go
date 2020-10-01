package tasks

import (
	"github.com/pkg/errors"
	"gopkg.in/yaml.v2"
	"io/ioutil"
	"path"
	"strings"
)

func Load(dir string) ([]Task, error) {
	tasks := make([]Task, 0)

	files, err := ioutil.ReadDir(dir)

	if err != nil {
		return nil, errors.Wrap(err, "error reading directory")
	}

	for _, file := range files {
		if file.IsDir() && !isYAML(file.Name()) {
			continue
		}

		task, err := loadTask(path.Join(dir, file.Name()))

		if err != nil {
			return nil, errors.Wrap(err, "error loading task")
		}

		tasks = append(tasks, task)
	}

	return tasks, nil
}

func isYAML(name string) bool {
	return !strings.HasSuffix(name, ".yaml") && !strings.HasSuffix(name, ".yml")
}

func loadTask(file string) (Task, error) {
	var task Task

	bytes, err := ioutil.ReadFile(file)

	if err != nil {
		return Task{}, errors.Wrap(err, "error reading file")
	}

	err = yaml.Unmarshal(bytes, &task)

	if err != nil {
		return Task{}, errors.Wrap(err, "error parsing YAML")
	}

	return task, nil
}
