const Sub = require("../models/sub");
const Product = require("../models/product");
const slugify = require("slugify");

exports.create = async (req, res) => {
    try {
        const { name, parent } = req.body;
        // res.json(await new Sub({ name, parent, slug: slugify(name) }).save());

        let strToThaiSlug = function (str) {
            return str.replace(/\s+/g, '-')     // Replace spaces with -
                .replace('%', 'เปอร์เซนต์')         // Translate some charactor
                .replace(/[^\u0E00-\u0E7F\w-]+/g, '') // Remove all non-word chars
                .replace(/--+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')           // Trim - from start of text
                .toLowerCase()
                .replace(/-+$/, '');
        }
        req.body.slug = strToThaiSlug(name);

        res.json(await new Sub({ name, parent, slug: req.body.slug }).save());
    } catch (err) {
        console.log("SUB CREATE ERR-->", err);
        res.status(400).send("Create sub failed");
    }
};

exports.list = async (req, res) =>
    res.json(await Sub.find({}).sort({ name: +1, createdAt: -1 }).exec());

exports.read = async (req, res) => {
    let sub = await Sub.findOne({ slug: req.params.slug }).exec();
    //res.json(sub);
    const products = await Product.find({ subs: sub })
        .populate("category")
        .exec();

    res.json({
        sub,
        products,
    });
};

exports.update = async (req, res) => {
    const { name, parent } = req.body;
    try {

        let strToThaiSlug = function (str) {
            return str.replace(/\s+/g, '-')     // Replace spaces with -
                .replace('%', 'เปอร์เซนต์')         // Translate some charactor
                .replace(/[^\u0E00-\u0E7F\w-]+/g, '') // Remove all non-word chars
                .replace(/--+/g, '-')         // Replace multiple - with single -
                .replace(/^-+/, '')           // Trim - from start of text
                .toLowerCase()
                .replace(/-+$/, '');
        }
        req.body.slug = strToThaiSlug(name);

        const updated = await Sub.findOneAndUpdate(
            { slug: req.params.slug },
            // { name, parent,slug: slugify(name) },
            { name, parent, slug: req.body.slug },
            { new: true }
        );
        res.json(updated);
    } catch (err) {
        res.status(400).send("Sub update failed");
    }
};

exports.remove = async (req, res) => {
    try {
        const deleted = await Sub.findOneAndDelete({ slug: req.params.slug });
        res.json(deleted);
    } catch (err) {
        res.status(400).send("Sub delete failed");
    }
};
