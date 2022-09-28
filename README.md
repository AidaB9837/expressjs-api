<h1>ExpressJS API</h1>

<h3>🎯 This project was created to practice on the Backend.</h3>

<p>The project is based on 3 routes:
    <ul>
        <li>Groceries</li>
        <li>Markets</li>
        <li>Authentications with 2 strategies: Local & OAuth2 by Discord Provider</li>
    </ul>
</p>
<p> What did I do? 
    <ul>
        <li>I improved my knowledge related to the <a href="https://expressjs.com/" >ExpressJS</a> framework, which allows you to create server-side APP.</li>
        <li>The data was saved on a NoSQL Database created with <a href="https://www.mongodb.com/">MongoDB</a> through the use of the <a href="https://mongoosejs.com/">Mongoose</a> package.</li>
        <li>APIs requests were executed using <a href="https://www.postman.com/">Postman</a>.</li>
        <li>Authentication was handled using <a href="https://www.passportjs.org/">Passport</a>.</li>
        <li>I installed the <a href="https://github.com/dcodeIO/bcrypt.js#readme">bcrypt</a> package, cryptographic hashing algorithm, recommended for password hashing.</li>
        <li>I installed the <a href="https://github.com/nicholastay/passport-discord#readme">passport-discord</a> package, so I could use the Passport strategy to authenticate with Discord via the Oauth2 API</li>
        <li>To test the app, I used the <a href="https://jestjs.io/">JEST</a> JavaScript Framework.</li>
    </ul>
</p>

<h3>If this project can be useful for your learning, make a Fork! 🙂</h3>

<hr/>

<h3>🔧 After forking the repository: ⤵️</h3>

<h4>Install</h4>

```bash
npm install
```

<h4>Configure</h4>
Create a `.env` file:

```bash
PORT=3001
```

<h4>Develop</h4>

```bash
npm run start:dev
```

<h4>Test</h4>

```bash
npm test
```
