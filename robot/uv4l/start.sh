#!/bin/bash

uv4l --foreground -nopreview  --sched-rr --mem-lock --driver uvc  \
--server-option=--editable-config-file=/etc/uv4l/uv4l-uvc.conf \
--driver-config-file=/etc/uv4l/uv4l-uvc.conf  \
--config-file=/etc/uv4l/uv4l-uvc.conf 

# uv4l --foreground -nopreview --auto-video_nr --encoding mjpeg --width 320 --height 240 --framerate 10 \
# --server-option '--port=9090' --server-option '--max-queued-connections=5' \
# --server-option '--max-streams=3' --server-option '--max-threads=29' \
# --server-option '--user-password=your_password'

#/usr/bin/uv4l -nopreview --auto-video_nr --driver raspicam --encoding mjpeg --width 640 --height 480 --framerate 10 --server-option '--port=9090' --server-option '--max-queued-connections=30' --server-option '--max-streams=5' --server-option '--max-threads=29'