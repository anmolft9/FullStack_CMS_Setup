import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    status: {
      type: String,
      default: "inactive",
    },
    fName: {
      type: String,
      required: true,
      maxLength: [20, "Firstname cant be longer than 20 Characters"],
    },

    lName: {
      type: String,
      required: true,
      maxLength: [20, "LastName cant be longer than 20 Characters"],
    },

    email: {
      type: String,
      unique: true,
      index: 1,
      required: true,
      maxLength: [50, "Email cant be longer than 50 Characters"],
    },
    password: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      require: true,
      maxLength: [40, "Phone Number cant be longer than 20 Characters"],
    },
    address: {
      type: String,
      default: "n/a",
    },
    dob: {
      type: Date,
      default: null,
    },
    emailValidationCode: {
      type: String,
      required: true,
      default: "n/a",
    },
    refreshJWT: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Admin_user", adminUserSchema);
