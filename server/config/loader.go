package config

import (
	"github.com/gosidekick/goconfig"
	"github.com/pkg/errors"
)

func Load() (Config, error) {
	config := Config{}

	err := goconfig.Parse(&config)

	if err != nil {
		return Config{}, errors.Wrap(err, "error loading config")
	}

	return config, nil
}
