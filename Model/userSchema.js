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
    isPaid: {
      type: Boolean,
      default: false,
    },
    subscriptions: [{}],
    resetPasswordToken: String,
    resetPasswordExpires: Date,
    events: [{ type: mongoose.Schema.Types.ObjectId, ref: "Megma-Event" }],
  },
  { timestamps: true },
  
  
);

module.exports = mongoose.model("Users-Profile-Data", userSchema);
