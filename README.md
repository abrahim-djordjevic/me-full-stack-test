Requirements:
    nodejs
    npm
    yarn

Step 1:
    intall yarn if you don't have it: npm install -g yarn

Step 2:
    clone git repo using: git clone https://github.com/abrahim-djordjevic/me-full-stack-test
    enter project with: cd me-full-stack-test

Step 3:
    set up back-end app with these commands:
        cd back-end
        yarn install
    open /back-end/.env:
        set SECRET_TOKEN to a string
        the app normally runs on port 3500 you can change it in this file
    start back-end app with: 
        yarn start

Step 4:
    set up front-end with these commands:
        cd front-end
        yarn install
    open /front-end/.env
        if you have changed the back-end PORT you will need to update these fields with the new PORT:
            REACT_APP_API_URL
            REACT_APP_WS_URL
        the app normally runs on PORT 3100 you can change it in this file
    start front-end app with:
        yarn start

Step 5:
    run back-end application tests with you need to have started the back-end app before so the database is created:
        yarn test
    API documentation can be found at http://localhost:3500/api-docs:
        if you have changed the back-end port the above url will be updated

Step 6:
    run front end tests with yarn test

Improvements:
    use https instead of http especially when sending sensitive data (these apps aren't hosted properly so I can't generate a SSL certificate)
    use a different database like mySQL, postgresSQL or mongoDb
    allow users to change passwords
    add captcha to login page for additional security
    add more tests to back-end for testing the API
    add more tests to fron-end testing pages and charts
    use a different library for websockets on the backend (i used express-ws becuase it's easily integrated with express-js)
    aad docker containers