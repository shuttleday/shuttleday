#!/bin/bash

# Store the input tag value in a variable
input_tag=$1

# Read the current tag value from overlays/staging/api-deployment.patch.yml in the k8s repo
file_content=$(curl https://raw.githubusercontent.com/shuttleday/k8s/main/overlays/staging/api-deployment.patch.yaml)
current_tag=$(awk -F'ghcr.io/shuttleday/api:' '/ghcr.io\/shuttleday\/api/ {match($2, /[0-9]+\.[0-9]+\.[0-9]+-rc([0-9]+)/, arr); print substr($2, RSTART, RLENGTH), arr[1]}' <<< "$file_content")

# Extract semantic version of the tag
current_semantic_version=$(echo "${current_tag}" | awk -F'-rc' '{print $1}')

# Extract the numeric portion of "rc"
current_rc_number=$(echo "${current_tag}" | awk -F'-rc' '{print $2}')

# Check if the input tag is different from the current tag
if [[ "${input_tag}" != "${current_semantic_version}" ]]; then
  updated_tag="${input_tag}-rc1"
  echo "${updated_tag}"
else
  # Increment the "rc" number
  updated_rc_number=$(($current_rc_number + 1))
  
  # Construct the updated tag with the incremented "rc" number
  updated_tag="${input_tag}-rc${updated_rc_number}"
  
  echo "${updated_tag}"
fi
