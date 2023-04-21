const express = require("express");
const router = express.Router();
// middlewares
const { authCheck, adminCheck } = require("../middlewares/auth");
// controller
const {
    create,
    listAll,
    remove,
    read,
    update,
    list,
    productsCount,
    productStar,
    listRelated,
    searchFilters,
    saveContent,  //
    saveDetail
} = require("../controllers/product");

// routes
router.post("/product", authCheck, adminCheck, create);
router.get("/products/total", productsCount);

router.get("/products/:count", listAll); // products/100
router.delete("/product/:slug", authCheck, adminCheck, remove);
router.get("/product/:slug", read);
router.put("/product/:slug", authCheck, adminCheck, update);

router.post("/products", list);
// rating
router.put("/product/star/:productId", authCheck, productStar);
// related
router.get("/product/related/:productId", listRelated);
// search
router.post("/search/filters", searchFilters);

router.post("/product/saveContent",  saveContent);  //
router.post("/product/saveDetail",  saveDetail);    //

module.exports = router;
