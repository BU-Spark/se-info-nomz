For all things related to Selenium, please follow this guide.

[![Latest .crx](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml/badge.svg)](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml)

# Testing Chrome Extensions w/ Selenium
1. Download and install the **InfoNomz** browser extension on your Google Chrome. Instructions for installing it can be found in the README. 

2. You will need the packed .crx file for the extension next. You can get the .crx file of our extension through the button at the top of to access the github workflow that automatically creates it. From there, click on the most recent job for that workflow and download the Artifact (labeled my-artifact-crx) to get the .crx file of the extension.

3. You will need to install both Selenium and ChromeDriver. The former can be done with `pip install selenium`. The latter can be done by visiting their [website](https://chromedriver.chromium.org/downloads) and downloading chromedriver.exe from there. Get the one that matches your specific version of Chrome, which can be found by going to **Settings --> About Chrome**. After downloading the zip file, unarchive it in a directory that will have permission to run it.

4. To test if ChromeDriver is working, try to run the **test_local.py** file in the directory. If everything is working, it should open up Chrome automatically and go through the websites. It also acts as a good benchmark of the code you will need in order to make a script using Selenium and ChromeDriver.

5. If you want to test the actual .html files of the extension (i.e. the ones that can be found in the **src** directory), you must get the **Unique ID** of your extension in your extensions page in Google Chrome. However, because Chrome has added user profiles to browsers, this makes things a bit complicated. In order to test them with ChromeDriver, you need to install **InfoNomz** on the Chrome browser that ChromeDriver opened up by itself, and get the **ID** from there. If you try to use the ID on your own opened Chrome browser, the ChromeDriver will not be able to open the specific pages of your extension to test (There will be an error saying that Chrome blocked this connection. This can also occur if you have AdBlock on presumably). Once you have obtained the ID of the extention from the **ChromeDriver** opened browser, format the url as such: `chrome-extension://<YOUR ID>/<PAGE YOU WANT TO TEST>.html`. Put this into your script instead as the link, and assuming everything has gone right, you should be able to interact with the extension as you would if it was a typical .html page. 


# Setting up GitHub Actions w/ Selenium (python)
1. Go to **Actions** and create a **New Workflow**. 

2. In the search bar type in `python` and select **Python Package**. You can alternatively create one from scratch if you have a template in mind.

3. From here you will be able to edit the workflow .yml file. The first **Name** is just to denote what you want to name this workflow. **On** determines when you want this workflow to execute. **Steps** is where you put the commands that you want the .yml to run. The first part of it, notably `actions/checkout@v3` and `actions/setup-python@v3` sets up the repository so that all the directories and files in the repo can be used for the following commands. For any additional parts, you follow the template and create a **Name** for the process, and enter what command you want to be run in the **Run** line (e.g. echo hello world!). 

4. You will have to install all dependencies before you can run the commands. To do this, you can either create a requirements.txt file in the repo (the python package template will then be able to locate and find it), or you can have the .yml install the packages individually. For the purposes of testing chrome, you may require the chromium browser (`sudo apt-get install -y chromium-browser`). Other packages that you most likely will end up needing but not limited to, are selenium, webdriver-manager, pytest. 

5. After installing all packages and setting up the checkout/setup, you can do `pytest` as the final command, and this will essentially run pytest based on what you set for the workflow trigger to be (for example, everytime you perform a push or pull request). You can also have the workflow run other commands if need-be. NOTE that your file must be named "test_..." for pytest to detect and test it. 

6. For an example of such a workflow, you can check the `hyuan-testbranch` branch and look at **test_selenium.yml** in the workflow directory. If you push to dev branch, it will run and test the **test_selenium.py** file, and assuming everything has worked fine, will show up in the actions history as a Success. If not, it will show up as a Failure, and you can click on the action to check where it failed and what the error log was. 
