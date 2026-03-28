import mongoose from "mongoose";

const Schema = mongoose.Schema;

const siteSettingsSchema = new Schema(
  {
    whatsappNumber: {
      type: String,
      required: true,
      default: "9779806438349",
    },
  },
  { timestamps: true }
);

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);
export default SiteSettings;
