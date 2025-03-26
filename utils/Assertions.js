const chai = require('chai');
const expect = chai.expect;

class Assertions {
  /**
   * Assert that an element is visible
   * @param {WebdriverIO.Element} element - The WebdriverIO element
   */
  assertElementIsVisible(element) {
    expect(element.isDisplayed()).to.be.true;
  }

  /**
   * Assert that an element is not visible
   * @param {WebdriverIO.Element} element - The WebdriverIO element
   */
  assertElementIsNotVisible(element) {
    expect(element.isDisplayed()).to.be.false;
  }

  /**
   * Assert that an element contains expected text
   * @param {WebdriverIO.Element} element - The WebdriverIO element
   * @param {string} expectedText - The expected text
   */
  assertElementText(element, expectedText) {
    expect(element.getText()).to.equal(expectedText);
  }

  /**
   * Assert that an element's text contains a specific substring
   * @param {WebdriverIO.Element} element - The WebdriverIO element
   * @param {string} partialText - The expected substring
   */
  assertElementContainsText(element, partialText) {
    expect(element.getText()).to.include(partialText);
  }

  /**
   * Assert that the current URL matches the expected URL
   * @param {string} expectedUrl - The expected URL
   */
  assertUrlIs(expectedUrl) {
    expect(browser.getUrl()).to.equal(expectedUrl);
  }

  /**
   * Assert that the current URL contains a specific substring
   * @param {string} partialUrl - The expected substring in the URL
   */
  assertUrlContains(partialUrl) {
    expect(browser.getUrl()).to.include(partialUrl);
  }

  async validateUrl(expectedUrl, timeout = 30000) { // Default wait time: 30 seconds
    await browser.waitUntil(async () => {
      const currentUrl = await browser.getUrl();
      return currentUrl === expectedUrl;
    }, {
      timeout,
      timeoutMsg: `Expected URL to be ${expectedUrl}, but it didn't match within ${timeout / 1000} seconds.`,
      interval: 500 // Check every 500ms
    });

    const finalUrl = await browser.getUrl();
    expect(finalUrl).to.equal(expectedUrl, `Expected URL to be ${expectedUrl} but found ${finalUrl}`);
  }
}

module.exports = new Assertions();
