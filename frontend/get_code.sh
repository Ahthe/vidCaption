#!/bin/bash

# Use the current directory as the project directory
project_dir=$(pwd | sed 's|\\|/|g')

# Use a fixed name for the output file in the current directory
output_file="${project_dir}/code_context.txt"

# Check if the output file exists and remove it if it does
if [ -f "$output_file" ]; then
  rm "$output_file"
fi

# Ensure the output file can be created
touch "$output_file" 2>/dev/null
if [ ! -f "$output_file" ]; then
  echo "Error: Cannot create output file '$output_file'. Please check permissions."
  exit 1
fi

# List of directories to look for
directories=("app" "common" "features")

# List of file types to ignore
ignore_files=("*.ico" "*.png" "*.jpg" "*.jpeg" "*.gif" "*.svg")

# Recursive function to read files and append their content
read_files() {
  for entry in "$1"/*; do
    if [ -d "$entry" ]; then
      # Ignore the node_modules directory
      if [[ $(basename "$entry") == "node_modules" ]]; then
        continue
      fi
      # If entry is a directory, call this function recursively
      read_files "$entry"
    elif [ -f "$entry" ]; then
      # Check if the file type should be ignored
      should_ignore=false
      for ignore_pattern in "${ignore_files[@]}"; do
        if [[ "$entry" == *$ignore_pattern ]]; then
          should_ignore=true
          break
        fi
      done

      # If the file type should not be ignored, append its relative path and content to the output file
      if ! $should_ignore; then
        relative_path=${entry#"$project_dir/"}
        echo "// File: $relative_path" >> "$output_file"
        cat "$entry" >> "$output_file"
        echo "" >> "$output_file"
      fi
    fi
  done
}

# Call the recursive function for each specified directory in the project directory
for dir in "${directories[@]}"; do
  if [ -d "${project_dir}/${dir}" ]; then
    read_files "${project_dir}/${dir}"
  fi
done

echo "Code extraction completed successfully. Output file: '$output_file'"
