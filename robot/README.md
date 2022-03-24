### Install from source

Make sure the folder is located at `/home/pi/robot` and tun npm install first

    npm install

Copy Robot service file into the /etc/systemd/system directory. Then make systemd aware of the new service:

    sudo cp ./robot.service /etc/systemd/system
    sudo cp ./uv4l/uv4l.service /etc/systemd/system
    sudo cp ./uv4l/uv4l.conf /etc/uv4l/

    sudo systemctl enable robot
    sudo systemctl enable uv4l
    
Reload systemd daemon:

    sudo systemctl daemon-reload

And start service

    sudo systemctl start uv4l
    sudo systemctl start robot
    

## Logs and debug


To show UV4L logs : 

    journalctl -u uv4l -f

For Robot logs :

    journalctl -u robot -f


## Usage

Base on [image](https://hub.docker.com/r/arm32v6/node/) for Node and `armv6` processors.

Build the armv6 image and save it to a tarball.

```bash
npm run build
```

This will generate a file `robot-armv6.tar` and an image `robot:armv6`


#### On your pi

```bash
# Load the transfered tar
docker load -i robot-armv6.tar
```

```bash
docker run -d --rm --privileged=true --name robot --net=host robot:armv6
```



#### MQTT Command & State


### States
Topic : */vc/[USER_ID]/state*

```json
    {
        "authenticated":true,
        "gateway":"standby",
        "robot":{"Ultrason":[0,0,0,0],"verinStep":0,"linear":0,"angular":0,"Vbat":12.5},
        "userId":"USER_ID",
        "error":null,
        "timestamp":1557844151
    }
```
### Robot commands

Topic : */vc/[USER_ID]/command*

```json
{
        "type":"robot",
        "body": {
            "command":"linear",
            "value":"forward",
        },
        "timestamp":1557844151
}

```


