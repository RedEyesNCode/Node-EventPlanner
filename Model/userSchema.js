const mongoose = require("mongoose");

// UserSchema Created
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    email: {
      type: String,
    },
    PhoneNumber: {
      type: String,
    },
    Address: {
      type: String,
    },
    password: {
      type: String,
    },
    
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Megma-Event" }],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Users-Profile-Data", userSchema);
