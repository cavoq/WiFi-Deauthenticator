#!/bin/bash

REQUIRED_PACKAGES=(
  aircrack-ng
  wireless-tools
  net-tools
  gawk
  ethtool
)

for pkg in "${REQUIRED_PACKAGES[@]}"
do
  if ! dpkg -s "$pkg" >/dev/null 2>&1; then
    echo "$pkg is not installed. Installing..."
    sudo apt-get update && sudo apt-get -y install "$pkg" || {
      echo "Failed to install $pkg. Exiting."
      exit 1
    }
  else
    echo "$pkg is already installed."
  fi
done

echo "All dependencies installed successfully."

