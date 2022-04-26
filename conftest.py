from selenium import webdriver
from selenium.webdriver.chrome.options import Options as ChromeOptions
from time import sleep
import pytest
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager
from webdriver_manager.utils import ChromeType

#comment
@pytest.fixture()
def setup(request):

    chrome_options = ChromeOptions()
    chrome_options.add_extension('src.crx')

    options = [
    "--disable-gpu",
    "--window-size=1920,1200",
    "--ignore-certificate-errors",
    "--no-sandbox",
    "--disable-dev-shm-usage"
]
    for option in options:
        chrome_options.add_argument(option)

    request.cls.driver = webdriver.Chrome(ChromeDriverManager().install(), options=chrome_options)
    #chrome_service = Service(ChromeDriverManager(chrome_type=ChromeType.GOOGLE).install())
    #request.cls.driver = webdriver.Chrome(service=chrome_service, options=chrome_options)
    #request.cls.driver = webdriver.Chrome(executable_path='.\chromedriver\chromedriver.exe', options=chrome_options)

    yield request.cls.driver
    request.cls.driver.close()
