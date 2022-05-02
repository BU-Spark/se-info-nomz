vvv LATEST .CRX RELEASE vvv

[![Latest .crx](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml/badge.svg)](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml)

For information regarding selenium testing with the extension, refer [here](https://github.com/BU-Spark/se-info-nomz/blob/dev/SeleniumREADME.md)

# InfoNomz
InfoNomz is a web extension tool that keeps track of your media consumption and converts this data into useful statistics. InfoNomz notably analyzes news media that you consume, sorts political content into a specific political leaning with the help of [AllSides Media Bias Ratings](https://www.allsides.com/media-bias) and provides visualizations of how much of each type of political leaning you tend to consume.

# Installation (Google Chrome)
1. **DOWNLOAD** the project as a zip and unzip the project any folder.
2. Open Google Chrome, and enter chrome://extensions/ into the search bar. You can alternatively access this by going to **SETTINGS** and clicking **EXTENSIONS**.
3. In the top-right corner, enable **DEVELOPER MODE**.
4. Click on **LOAD UNPACKED**. Go to the folder where you unzipped the project and click into the **src** directory. Select this folder, and if everything has worked, the extension should appear. 

# Usage
1. After installing InfoNomz, check the top-right corner and click on the jigsaw icon. Click on "InfoNomz Browser Extension" to access the tool. You can additionally **pin** it for ease of access.
2. If you wish to test the extension with python locally, you can get the .crx file of our extension through the button at the top of the README to access the github workflow. From there, click on the most recent workflow and download the Artifact (labeled my-artifact-crx) to get the .crx file of the extension. The `test_local.py` file can be used as a template of sorts to test the extension locally automatically.

# Future Updates
We are constantly aiming to improve the functionality of InfoNomz and to add more and more features to it. As time passes, we plan on implementing these features into the extension eventually: 

● More statistics and visualizations to help users better understand their consumption habits

● Suggest possible alternative news media to users that may tend to explore one side of the political spectrum more than the other

● Sorting media consumption into categories (sports, business, politics, etc.) and suggesting articles of media from categories that you may not explore as often
