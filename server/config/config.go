package config

import "fmt"

type Config struct {
	Host  string `cfgDefault:"0.0.0.0"`
	Port  int    `cfgDefault:"8080"`
	Tasks string `cfgDefault:"tasks"`
}

func (c Config) ListenAddress() string {
	return fmt.Sprintf("%s:%d", c.Host, c.Port)
}
