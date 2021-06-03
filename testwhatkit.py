import webbrowser
import os
import pyautogui
import time
import pandas as pd
import sys

message = sys.argv[1]
# message = "from manual run"

df = pd.read_csv('sheet2.csv')


for n in range(3):


    df_list = df.values.tolist()
    list_lenth = len(df_list)

    name = df_list[n][0]
    name_first = name.split(",")[0]
    number = str(df_list[n][2])
    number = number[-10:]
    # name_first = "sohan"

    number = "91"+number


    messege = "Hi "+ name_first+ message
    # messege = "i hate you 🤢"

    messege = messege.replace(" ","%20")
    messege = messege.replace("/n", "%0a")
    url = 'https://api.whatsapp.com/send?phone='+number+'&text='+messege
    webbrowser.register('chrome',
        None,
        webbrowser.BackgroundBrowser("C://Program Files (x86)//Google//Chrome//Application//chrome.exe"))
    webbrowser.get('chrome').open(url)
    time.sleep(10)
    pyautogui.press('enter')
    os.system("taskkill /f /im chrome.exe")
