vvv LATEST .CRX RELEASE vvv

[![Latest .crx](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml/badge.svg)](https://github.com/BU-Spark/se-info-nomz/actions/workflows/pack_crx.yml)

For information regarding selenium testing with the extension, refer [here](https://github.com/BU-Spark/se-info-nomz/blob/dev/SeleniumREADME.md)

# InfoNomz
InfoNomz is a web extension tool that keeps track of your media consumption and converts this data into useful statistics. InfoNomz notably analyzes news media that you consume on a daily basis, and sorts any political content into a specific political leaning, based on that website's historical political leaning, with the help of [AllSides Media Bias Ratings](https://www.allsides.com/media-bias). InfoNomz will also even be able to offer you alternative sources of news media that may provide a differing perspective compared to your typical consumption, or other topics that you may not explore as often.


# Installation (Google Chrome)
1. **DOWNLOAD** the project as a zip and unzip the project any folder.
2. Open Google Chrome, and enter chrome://extensions/ into the search bar. You can alternatively access this by going to **SETTINGS** and clicking **EXTENSIONS**.
3. In the top-right corner, enable **DEVELOPER MODE**.
4. Click on **LOAD UNPACKED**. Go to the folder where you unzipped the project and click into the **src** directory. Select this folder, and if everything has worked, the extension should appear. 

# Usage
1. After installing InfoNomz, check the top-right corner and click on the jigsaw icon. Click on "InfoNomz Browser Extension" to access the tool. You can additionally **pin** it for ease of access.
2. If you wish to test the extension with python, you can get the .crx file of our extension through the button at the top of the README to access the github workflow. From there, click on the most recent workflow and download the Artifact (labeled my-artifact-crx) to get the .crx file of the extension. The `test_local.py` file can be used as a template of sorts to test the extension locally automatically.
