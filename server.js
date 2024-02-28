import { join } from 'path';
import express, { json, urlencoded } from 'express';
import session, { Store } from 'express-session';
import { create } from 'express-handlebars';
import routes from './controllers';
import helpers from './utils/helpers';

import sequelize, { sync } from './config/connection';
const SequelizeStore = require('connect-session-sequelize')(Store);

const app = express();
const PORT = process.env.PORT || 3001;

const hbs = create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {
        maxAge: 300000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict'
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize
    })
};

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, 'public')));

app.use(routes);

sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
})