#!/bin/bash

. ton-env.sh

#ELECTOR_ADDR="-1:$($TONOS_CLI -c $TONOS_CLI_CONFIG getconfig 1 | grep 'p1:' | sed 's/Config p1:[[:space:]]*//g' | tr -d \")"
ELECTOR_ADDR="-1:3333333333333333333333333333333333333333333333333333333333333333"

RESULT=$($TONOS_CLI -c $TONOS_CLI_CONFIG runget $ELECTOR_ADDR past_elections | awk -F'Result: ' '{print $2}' | jq .)

CURRENT_VALIDATION_START=$(echo $RESULT | jq .[][0][0] | tr -d \")
# CURRENT_ELECTION_START=$(echo $RESULT | jq .[][0][1] | tr -d \")
CURRENT_TOTAL_STAKE=$(echo $RESULT | jq .[][0][5] | tr -d \")
CURRENT_TOTAL_REWARD=$(echo $RESULT | jq .[][0][6] | tr -d \")

# NEXT_VALIDATION_START=$(echo $RESULT | jq .[][1][0][0] | tr -d \")
# NEXT_ELECTION_START=$(echo $RESULT | jq .[][1][0][1] | tr -d \")
# NEXT_TOTAL_STAKE=$(echo $RESULT | jq .[][1][0][5] | tr -d \")
# NEXT_TOTAL_REWARD=$(echo $RESULT | jq .[][1][0][6] | tr -d \")

echo $CURRENT_VALIDATION_START
echo $CURRENT_TOTAL_STAKE
echo $CURRENT_TOTAL_REWARD