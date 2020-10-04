package responses

type Error struct {
	Message string `json:"message"`
}

func (e Error) Error() string {
	return e.Message
}

var _ error = Error{}

var (
	NotFound = Error{
		Message: "Not found",
	}

	BadRequest = Error{
		Message: "Bad request",
	}
)
