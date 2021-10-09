#!/bin/bash

ssh -T antonio@51.77.56.102 << EOF
cd ~/manage-scripts/scripts && ./pastElections.sh
EOF