const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const users = require('./routes/Route.User');
const auth = require('./routes/Route.Auth');
const passwordManager = require('./routes/Route.PasswordManager');
const song = require('./routes/Route.Song')
const songList = require('./routes/Route.SongList');
const upload = require('./routes/Route.Upload');
// FINANCES
const registerFinancesPlan = require('./routes/Route.PlanFinanceRegister');
const incomeRegister = require('./routes/Route.IncomeRegister');
const expenseRegister = require('./routes/Route.ExpensesRegister');
const contributionsRecord = require('./routes/Route.ContributionsRecord');
const financesActivity = require('./routes/Route.FinancesActivity');
const profileManager = require('./routes/Route.ProfileManager')

const PORT = process.env.PORT || 4000;

const app = express();
const dbName = 'DB_JORBAND';
// const dbName = 'DB_WORSHIP_TEAM';
 
mongoose.connect(`mongodb+srv://DB_development:dbdevelopment@cluster0.undeacy.mongodb.net/${dbName}`)
    .then(() => {
        console.log('Connection established with MongoDB')
    }).catch(err => console.log("Error trying to Connect to MongoDB", err));
 
app.use(cors())
app.use(express.json());
app.use('/users', users)
app.use('/auth', auth)
app.use('/auth/security', passwordManager)
app.use('/song', song);
app.use('/upload', upload)
app.use('/songList', songList);
app.use('/financeControl', contributionsRecord);
app.use('/contribution', registerFinancesPlan);
app.use('/incomes', incomeRegister)
app.use('/expenses', expenseRegister)
app.use('/activities', financesActivity)
app.use('/profiles', profileManager)

app.listen(PORT, () => {
    console.log('Listening on port', PORT);
})