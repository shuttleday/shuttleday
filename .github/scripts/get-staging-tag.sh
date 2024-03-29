#!/bin/bash

# Store the input tag value in a variable
input_tag=$1

# Read the current tag value from overlays/staging/api-deployment.patch.yml in the k8s repo
file_content=$(curl https://raw.githubusercontent.com/shuttleday/k8s/main/overlays/staging/api-deployment.patch.yaml)
current_tag=$(awk -F':' '{print $3}' <<< "$file_content")

# Extract semantic version of the tag
current_semantic_version=$(echo "${current_tag}" | awk -F'-rc' '{print $1}' | tr -d '\n')

# Extract the numeric portion of "rc"
current_rc_number=$(echo "${current_tag}" | awk -F'-rc' '{print $2}' | tr -d '\n')

# Check if the input tag is different from the current semantic tag
if [ "$input_tag" = "$current_semantic_version" ]; then
  # Increment the "rc" number
  let updated_rc_number=$current_rc_number+1
  
  # Construct the updated tag with the incremented "rc" number
  updated_tag="${input_tag}-rc${updated_rc_number}"
  
  echo "${updated_tag}"
else
  updated_tag="${input_tag}-rc1"
  echo "${updated_tag}"
fi
