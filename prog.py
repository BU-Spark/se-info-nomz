from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions

chrome_options = ChromeOptions()
chrome_options.add_extension('src.crx')

driver = webdriver.Chrome('./chromedriver', options = chrome_options)
driver.get('https://google.com')
driver.get('https://youtube.com')
input('Press [Enter] To close browser')
driver.quit()