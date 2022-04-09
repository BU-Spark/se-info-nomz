import pytest

# name of the fixture function
@pytest.mark.usefixtures("setup")
class Test:
    def test_title(self):
        self.driver.get('https://google.com')
        assert self.driver.title == "Google"

    def test_title2(self):
        self.driver.get('https://youtube.com')
        assert self.driver.title == "YouTube"

