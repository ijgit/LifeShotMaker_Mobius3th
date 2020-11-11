#import pigpio
import time
import sys
import os

#pi = pigpio.pi()
#pin = 12
#pin2 = 13
#pi.set_mode(pin, pigpio.OUTPUT)
#pi.set_mode(pin2, pigpio.OUTPUT)


try:
    var1 = sys.argv[1]
    #pi.set_servo_pulsewidth(pin, 1450)
    #pi.set_servo_pulsewidth(pin2, 1450)

    if var1 == "0":
        print("init cam")
        #os.system('./streamKill.sh')

        file = open('../Cam01/index.txt', 'r')
        index = file.readline()
        file.close()
        for i in range(int(index)+1):
            os.remove('../Cam01/' + str(i) + '.jpg')

    elif var1 == "1":
        print("start cam")
        #file = open('../../degree.txt', 'w')
        #file.write("1450")
        #file.close()
        #file = open('../../degree2.txt', 'w')
        #file.write("1450")
        #file.close()
        #file = open('../Cam01/index.txt', 'w')
        #file.write('0')
        #file.close()

    else:
        print("wrong input")
        #pi.set_servo_pulsewidth(pin, 1450)
        #pi.set_servo_pulsewidth(pin2, 1450)
        #time.sleep(1)

except KeyboardInterrupt:
    #pi.set_servo_pulsewidth(pin, 1450)
    #pi.set_servo_pulsewidth(pin2, 1450)
