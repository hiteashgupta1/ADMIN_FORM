/*
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import multer from "multer";
import path from "path";
import fs from "fs";

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads")); // Serve static files

// Database Connection
mongoose
  .connect(
    "mongodb+srv://Abhinav:qprovers13@cluster0.omb8n.mongodb.net/admission_form?retryWrites=true&w=majority&appName=Cluster0"
  )
  .then(() => console.log("MongoDB connected successfully!"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Set up multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

// Schema
const admissionSchema = new mongoose.Schema({
  name: String,
  father_name: String,
  mother_name: String,
  dob: Date,
  phone: String,
  email: String,
  emergency_contact: String,
  address: String,
  course: String,
  branch: String,
  board10: String,
  marks10: Number,
  board12: String,
  marks12: Number,
  jee_score: Number,
  cuet_score: Number,
  category: String,
  photo: String,
  fee_receipt: String,
  submitted_at: { type: Date, default: Date.now },
});

const Admission = mongoose.model("Admission", admissionSchema);

// Form Submission Route
app.post(
  "/submit-admission",
  upload.fields([{ name: "photo" }, { name: "receipt" }]),
  async (req, res) => {
    try {
      console.log("Request Body:", req.body); // Debug request body
      console.log("Uploaded Files:", req.files); // Debug uploaded files

      const formData = req.body;
      const photo = req.files["photo"] ? req.files["photo"][0].path : "";
      const feeReceipt = req.files["receipt"]
        ? req.files["receipt"][0].path
        : "";

      console.log("Photo Path:", photo); // Debug photo path
      console.log("Fee Receipt Path:", feeReceipt); // Debug receipt path

      const admission = new Admission({
        name: formData.name,
        father_name: formData["father-name"],
        mother_name: formData["mother-name"],
        dob: formData.dob,
        phone: formData.phone,
        email: formData.email,
        emergency_contact: formData["emergency-contact"],
        address: formData.address,
        course: formData.course,
        branch: formData.branch,
        board10: formData.board10,
        marks10: formData.marks10,
        board12: formData.board12,
        marks12: formData.marks12,
        jee_score: formData["jee-score"],
        cuet_score: formData["cuet-score"],
        category: formData.category,
        photo: photo, // Save photo path
        fee_receipt: feeReceipt, // Save receipt path
      });

      await admission.save();
      res.json({ message: "Form submitted successfully!" });
    } catch (error) {
      console.error("Error saving data:", error); // Log error
      res.status(500).json({ message: "Error saving data", error: error.message });
    }
  }
);

// Test Route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start Server
mongoose.connection.once("open", () => {
  app.listen(3000, () => {
    console.log("Server started on http://localhost:3000");
  });
});
*/




// Function to show the modal
function showModal(message) {
    var modal = document.getElementById("myModal");
    var modalMessage = document.getElementById("modalMessage");



    // Set the message in the modal
    modalMessage.textContent = message;

    // Show the modal
    modal.style.display = "block";

    // Add event listener to close the modal when the close button is clicked
    var closeButton = document.getElementsByClassName("close")[0];
    closeButton.addEventListener("click", function() {
      modal.style.display = "none";
    });
  }

  // Add event listener to the form submission
  document.getElementById("myForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Show the modal immediately to indicate form submission is in progress
    showModal("Submitting form...");

    // Perform an AJAX request to submit the form
    var xhr = new XMLHttpRequest();
    xhr.open("POST", this.action);
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          // Successful response
          var response = xhr.responseText;
          showModal(response); // Show the modal with the response message
          document.getElementById("myForm").reset(); //Clear the form fields
        } else {
          // Error response
          showModal("Error: Something went wrong."); // Show a generic error message
        }
      }
    };
    xhr.send(new FormData(this));
  });
