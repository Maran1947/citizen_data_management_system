package main

import (
	"citizen_data_management_system/configs"
	"citizen_data_management_system/routes"

	"github.com/gofiber/fiber/v2"
	"github.com/gofiber/fiber/v2/middleware/cors"
)

func main() {
	app := fiber.New()

	// connect to db
	configs.ConnectDB()

	app.Use(cors.New(cors.Config{
		AllowOrigins: "http://localhost:3000",
		AllowHeaders: "Origin, Content-Type, Accept",
	}))

	// routes
	routes.UserRoute(app)

	app.Listen("localhost:5000")
}
