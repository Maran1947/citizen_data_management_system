package responses

import "github.com/gofiber/fiber/v2"

type UserResponse struct {
	Status   int        `json:"status"`
	Message  string     `json:"message"`
	Data     *fiber.Map `json:"data"`
	Total    int64      `json:"total"`
	Page     int        `json:"page"`
	LastPage float64    `json:"lastPage"`
}
