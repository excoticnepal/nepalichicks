import SiteSettings from "../database/models/siteSettings.models.js";

const DEFAULT_WHATSAPP = "9779806438349";

function normalizeWhatsapp(raw) {
  if (raw == null || typeof raw !== "string") return null;
  const digits = raw.replace(/\D/g, "");
  if (digits.length < 8 || digits.length > 15) return null;
  return digits;
}

async function getOrCreateSettings() {
  let doc = await SiteSettings.findOne();
  if (!doc) {
    doc = await SiteSettings.create({ whatsappNumber: DEFAULT_WHATSAPP });
  }
  return doc;
}

export const getSettings = async (req, res) => {
  try {
    const settings = await getOrCreateSettings();
    res.status(200).json({
      whatsappNumber: settings.whatsappNumber,
    });
  } catch (error) {
    console.error("getSettings:", error);
    res.status(500).json({ message: "Failed to load settings" });
  }
};

export const updateSettings = async (req, res) => {
  try {
    const { whatsappNumber } = req.body;
    const normalized = normalizeWhatsapp(
      typeof whatsappNumber === "string" ? whatsappNumber : String(whatsappNumber ?? "")
    );
    if (!normalized) {
      return res.status(400).json({
        message:
          "Invalid WhatsApp number. Use digits only (with or without country code), 8–15 digits.",
      });
    }

    const settings = await getOrCreateSettings();
    settings.whatsappNumber = normalized;
    await settings.save();

    res.status(200).json({
      message: "Settings updated",
      whatsappNumber: settings.whatsappNumber,
    });
  } catch (error) {
    console.error("updateSettings:", error);
    res.status(500).json({ message: "Failed to update settings" });
  }
};
