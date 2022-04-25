from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from time import sleep
import pytest
import os
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

print(os.getcwd())

chrome_options = ChromeOptions()
chrome_options.add_extension('src.crx')

driver = webdriver.Chrome('D:/chromedriver/chromedriver', options = chrome_options)
driver.get('https://google.com')
sleep(3)
driver.get('https://youtube.com')
sleep(3)
#driver.get('chrome-extension://kdhnefckgnkjjfbjpeebpeokgdfnkfkl/analysis.html')
sleep(3)
#driver.get('chrome-extension://kdhnefckgnkjjfbjpeebpeokgdfnkfkl/popup.html')
input('Press [Enter] To close browser')
#driver.quit()
print("done testing selenium")

#my unique id kdhnefckgnkjjfbjpeebpeokgdfnkfkl
