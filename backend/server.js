import express from 'express';
import mongoose from 'mongoose';
import pkg from 'mongoose';
const { connect, connection } = pkg;
import cors from 'cors';
import bcrypt from 'bcrypt';

mongoose.pluralize(null);
const app = express();
const PORT = process.env.PORT || 3001;

// Database connection
const mongoURI = 'mongodb+srv://srilayasekar:N94MjeJofaXNAHbl@busbooking.znpw4t3.mongodb.net/QuickBus?retryWrites=true&w=majority&appName=BusBooking';
connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
const db = connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

const getRouteSchema = new mongoose.Schema({
    from: String,
    to: String
});

const getTripSchema = new mongoose.Schema({
    route_id: String,
    tripdate: Date,
    trip_id: String
});

const getBusSchema = new mongoose.Schema({
    bus_name: String,
    bus_num: String,
    bus_id: String,
    tot_seats: String
});

const userSchema = new mongoose.Schema({
    user_name: String,
    user_email: String,
    password: String
});

const getBookingSchema = new mongoose.Schema({
    user_name: String,
    trip_id: String,
    seat_id: String,
    passenger_name: String,
    passenger_id: String,
    passenger_age: String,
    passenger_gender: String

});

const Route = mongoose.model('route', getRouteSchema);
const Trip = mongoose.model('trip', getTripSchema);
const Bus = mongoose.model('bus', getBusSchema);
const Booking = mongoose.model('booking', getBookingSchema);
const User = mongoose.model('user', userSchema);

app.use(cors());
app.use(express.json());


app.get('/api/searchroutes', async (req, res) => {
    try {
        const getroutedata = await Trip.find({
            from: req.query.from,
            to: req.query.to,
            tripdate: { "$gt": req.query.tripdate, "$lt": req.query.tripdate + 1 }
        });
        console.log("search routes");
        await getroutedata.forEach(console.dir);
        res.json(getroutedata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getlogin', async (req, res) => {
    try {
        const getroutedata = await User.find({
            user_name: req.query.user_name,
            password: req.query.password
        });
        console.log("search login info");
        await getroutedata.forEach(console.dir);
        res.json(getroutedata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getroutes', async (req, res) => {
    try {
        const getroutedata = await Route.find({
            from: req.query.from,
            to: req.query.to
        });
        console.log("getroutes");
        await getroutedata.forEach(console.dir);
        res.json(getroutedata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/getBookingTrans', async (req, res) => {
    try {
        const gettransdata = await Booking.find({
            user_name: req.query.user_name
        });
        console.log("getBookingTrans");
        await gettransdata.forEach(console.dir);
        res.json(gettransdata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/getbus', async (req, res) => {
    try {
        const getbusdata = await Bus.find({
            bus_id: req.query.bus_id
        });
        console.log("getbus");
        await getbusdata.forEach(console.dir);
        res.json(getbusdata);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.get('/api/gettrip', async (req, res) => {
    try {
        const startOfDay = new Date(req.query.tripdate); // Get the start of the selected day
        const endOfDay = new Date(startOfDay); // Create a copy of the start date
        endOfDay.setDate(endOfDay.getDate() + 1);
        const gettripdata = await Trip.find({
            r_id: req.query.r_id,

            tripdate: {
                $gte: startOfDay, // Greater than or equal to the start of the selected day
                $lt: endOfDay // Less than the start of the next day
            }

        });
        console.log("********************** gettrip");
        await gettripdata.forEach(console.dir);
        res.json(gettripdata);
    } catch (error) {
        console.error('Error fetching Trip data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
app.get('/api/gettripbyid', async (req, res) => {
    try {

        const gettripdata = await Trip.findOne({
            trip_id: req.query.trip_id,
        });
        console.log("********************** gettripbyid");
        console.log(gettripdata);
        res.json(gettripdata);
    } catch (error) {
        console.error('Error fetching Trip data:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.post('/api/register', async (req, res) => {

    const { user_email, user_name, password } = req.body;
    if (!user_name || !user_email || !password) return res.status(400).json({ 'message': 'Username , user email and password are required.' });
    try {
        const hashedpass = await bcrypt.hash(password, 10);
        const newUserEntry = new User({ user_email, user_name, password: hashedpass });
        const savedUserEntry = await newUserEntry.save();
        console.log(user_email);
        res.json(savedUserEntry);
    }
    catch (error) {
        console.error('Error saving user entry:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/loginpost', async (req, res) => {
    const { user_name, password } = req.body;

    if (!user_name || !password) {
        return res.status(400).json({ message: 'Username and password are required.' });
    }

    try {
        const user = await User.findOne({ user_name });

        if (!user) {
            return res.status(401).json({ error: 'Authentication failed. User not found.' });
        }

        const match = await bcrypt.compare(password, user.password);

        if (match) {
            return res.status(200).json({ message: 'Authentication successful.' });
        } else {
            return res.status(401).json({ error: 'Authentication failed. Invalid password.' });
        }
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


app.post('/api/bookings', async (req, res) => {
    try {
        // Assuming you receive the booking details in the request body
        const { user_name, trip_id, seat_id, passenger_name, passenger_age, passenger_gender } = req.body;

        console.log(req.body);

        const newBooking = new Booking({
            user_name,
            trip_id,
            seat_id,
            passenger_name,
            passenger_age,
            passenger_gender
        });
        const savedBooking = await newBooking.save();
        res.status(201).json(savedBooking);
    } catch (error) {
        console.error('Error creating booking:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
