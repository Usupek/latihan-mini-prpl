// routes/postRoutes.js
import express from "express";
import Post from "../models/Post.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// GET /api/posts
router.get("/", async (req, res) => {
  try {
    const { q = "", limit = 10, page = 1 } = req.query;
    const filt = q
      ? { $or: [{ title: new RegExp(q, "i") }, { body: new RegExp(q, "i") }] }
      : {};

    const skip = (Number(page) - 1) * Number(limit);
    const [items, total] = await Promise.all([
      Post.find(filt)
        .populate("author", "username email")
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      Post.countDocuments(filt),
    ]);

    res.status(200).json({
      message: "daftar posts nih ngab",
      data: items,
      page: Number(page),
      limit: Number(limit),
      total,
    });
  } catch (error) {
    res.status(500).json({ message: "gagal ngambil posts", error: error.message });
  }
});

// GET /api/posts/:id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate("author", "username email");
    if (!post) return res.status(404).json({ message: "post ga ketemu ngab" });
    res.status(200).json({ data: post });
  } catch (error) {
    res.status(500).json({ message: "gagal ngambil post", error: error.message });
  }
});

/**
 * POST /api/posts  (protected)
 * body: { title, body, tags? }
 */
router.post("/", protect, async (req, res) => {
  try {
    const { title, body, tags = [] } = req.body;
    if (!title || !body) {
      return res.status(400).json({ message: "title & body wajib diisi" });
    }

    const post = await Post.create({
      title,
      body,
      tags,
      author: req.user._id,
    });

    const populated = await post.populate("author", "username email");
    res.status(201).json({ message: "post dibuat", data: populated });
  } catch (error) {
    res.status(500).json({ message: "gagal bikin post", error: error.message });
  }
});

/**
 * PATCH /api/posts/:id  (protected, author-only)
 */
router.patch("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post ga ketemu ngab" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "bukan author, ga bisa edit" });
    }

    const updatable = ["title", "body", "tags"];
    for (const key of updatable) {
      if (req.body[key] !== undefined) post[key] = req.body[key];
    }
    await post.save();

    const populated = await post.populate("author", "username email");
    res.status(200).json({ message: "post diupdate", data: populated });
  } catch (error) {
    res.status(500).json({ message: "gagal update post", error: error.message });
  }
});

/**
 * DELETE /api/posts/:id  (protected, author-only)
 */
router.delete("/:id", protect, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "post ga ketemu ngab" });

    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "bukan author, ga bisa hapus" });
    }

    await post.deleteOne();
    res.status(200).json({ message: "post dihapus" });
  } catch (error) {
    res.status(500).json({ message: "gagal hapus post", error: error.message });
  }
});

export default router;
