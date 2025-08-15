# E2E test framework for Swag Labs test e-commerce webpage

## Introduction

Goal of this framework is to perform E2E UI tests using Playwright library with Typescript. CI/CD solution is based on GitHub Actions.

**Framework dependencies:**

- Prettier and respective plugins
- ESlint and respective plugins
- Husky

Tests are based on the standard user, where no error or glitches appear. Considering no documentation is provided, **user experience** approached was used to determine what is an expected page behavior.

#### **You may checkout detailed framework description below.**

## Configuration

- Install node  
  `https://nodejs.org/en/download`
- Install VSCode  
  `https://code.visualstudio.com/`
- Verify if node is correctly installed  
  `node -v`
- Clone repository
  `git clone https://github.com/Pawel-Bukacz/TechTask1.git`
  Or download it as a zip folder, unzip it and drop into your project folder
- Initialize playwright project  
  `npm init playwright@latest`
- Delete following folder:
  - Test examples
  - e2e
- Add following extensions to VS Code  
   Extensions could be found in .vscode > settings.json file
  - ESlin
  - Playwright Test for VSCode
  - Prettier - Code formatter
  - Material Icon Theme
  - GitHub Actions

- Run this command to run all the dependencies
  ```javascript
  npm i -D \
    prettier \
    eslint \
    @eslint/js \
    typescript \
    eslint-plugin-playwright \
    eslint-config-prettier \
    eslint-plugin-prettier \
    @trivago/prettier-plugin-sort-imports \
    husky
  ```

#### OR do it manually:

- Install and configure Prettier package
  - `npm i -D prettier `
  - create `.prettierignore` file and configure it as you see fit
  - create `.prettierrc.json`file and configure it as you see fit
- Install and configure ESLint:
  - `npm init @eslint/config@latest`
  - configure config file as you see fit
- Integrate ESlint with Prettier
  - `npm i -D eslint-plugin-prettier `
  - config installation: `npm i –D eslint-config-prettier`
- Install ESLint plugin for playwright
  - `npm i –D eslint-plugin-playwright`
- Install package for import sorting
  - `npm i -D @trivago/prettier-plugin-sort-imports`
- Install husky
  - `npm i -D husky --save-dev`
  - init husky  
    `npx husky`
- CI/CD configuration
  - add this repository to your GitHub
  - make sure that Actions is allowed for the repo: `Repo > Settings > Actions > Actions permissions: Allow GitHub Actions to run`

## Framework detailed description

**Framework goal is to test functionalities of 5 main pages:**

- Authentication
- Products page
- Add to cart
- Checkout
- Burger Menu

POM pattern was used for better readability, scalability, but also for easier potential refactor, if needed.
Best practices for Typescript were used and applied.

**For that, following pages where created:**

- base.page.ts
- burger-menu.page.ts
- checkout.page.ts
- footer.page.ts
- login.page.ts
- main.page.ts
- product-description.page.ts

**Additionally, component class was created for main page subpages:**

- main-menu.components.ts

**Test data files are separated by functionalities where these files are used:**

- checkout.data.ts
- footer.data.ts
- login.data.ts
- product.data.ts

**Note**: environment setup was not done due to size and style of the project. Could be done in the future using dotenv library and respective configurations

### Tests

Tests were created for functionality on each page of the webpage.  
All tests could be found in `tests` folder.

**Smoke tests** are focused on webpage availability and readiness for testing.  
File: `main-page-smoke.spec.ts`

**Login page tests** are focused on verifying authentication process using correct data or incorrect username/password.  
File: `login.spec.ts`

**Footer tests** are focused on verifying where does the footer icons redirect the user (to which URL).  
File: `footer.spec.ts`

**Burger menu tests** are focused on verifying redirection of every button presented in that menu.  
`Reset App State button` is verified by firstly adding items to the cart and then clicking the button.  
File: `burger.spec.ts`

**Inventory page tests** are focused on the products presented for the user.

As mentioned before in introduction [Introduction](#Introduction), **user-experience** approach was used. So, what user sees on the page is the expected behavior.

Same approach was used for validation product details. `product.data.ts` file was created based on data presented on the page. This data is considered as correct and as a documentation, which could be used for further validation and use in tests.

Test `Check every product title` verifies if title of each of the product is compliant with the documentation.
Test `Check details of each product` verifies if details (title, description, price) of each of the product is compliant with the documentation.

File: `product-page.spec.ts`

**Add-to-Cart tests** are the combination of tests for Add to cart and Checkout page functionalities.  
These tests were combined due to very similar nature of the test, but also the position of the pages.

Checkout tests are focused on the checkout form, where verification of each case (correct data,incorrect fist name, second name, postal code).

Test `Verifying checkout functionality` is checking both adding to cart and checkout functionalities. Difference from previous test is, this one checks whole functionality, from adding the items to cart, to successful checkout.

File: `checkout.page.ts`

### CI/CD

GitHub Actions is used as a CI/CD solution for this project. This solution fulfill every current need but also potential expansions and reworks.

Tests are executed as following:

- First smoke tests run
- If result of smoke test is positive, rest of the tests are executed.

To run tests from GitHub Actions:

- Go to Actions
- Click on the respective workflow
- Click `run workflow`
- Click `run workflow`

After run is complete, test results could be collected and analyzed.

### Test reports

For test reporting, native Playwright solution is used. While there are definitively better solutions on the market, for example Allure report, due to size and simplicity of the project, native solution is used.

Test reports could be obtained after locally running the tests by using `npm run report` command.

Due to CI/CD solution being GitHub Actions, report could be seen in the respective tabs:

- Go to Actions
- Click on latest workflow run
- Click on test
- Click on `Run tests`.
- Test results are presented

If errors occurred, `playwright-report` and `playwright-traces` could be manually downloaded and implemented into the project to manually verify the results:

- Download and unzip folders
- Drop them inside the project folder
- Delete previous folders with reports from the project if needed.
- Run `npm run report` command.

### Assumptions and limitation

Checkout functionality test was simplified by adding all items to cart and checking right before the checkout, if text, title and price is presented in HTML body.  
Same goes for price check.  
While it definitely could be written better and more precise (for example, adding just 2 products and checking out), for the purpose of the project, such solution was applied.

Not having different locator ids for description and price on both inventory and checkout-step-two pages is a limitation for main page and checkout page testing.

Sorting button functionality was not tested in this project. While definitely being possible to automate, it is better to test such functionalities manually, using human eye.

#### Bugs and UX issues

Following bugs and UX issues were discovered:

- User could checkout without adding any item to cart
- While being on checkout-step-two, clicking `Cancel` button redirects user to Inventory page.  
  It should be previous page, which is checkout-step-one.
- About button in burger menu does open a new tab, as every footer button does.
