#!/bin/bash
cd ..
echo "Downloading last artifact"
curl -s --location --output artifacts.zip --header "Private-Token: ZJokDQN_wB-PpbGUcaPZ" https://gitlab.com/api/v4/projects/io-team%2Fvisioconsult/jobs/artifacts/master/download?job=robot
echo "Unrip artifact"
unzip -q -o artifacts.zip
rm artifacts.zip
echo "Running post upgrade script from robot folder"
cd robot
exec ./post-upgrade.sh
