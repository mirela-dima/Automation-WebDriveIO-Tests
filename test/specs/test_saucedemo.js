describe('saucedemo.ro', () => {
    it('I should not login with incorrect credentials', async () => {
        await browser.url('http://saucedemo.com/');
        const userField = await $('#user-name');
        await userField.setValue('standard_user');
        const passwordField = await $('#password');
        await passwordField.setValue('123456');
        const loginButton = await $('#login-button');
        await loginButton.click();
    
        await expect($('.error-message-container')).toHaveText('Epic sadface: Username and password do not match any user in this service')
    })

    it('I should login with correct credentials', async () => {
        browser.url('http://saucedemo.com/')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()

        await expect($('.title')).toExist();
    })

    it('I should logout after login', async () => {
        browser.url('http://saucedemo.com/')
        const userField = await $('#user-name').setValue('standard_user')
        const passwordField = await $('#password').setValue('secret_sauce')
        const loginButton = await $('#login-button').click()
        const menuButton = await $('#react-burger-menu-btn').click()
        const logoutLink = await $('#logout_sidebar_link').click()

        await expect($('.login_wrapper-inner')).toBePresent()
    })

    it('The side menu should open and close correctly', async () => {
        browser.url('http://saucedemo.com/')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('#react-burger-menu-btn').click()
        await $('#react-burger-cross-btn').click()

        await expect($('.title')).toBeDisplayed()
    })

    it('I should be able to add a product to the cart', async () => {
        await browser.url('http://saucedemo.com/')

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        await $('.shopping_cart_link').click()

        await expect($('.inventory_item_name')).toExist()
    })

    it('I shoud be able to delete the product from the cart', async () => {
        browser.url('http://saucedemo.com/')

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('[data-test="add-to-cart-sauce-labs-onesie"]').click()
        await $('.shopping_cart_link').click()

        await expect($('.inventory_item_name')).toExist()

        await $('[data-test="remove-sauce-labs-onesie"]').click()

        await expect($('[data-test="continue-shopping"]')).toExist()
    })

    it('I should be able to place an order', async () => {
        browser.url('http://saucedemo.com/')

        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('[data-test="add-to-cart-sauce-labs-fleece-jacket"]').click()
        await $('.shopping_cart_link').click()

        await expect($('.inventory_item_name')).toExist();

        await $('[data-test="checkout"]').click();
        await $('[data-test="firstName"]').setValue('Mirela')
        await $('[data-test="lastName"]').setValue('Dima')
        await $('[data-test="postalCode"]').setValue(40121)

        await $('[data-test="continue"]').click()

        await expect($('[data-test="finish"]')).toExist();
    })

    it('I should be able to see the product details', async () => {
        browser.url('http://saucedemo.com/')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('//*[@id="item_1_img_link"]/img').click()

        await expect($('//*[@id="inventory_item_container"]/div/div/div[2]/div[2]')).toExist()
    })

    it('The Back to Products button should get me back to the main page', async () => {

        browser.url('http://saucedemo.com')
        await $('#user-name').setValue('standard_user')
        await $('#password').setValue('secret_sauce')
        await $('#login-button').click()
        await $('#item_0_img_link').click()
        await $('[data-test="back-to-products"]').click()
 
        await expect($('.header_secondary_container')).toBePresent()

    })

})
