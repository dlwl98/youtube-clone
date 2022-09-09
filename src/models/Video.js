import mongoose from "mongoose";

const videoSchema = new mongoose.Schema({
  fileUrl: { type: String, required: true },
  title: { type: String, required: true, trim: true, maxLength: 20 },
  description: { type: String, required: true, trim: true, maxLength: 20 },
  createdAt: { type: Date, required: true, default: Date.now },
  hashtags: [{ type: String, trim: true }],
  meta: {
    views: { type: Number, required: true, default: 0 },
    rating: { type: Number, required: true, default: 0 },
  },
});

// // Mongoose Middleware
// videoSchema.pre("save", function () {
//   this.hashtags = this.hashtags[0]
//     .split(",")
//     .map((word) => (word.startsWith("#") ? word.trim() : `#${word.trim()}`));
// });

// Static
videoSchema.static("formatHashtags", function (hashtags) {
  return hashtags
    .split(",")
    .map((word) =>
      word.trim().startsWith("#") ? word.trim() : `#${word.trim()}`
    );
});

const Video = mongoose.model("Video", videoSchema);
export default Video;
