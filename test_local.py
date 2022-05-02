'''
test_local.py
For automated testing with the extension with chromedriver and selenium. Feel free to use this as a template for testing the extension locally.
'''

from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from time import sleep
import pytest
import os
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

chrome_options = ChromeOptions()
chrome_options.add_extension('src.crx')

driver = webdriver.Chrome('<your chromedriver path>', options = chrome_options)
driver.get('https://google.com')
sleep(3)
driver.get('https://youtube.com')
sleep(3)
#driver.get('chrome-extension://<UNIQUE ID HERE>/analysis.html')
sleep(3)
#driver.get('chrome-extension://<UNIQUE ID HERE>/popup.html')
input('Press [Enter] To close browser')
#driver.quit()
print("done testing selenium")
