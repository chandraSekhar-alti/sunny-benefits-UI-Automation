class UIActions {
    
    // Predefined wait times
    smallWait = 2000;  // 2 seconds
    mediumWait = 5000; // 5 seconds
    largeWait = 10000; // 10 seconds

    /**
     * Waits for an element to be displayed.
     * @param {WebdriverIO.Element} element - The element to check.
     * @param {number} timeout - Timeout in milliseconds.
     */
    async waitForElementDisplayed(element, timeout = this.mediumWait) {
        try {
            await element.waitForDisplayed({ timeout });
            console.log(`✅ Element displayed: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Element not displayed: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Waits for an element to be clickable.
     * @param {WebdriverIO.Element} element - The element to check.
     * @param {number} timeout - Timeout in milliseconds.
     */
    async waitForElementClickable(element, timeout = this.mediumWait) {
        try {
            await element.waitForClickable({ timeout });
            console.log(`✅ Element is clickable: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Element is NOT clickable: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Checks if an element is enabled.
     * @param {WebdriverIO.Element} element - The element to check.
     * @returns {Promise<boolean>} - Returns true if the element is enabled.
     */
    async isElementEnabled(element) {
        try {
            const isEnabled = await element.isEnabled();
            console.log(`🔍 Element ${element.selector.toString()} is ${isEnabled ? "enabled" : "disabled"}`);
            return isEnabled;
        } catch (error) {
            console.error(`❌ Failed to check if element is enabled: ${element.selector.toString()} | Error: ${error.message}`);
            return false;
        }
    }

    /**
     * Clicks on an element after ensuring it is displayed, clickable, and enabled.
     * @param {WebdriverIO.Element} element - The element to click.
     * @param {number} timeout - Timeout in milliseconds.
     */
    async clickElement(element, timeout = this.mediumWait) {
        try {
            await this.waitForElementDisplayed(element, timeout);
            await this.waitForElementClickable(element, timeout);

            if (!(await this.isElementEnabled(element))) {
                throw new Error(`Element ${element.selector.toString()} is not enabled.`);
            }

            await element.click();
            console.log(`✅ Clicked on element: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Failed to click on element: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Launches a given URL.
     * @param {string} url - The URL to launch.
     */
    async launchUrl(url, timeout = this.largeWait) {
        try {
            await browser.navigateTo(url);
            await browser.waitUntil(
                async () => (await browser.execute(() => document.readyState)) === 'complete',
                {
                    timeout: timeout,
                    timeoutMsg: `❌ Page did not load within ${timeout / 1000} seconds`
                }
            );
            console.log(`✅ Launched URL: ${url} (Waited for ${timeout / 1000} seconds)`);
        } catch (error) {
            console.error(`❌ Failed to launch URL: ${url} | Error: ${error.message}`);
            throw error;
        }
    }
    

    /**
     * Sends text to an input field.
     * @param {WebdriverIO.Element} element - The input element.
     * @param {string} text - The text to enter.
     */
    async sendText(element, text) {
        try {
            await this.waitForElementDisplayed(element);
            await element.setValue(text);
            console.log(`✅ Sent text: "${text}" to element: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Failed to send text to element: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Clears an input field and sends new text.
     * @param {WebdriverIO.Element} element - The input element.
     * @param {string} text - The text to enter.
     */
    async clearAndSendText(element, text) {
        try {
            await this.waitForElementDisplayed(element);
            await element.clearValue();
            await element.setValue(text);
            console.log(`✅ Cleared and sent text: "${text}" to element: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Failed to clear and send text to element: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Scrolls to an element.
     * @param {WebdriverIO.Element} element - The element to scroll to.
     */
    async scrollToElement(element) {
        try {
            await this.waitForElementDisplayed(element);
            await element.scrollIntoView();
            console.log(`✅ Scrolled to element: ${element.selector.toString()}`);
        } catch (error) {
            console.error(`❌ Failed to scroll to element: ${element.selector.toString()} | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Waits for the page to load completely.
     */
    async waitForPageLoad() {
        try {
            await browser.waitUntil(
                async () => (await browser.execute(() => document.readyState)) === "complete",
                { timeout: this.largeWait, timeoutMsg: "❌ Page did not load within the expected time." }
            );
            console.log(`✅ Page loaded successfully.`);
        } catch (error) {
            console.error(`❌ Page load failed | Error: ${error.message}`);
            throw error;
        }
    }

    /**
     * Gets the current URL of the browser.
     * @returns {Promise<string>} - The current URL.
     */
    async getCurrentUrl() {
        try {
            const url = await browser.getUrl();
            console.log(`🔍 Current URL: ${url}`);
            return url;
        } catch (error) {
            console.error(`❌ Failed to get current URL | Error: ${error.message}`);
            throw error;
        }
    }
}
module.exports = new UIActions();