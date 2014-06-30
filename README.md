# Enterprise Configurator

CLI and configuration helpers for npm Enterprise.

## Config

Configuration singleton with default values and descriptions appropriate for a
base npm Enterprise installation.

* **binaryDirectory:** where should tarballs be stored?
* **couchUrl:** where should package meta-information be stored?
* **frontDoorHost:** front-facing url for npm Enterprise.
* **registryDBName:** name of package database.

## Cli

A command-line-interface helper designed to run side-by-side with the configuration
singleton.

## Logger

Logging helper, with pretty colors, and a way to turn off logging in tests.
