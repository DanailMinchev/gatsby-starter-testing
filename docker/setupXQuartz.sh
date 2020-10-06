#!/usr/bin/env bash

set -euo pipefail

# pass DISPLAY variable pointing at the host's X11 server
# like XQuartz
# see:
# - https://sourabhbajaj.com/blog/2017/02/07/gui-applications-docker-mac/
# - https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/
IP=$(ipconfig getifaddr en0)
xhost + $IP
export DISPLAY=$IP:0
