const blogs = require("../model/blogModel");

exports.uploadBlog = async (req, res) => {
    const { title, overview } = req.body;
    const userId = req.payload;
    const blogImage = req.file ? req.file.filename : null;

    if (!title || !overview || !blogImage) {
        return res.status(400).json({ message: "Title, overview, and image are required." });
    }

    try {
        const newBlog = new blogs({ title, overview, blogImage, userId });
        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (err) {
        console.error("Error while saving blog:", err);
        res.status(500).json({ message: "Blog adding failed", error: err.message });
    }
};

exports.getHomeBlogs = async (req, res) => {
    try {
        const allBlogs = await blogs.find().limit(3);
        res.status(200).json(allBlogs);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.getUserBlogs = async (req, res) => {
    try {
        const userId = req.payload;
        const userBlogs = await blogs.find({ userId });
        res.status(200).json(userBlogs);
    } catch (err) {
        res.status(401).json(err);
    }
};

exports.getAllBlogs = async (req, res) => {
    const searchkey = req.query.search;

    // If searchkey is provided, filter by title. Otherwise, return all blogs.
    const query = searchkey
        ? { title: { $regex: searchkey, $options: "i" } }
        : {};  // Empty query to fetch all blogs

    try {
        const getUserBlogs = await blogs.find(query);
        res.status(200).json(getUserBlogs);
    } catch (err) {
        res.status(500).json({ message: "Error fetching blogs", error: err });
    }
};

exports.removeUserBlog = async (req, res) => {
    const { id } = req.params
    try {
        await blogs.findByIdAndDelete({ _id: id })
        res.status(200).json('deleted successfully')

    } catch (err) {
        res.json(401).json(err)

    }

};



exports.updateUserBlog = async (req, res) => {
    const { title, overview } = req.body;
    const { id } = req.params;
    const userId = req.payload;
    const uploadedImage = req.file ? req.file.filename : req.body.blogImage;

    console.log("Received Data:", { title, overview, uploadedImage });

    try {
        const updatedBlog = await blogs.findByIdAndUpdate(
            { _id: id },
            { title, overview, blogImage: uploadedImage, userId },
            { new: true }
        );

        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }

        res.status(200).json(updatedBlog);
    } catch (err) {
        console.error("Error updating blog:", err);
        res.status(500).json({ message: "Server error", error: err });
    }
};
