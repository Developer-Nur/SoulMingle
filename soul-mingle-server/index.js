const express = require('express');
const app = express();
const cors = require('cors');
require('dotenv').config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;

// middle were
app.use(
    cors({
        origin: [
            "http://localhost:5173",
            "https://soul-mingle-ed00e.web.app"
        ]
    })
);
app.use(express.json())

const uri = `mongodb+srv://${process.env.User_Name}:${process.env.User_Password}@cluster0.vqte0hj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// console.log('Stripe Secret Key:', process.env.STRIPE_SECRET_KEY);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // await client.connect();
        const usersCollection = client.db("soulmateDB").collection("users");
        const bioDataCollection = client.db("soulmateDB").collection("bioDatas");
        const premiumBiodataCollection = client.db("soulmateDB").collection("premiumBiodata");
        const favouriteBiodataCollection = client.db("soulmateDB").collection("favouritesBio");
        const paymentCollection = client.db("soulmateDB").collection("payments");
        const ConfirmPaymentCollection = client.db("soulmateDB").collection("confirmPayments");
        const reviewCollection = client.db("soulmateDB").collection("reviews");


        // all user api
        app.get("/users", async (req, res) => {
            const result = await usersCollection.find().toArray()
            res.send(result)
        })

        // premium user api
        app.get("/premium-users/:email", async (req, res) => {
            const email = req.params.email
            const isPremium = await usersCollection.findOne({ email: email });
            res.send(isPremium)
        })


        // admin api
        app.get("/admin/:email", async (req, res) => {
            const email = req.params.email
            const isAdmin = await usersCollection.findOne({ email: email });
            res.send(isAdmin)
        })


        // create an users admin api
        app.patch("/admin-users", async (req, res) => {
            const email = req.query.email;
            const result = await usersCollection.updateOne(
                { email: email },
                { $set: { role: "admin" } }
            );
            res.send(result)
        });

        // make an users premium api
        app.patch("/premium-users", async (req, res) => {
            const email = req.query.email;
            const result = await usersCollection.updateOne(
                { email: email },
                { $set: { isPremium: "premium" } }
            );
            res.send(result)
        });

        // search a user by name api
        app.get("/search-user", async (req, res) => {

            const username = req.query.username;
            const result = await usersCollection.find({
                name: {
                    $regex:
                        username, $options: 'i'
                }
            }).toArray();

            if (result.length === 0) {

                res.send({ message: "No user found" });
            } else {
                res.send(result);
            }
        });


        // create an user api
        app.post("/create-user", async (req, res) => {
            const user = req.body;
            const result = await usersCollection.insertOne(user)
            res.send(result)
        })



        // reviews api 
        app.get('/reviews', async (req, res) => {
            const result = await reviewCollection.find().toArray()
            res.send(result)
        })

        // add a review api
        app.post("/reviews", async (req, res) => {
            const reviewData = req.body;
            const result = await reviewCollection.insertOne(reviewData);
            res.send(result);
        });

        // biodata scores api
        app.get("/score", async (req, res) => {

            const aggregation = [
                {
                    $group: {
                        _id: "$biodataType",
                        count: { $sum: 1 }
                    }
                }
            ];

            const results = await bioDataCollection.aggregate(aggregation).toArray();

            // Initialize the response object
            let response = { total: 0, Male: 0, Female: 0 };

            // Process the results
            results.forEach(result => {
                response.total += result.count;
                if (result._id === "Male") {
                    response.Male = result.count;
                } else if (result._id === "Female") {
                    response.Female = result.count;
                }
            });

            // console.log("score found is", response);

            res.send(response)
        });


        //  create bio-data  
        bioDataCollection.createIndex({ biodataId: 1 }, { unique: true });

        app.post("/create-biodata", async (req, res) => {

            const data = req.body;
            const userEmail = data.email;
            const existingBiodata = await bioDataCollection.findOne({ email: userEmail })
            if (existingBiodata) {
                return res.send("Biodata already exists for this user.");
            }

            // // Find the last created biodata id
            const lastBiodata = await bioDataCollection.find().sort({ biodataId: -1 }).limit(1).toArray();
            let lastId = 0;
            if (lastBiodata.length > 0) {
                lastId = lastBiodata[0].biodataId;
            }


            const newId = lastId + 1;


            data.biodataId = newId;


            const result = await bioDataCollection.insertOne(data);
            res.send({ result, biodataId: newId });

        });

        // api to get a single biodata via email 
        app.get("/my-biodata", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };
            const result = await bioDataCollection.findOne(query);
            res.send(result);
        })

        // post api for premium biodata request
        app.post("/premiumBio", async (req, res) => {
            const userData = req.body;
            const email = userData.email;
            const isExisting = await premiumBiodataCollection.findOne({ email: email })

            if (isExisting) {
                return res.send({ message: "You have already requested" });
            }
            const result = await premiumBiodataCollection.insertOne(userData);
            res.send(result)
        })


        // all biodata api
        app.get("/biodatas", async (req, res) => {
            const page = parseInt(req.query.page);
            const size = parseInt(req.query.size);
            // console.log("page is", page, "Size is", size);
            const result = await bioDataCollection
                .find()
                .skip(page * size)
                .limit(size)
                .toArray()

            res.send(result)
        })
        // biodata length api
        app.get("/biodatalength", async (req, res) => {
            const count = await bioDataCollection.estimatedDocumentCount()
            res.send({ count })
        })

        // all premium biodatas api 
        app.get("/premium-biodatas", async (req, res) => {
            const result = await premiumBiodataCollection.find().toArray()
            res.send(result)
        })

        //  make a biodata premium
        app.patch("/make-premium-biodata", async (req, res) => {
            const email = req.query.email;
            const query = { email: email }
            const update = { $set: { isPremium: 'premium' } };
            const result = await premiumBiodataCollection.updateOne(query, update);
            res.send(result)
        });

        // all payments api 
        app.get("/all-payments", async (req, res) => {
            const result = await paymentCollection.find().toArray()
            res.send(result)
        })

        // Approved Contact Request api 
        app.patch("/approved-contact-request", async (req, res) => {
            const biodataId = parseInt(req.query.biodataId);
            console.log("biodataId", biodataId);
            const query = { biodataId: biodataId }
            const update = { $set: { paymentStatus: 'approved' } };
            const result = await paymentCollection.updateOne(query, update);
            res.send(result)
        })

        // approved confirm payments api
        app.post("/payments", async (req, res) => {
            const data = req.body;
            const result = await ConfirmPaymentCollection.insertOne(data)
            res.send(result)
            console.log("inserted data", result);
        })

        // data info for admin home page api
        app.get('/allinfo', async (req, res) => {


            const totalPayments = await ConfirmPaymentCollection.aggregate([
                {
                    $group: {
                        _id: null,
                        totalPaidAmount: { $sum: '$paidAmount' },
                    },
                },
            ]).toArray();

            const totalPaidAmount = totalPayments.length > 0 ? totalPayments[0].totalPaidAmount : 0;
            const totalPremiumBiodataCount = await premiumBiodataCollection.countDocuments();

            res.send({ totalPaidAmount, totalPremiumBiodataCount, });

        });


        // api for normal filtered biodata
        app.get('/filter-biodata', async (req, res) => {

            const filter = {};

            const { gender, location, age_from, age_to } = req.query;


            if (gender) {
                filter.biodataType = gender;
            }

            if (location) {
                filter.permanentDivision = location;
            }

            if (age_from && age_to) {
                filter.age = { $gte: parseInt(age_from), $lte: parseInt(age_to) };
            } else if (age_from) {
                filter.age = { $gte: parseInt(age_from) };
            } else if (age_to) {
                filter.age = { $lte: parseInt(age_to) };
            }


            const result = await bioDataCollection.find(filter).toArray();

            res.send(result);

        });

        // api for advanced  filter
        app.get('/filtered/:id', async (req, res) => {
            const id = req.params.id
            const findID = { biodataId: parseInt(id) }
            const result = await bioDataCollection.findOne(findID)
            if (!result) {
                return res.send({ message: "Id did not match" })
            }
            res.send(result)
        })

        // api for single biodata 
        app.get('/bioData/:id', async (req, res) => {
            const id = req.params.id;
            const findId = parseInt(id);
            const foundId = await bioDataCollection.findOne({ biodataId: findId })

            const similarBiodata = foundId.biodataType;
            let findSimilarType = []

            if (similarBiodata) {
                findSimilarType = await bioDataCollection.aggregate([
                    { $match: { biodataType: similarBiodata } },
                    { $sample: { size: 3 } }
                ]).toArray()
            }

            res.send({ foundId, findSimilarType });
        })

        // post api for adding Favorites Biodata info
        app.post("/favourite-biodats", async (req, res) => {
            const info = req.body;


            const isAdded = await favouriteBiodataCollection.findOne({ biodataId: info.biodataId })

            if (isAdded) {
                return res.send({ message: "Already added to your favorite list" })
            }
            const result = await favouriteBiodataCollection.insertOne(info);

            res.send(result);
        })



        // stripe related codes
        app.post("/create-payment-intent", async (req, res) => {
            const { price } = req.body;
            const toatlAmount = parseInt(price * 100)

            // console.log("Total amount", toatlAmount);


            // Create a PaymentIntent with the order amount and currency
            const paymentIntent = await stripe.paymentIntents.create({
                amount: toatlAmount,
                currency: "usd",
                // In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
                payment_method_types: ['card']
            });

            res.send({
                clientSecret: paymentIntent.client_secret,
            });
        });

        app.post("/payment", async (req, res) => {
            const paymentInfo = req.body;
            const result = await paymentCollection.insertOne(paymentInfo)
            res.send(result);
            // console.log("paid id data is", result);
        })

        // get requested contact data api
        app.get("/contact-request", async (req, res) => {
            const email = req.query.email;
            const query = { userEmail: email };
            const result = await requestContactCollection.findOne(query)

            res.send(result)
        })



        // find all paid contact data api
        app.get("/paid-contact", async (req, res) => {
            const email = req.query.email;
            const query = { userEmail: email };

            const paymentRecords = await paymentCollection.find(query).toArray();

            // console.log("payment collection", paymentRecords);

            const biodataIds = paymentRecords.map(record => record.biodataId);

            const findBiodata = { biodataId: { $in: biodataIds } };
            const result = await bioDataCollection.find(findBiodata).toArray();

            res.send({ result, paymentRecords });

        });

        // delete contact request api
        app.delete("/delete-request/:id", async (req, res) => {
            const id = parseInt(req.params.id);
            const query = { biodataId: id }
            const result = await paymentCollection.deleteOne(query)
            res.send(result)
        });

        // find favorite Biodata api
        app.get("/favorite", async (req, res) => {
            const email = req.query.email;
            const query = { email: email };

            const favoriteRecords = await favouriteBiodataCollection.find(query).toArray();


            const biodataIds = favoriteRecords.map(record => record.biodataId);

            const findBiodata = { biodataId: { $in: biodataIds } };
            const result = await bioDataCollection.find(findBiodata).toArray();

            // console.log("found biodattas", result);

            res.send(result);
        })


        // delete contact request api
        app.delete("/delete-favorite/:id", async (req, res) => {
            const id = parseInt(req.params.id);
            const query = { biodataId: id }
            const result = await favouriteBiodataCollection.deleteOne(query)
            res.send(result)
        });



    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send("Soul Mingle")
})
app.listen(port, () => {
    console.log("Soul Mingle is running in port 5000", port);
})


