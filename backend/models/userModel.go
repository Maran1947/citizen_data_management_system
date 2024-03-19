package models

import "go.mongodb.org/mongo-driver/bson/primitive"

type User struct {
	Id        primitive.ObjectID `json:"_id,omitempty" bson:"_id,omitempty"`
	FirstName string             `json:"firstname,omitempty" validate:"required"`
	LastName  string             `json:"lastname,omitempty" validate:"required"`
	Dob       string             `json:"dob,omitempty" validate:"required"`
	Gender    string             `json:"gender,omitempty" validate:"required"`
	Address   string             `json:"address,omitempty" validate:"required"`
	City      string             `json:"city,omitempty" validate:"required"`
	State     string             `json:"state,omitempty" validate:"required"`
	Pincode   string             `json:"pincode,omitempty" validate:"required"`
}
