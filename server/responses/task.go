package responses

type TaskInfo struct {
	Id          string `json:"id"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type TaskList struct {
	Tasks []TaskInfo `json:"tasks"`
}

type TaskDetail struct {
	Id          string       `json:"id"`
	Name        string       `json:"name"`
	Description string       `json:"description"`
	Parameters  []Parameters `json:"parameters"`
}

type Parameters struct {
	Id           string   `json:"id"`
	Name         string   `json:"name"`
	Description  string   `json:"description"`
	Required     bool     `json:"required"`
	Type         string   `json:"type"`
	Pattern      string   `json:"pattern"`
	ErrorMessage string   `json:"errorMessage"`
	Choices      []Choice `json:"choices"`
}

type Choice struct {
	Value       string `json:"value"`
	Name        string `json:"name"`
	Description string `json:"description"`
}

type Result struct {
	StatusCode int    `json:"statusCode"`
	Output     string `json:"output"`
	Error      string `json:"error"`
}
