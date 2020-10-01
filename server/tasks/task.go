package tasks

type Choice struct {
	Value       string
	Name        string
	Description string
}

type Parameters struct {
	Id           string
	Name         string
	Description  string
	Required     bool
	Type         string
	Pattern      string
	ErrorMessage string `yaml:"error_message"`
	Choices      []Choice
}

type Task struct {
	Id          string
	Name        string
	Description string
	Image       string
	Shell       string
	ShellArgs   []string `yaml:"shell_args"`
	EnvVars     []string `yaml:"env_vars"`
	Script      []string
	Parameters  []Parameters
}
