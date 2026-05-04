import { nanoid } from "nanoid";
import Url from "../models/Url.js";

export const shorten = async (req, res) => {
  try {
    const { originalUrl, customAlias } = req.body;

    if (!originalUrl) {
      return res.status(400).json({
        success: false,
        message: "URL is required.",
      });
    }

    // validate URL
    try {
      new URL(originalUrl);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid URL.",
      });
    }

    let shortId;

    if (customAlias) {
      const existing = await Url.findOne({ shortId: customAlias });

      if (existing) {
        const baseUrl = process.env.BASE_URL || "http://localhost:5000";

        return res.json({
          success: true,
          shortId: existing.shortId,
          shortUrl: `${baseUrl}/r/${existing.shortId}`, // ✅ FIXED
          message: "Alias already exists, returning existing link",
        });
      }

      shortId = customAlias;
    } else {
      let exists = true;

      while (exists) {
        shortId = nanoid(7);
        exists = await Url.findOne({ shortId });
      }
    }

    const url = await Url.create({
      originalUrl,
      shortId,
      isCustom: !!customAlias,
    });

    const baseUrl = process.env.BASE_URL || "http://localhost:5000";

    return res.json({
      success: true,
      shortId: url.shortId,
      shortUrl: `${baseUrl}/r/${url.shortId}`, // ✅ FIXED
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};

export const redirectUrl = async (req, res) => {
  try {
    const { shortId } = req.params;

    const url = await Url.findOne({ shortId });

    if (!url) {
      return res.status(404).json({
        success: false,
        message: "URL not found.",
      });
    }

    // increment click count safely
    await Url.updateOne({ shortId }, { $inc: { clicks: 1 } });

    // redirect to original URL
    return res.redirect(url.originalUrl);
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      error: error.message,
    });
  }
};
