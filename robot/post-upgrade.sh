#!/bin/bash

echo "Install NodeJs packages"
npm install --silent

echo "Coping systemd service"

sudo cp ./robot.service /etc/systemd/system
sudo cp ./uv4l/uv4l.service /etc/systemd/system

echo "Coping UV4L configuration to /etc/uv4l/uv4l-uvc.conf"
sudo cp ./uv4l/uv4l-uvc.conf /etc/uv4l/


echo "Enable robot and uv4l service"
sudo systemctl enable robot
sudo systemctl enable uv4l

echo "Reloading daemon-reload"
sudo systemctl daemon-reload

echo "Starting UV4L service..."
sudo systemctl restart uv4l.service

echo "Starting robot service..."
sudo systemctl restart robot.service