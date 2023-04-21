#!/bin/bash

$GHCR_TOKEN=$1
PREV_TAG=$(cat prevVersion.txt 2>/dev/null || true)
DESIRED_TAG=$(jq -r '.version' src/version.json)

if [$DESIRED_TAG == $PREV_TAG]; then
    echo "No changes in tag. Exiting."
    exit 0
fi

echo $DESIRED_TAG > prevVersion.txt
docker login ghcr.io -u PScoriae -p $GHCR_TOKEN
docker buildx build --push --platform linux/amd64,linux/arm64 --builder=build-container -t ghcr.io/shuttleday/api:$DESIRED_TAG -t ghcr.io/shuttleday/api .
echo "CHANGED"
