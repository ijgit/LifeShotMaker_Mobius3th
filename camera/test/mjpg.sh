export STREAMER_PATH=$HOME/project/mjpg-streamer/mjpg-streamer-experimental
export LD_LIBRARY_PATH=$STREAMER_PATH
$STREAMER_PATH/mjpg_streamer -i "input_raspicam.so -fps 30 -x $1 -y $2 -rot 180" -o "output_http.so -p 8091 -w $STREAMER_PATH/www" -o "output_file.so -f pics -d 15000"

