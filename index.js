const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors({
    origin: '*'
}));
app.listen(8000, () => {
	console.log('Server started!');
});