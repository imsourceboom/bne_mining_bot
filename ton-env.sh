#!/bin/bash

SHELL_DIR=$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd -P)
export SHELL_DIR

# Linux tonos-cli
#export TONOS_CLI="$HOME/net.ton.dev/tonos-cli/target/release/tonos-cli"
# local tonos-cli
export TONOS_CLI="$HOME/Documents/ton/tonos-cli/target/release/tonos-cli"

export TONOS_CLI_CONFIG="$SHELL_DIR/tonos-cli.conf.json"