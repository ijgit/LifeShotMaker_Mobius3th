#import pigpio
import time
import sys
import os
from picamera import PiCamera
import requests
import time

#pi = pigpio.pi()
#pin = 12
#pin2 = 13
#pi.set_mode(pin, pigpio.OUTPUT)
#pi.set_mode(pin2, pigpio.OUTPUT)

#pi.set_servo_pulsewidth(pin, 2000)
#pi.set_servo_pulsewidth(pin2, 2000)

try:
    var1 = sys.argv[1]
    '''
    file = open('./degree.txt', 'r')
    degree = file.readline()
    file.close()
    file = open('./degree2.txt', 'r')
    degree2 = file.readline()
    file.close()
    degree = int(degree)
    degree2 = int(degree2)
    '''

    if var1 == "0":
      '''
      print("90 degree")
      file = open('./degree.txt', 'w')
      file.write("1450")
      file.close()
      file = open('./degree2.txt', 'w')
      file.write("1450")
      file.close()
      pi.set_servo_pulsewidth(pin, 1450)
      pi.set_servo_pulsewidth(pin2, 1450)
      '''
      #time.sleep(1)

    elif var1 == "1":
      '''
      tmpDeg = int(degree) - 190  # 19
      pi.set_servo_pulsewidth(pin, tmpDeg)
      pi.set_servo_pulsewidth(pin2, degree2)
      tmpDeg = str(tmpDeg)
      print(tmpDeg + ' cycle')
      file = open('./degree.txt', 'w')
      file.write(tmpDeg)
      file.close()
      '''

    elif var1 == "3":
      '''
      tmpDeg = int(degree) + 190  # 19
      pi.set_servo_pulsewidth(pin, tmpDeg)
      pi.set_servo_pulsewidth(pin2, degree2)
      tmpDeg = str(tmpDeg)
      print(tmpDeg + ' cycle')
      file = open('./degree.txt', 'w')
      file.write(tmpDeg)
      file.close()
      '''

    elif var1 == "4":
      '''
      tmpDeg2 = int(degree2) - 190  # 19
      pi.set_servo_pulsewidth(pin, degree)
      pi.set_servo_pulsewidth(pin2, tmpDeg2)
      tmpDeg2 = str(tmpDeg2)
      print(tmpDeg2 + ' cycle')
      file = open('./degree2.txt', 'w')
      file.write(tmpDeg2)
      file.close()
      '''

    elif var1 == "2":
      '''
      tmpDeg2 = int(degree2) + 190  # 19
      pi.set_servo_pulsewidth(pin, degree)
      pi.set_servo_pulsewidth(pin2, tmpDeg2)
      tmpDeg2 = str(tmpDeg2)
      print(tmpDeg2 + ' cycle')
      file = open('./degree2.txt', 'w')
      file.write(tmpDeg2)
      file.close()
      '''

    elif var1 == "5":
      os.system('./streamKill.sh')
      '''
      pi.set_servo_pulsewidth(pin, degree)
      pi.set_servo_pulsewidth(pin2, degree2)
      '''
      file = open('./tas_sample/Cam01/index.txt', 'r')
      index = file.readline()
      file.close()

      camera = PiCamera()
      camera.resolution = (1280, 720) #(1920, 1080)
      camera.rotation = 180
      #camera.framerate = 15
      camera.capture('/home/pi/nCube-Thyme-Nodejs-master/tas_sample/Cam01/' + index + '.jpg')

      file = open('./tas_sample/Cam01/index.txt', 'w')
      tmp = int(index) + 1
      file.write(str(tmp))
      file.close()
      print("capture")

    else:
      print("Wrong Input")
      '''
      pi.set_PWM_dutycycle(pin, 192)
      pi.set_PWM_dutycycle(pin2, 192)
      time.sleep(1)
      '''

except KeyboardInterrupt:
    #pi.set_PWM_dutycycle(pin, 192)
    #pi.set_PWM_dutycycle(pin2, 192)
