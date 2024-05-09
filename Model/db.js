const mongoose = require("mongoose");
const categoriesSchema = require("./categoriesSchema");
const lacationSchema = require("./lacationSchema");
const staticData = {
  decoration: [
    {
      categories_name: "DECORATION",
      description: "This covers events for DECORATION",
    },
  ],
  djband: [
    {
      categories_name: "DJ AND BAND",
      description: "This covers events for DJ AND BAND",
    },
  ],
  makeup: [
    {
      categories_name: "MAKE-UP",
      description: "This covers events for MAKE-UP",
    },
  ],
  pandit: [
    {
      categories_name: "PANDIT",
      description: "This covers events for PANDIT",
    },
  ],
  photoVideo: [
    {
      categories_name: "PHOTO-VIDEO",
      description: "This covers events for PHOTO-VIDEO",
    },
  ],
  tentHouse: [
    {
      categories_name: "TENTHOUSE",
      description: "This covers events for TENTHOUSE",
    },
  ],
  travel: [
    {
      categories_name: "TRAVEL",
      description: "This covers events for TRAVEL",
    },
  ],
  varmala: [
    {
      categories_name: "VARMALA-ENTRY",
      description: "This covers events for VARMALA-ENTRY",
    },
  ],
  venue: [
    {
      categories_name: "VENUE",
      description: "This covers events for VENUE",
    },
  ],
};
const staticDataForLoaction = {
  Bhopal: [
    {
      venue_name: "Bhopal",
      address: "This covers events for Bhopal",
    },
  ],
  Delhi: [
    {
      venue_name: "Delhi",
      address: "This covers events for Delhi",
    },
  ],
  Kanpur: [
    {
      venue_name: "Kanpur",
      address: "This covers events for Kanpur",
    },
  ],
  Lucknow: [
    {
      venue_name: "Lucknow",
      address: "This covers events for Lucknow",
    },
  ],
  Nagpur: [
    {
      venue_name: "Nagpur",
      address: "This covers events for Nagpur",
    },
  ],
  Patna: [
    {
      venue_name: "Patna",
      address: "This covers events for Patna",
    },
  ],
  Ranchi: [
    {
      venue_name: "Ranchi",
      address: "This covers events for Ranchi",
    },
  ],
  Surat: [
    {
      venue_name: "Surat",
      address: "This covers events for Surat",
    },
  ],
  Varanasi: [
    {
      venue_name: "Varanasi",
      address: "This covers events for Varanasi",
    },
  ],
};
// Function to check if static data exists in the database
const checkStaticDataExists = async () => {
  try {
    const count = await categoriesSchema.countDocuments();
    return count > 0; // If count is greater than 0, static data exists
  } catch (error) {
    console.error("Error checking static data:", error);
    return false; // Return false in case of error
  }
};

const LocationcheckStaticDataExists = async () => {
  try {
    const count = await lacationSchema.countDocuments();
    return count > 0;
  } catch (error) {
    console.error("Error checking static data:", error);
    return false;
  }
};

// Function to insert static data into respective schemas
const insertStaticData = async () => {
  try {
    await Promise.all(
      Object.keys(staticData).map(async (key) => {
        await categoriesSchema.insertMany(staticData[key]);
      })
    );
    console.log("Static data insertion completed successfully.");
  } catch (error) {
    console.error("Error inserting static data:", error);
  }
};

const LocationinsertStaticData = async () => {
  try {
    await Promise.all(
      Object.keys(staticDataForLoaction).map(async (key) => {
        await lacationSchema.insertMany(staticDataForLoaction[key]);
      })
    );
    console.log("Static Location  data insertion completed successfully.");
  } catch (error) {
    console.error("Error inserting static data:", error);
  }
};

mongoose
  .connect("mongodb://127.0.0.1:27017/EventPlanner")
  .then(async () => {
    console.log("Database connected!");
    const staticDataExists = await checkStaticDataExists();
    const LocationstaticDataExists = await LocationcheckStaticDataExists();
    if (!staticDataExists && !LocationstaticDataExists) {
      await insertStaticData();
      await LocationinsertStaticData();
    } else {
      console.log("Static data already exists. Skipping insertion.");
    }
  })
  .catch((err) => console.error("Error connecting to database:", err));
