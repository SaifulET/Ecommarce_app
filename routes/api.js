import express from "express";
const router = express.Router();
import * as userController from "../app/controllers/usersController.js"
import * as BrandController from "../app/controllers/BrandController.js"
import * as CartListController from "../app/controllers/CartListController.js"
import * as InvoiceController from "../app/controllers/InvoiceController.js"
import * as ProductController from "../app/controllers/ProductController.js"
import * as WishListController from "../app/controllers/WishListController.js"
import * as CategoryController from "../app/controllers/CategoryController.js"
import AuthMiddleware from "../app/middleware/AuthMiddleware.js";
import * as reviewController from "../app/controllers/ReviewController.js"
import * as FeaturesController from "../app/controllers/FeaturesController.js"

//User
router.post("/login",userController.login);
router.post("/VerifyLogin",userController.VerifyLogin);
router.post("/CreateUserProfile",AuthMiddleware,userController.CreateUserProfile);
router.post("/UpdateUserProfile",AuthMiddleware,userController.UpdateUserProfile);
router.get("/ReadUserProfile",AuthMiddleware,userController.ReadUserProfile);
router.get("/Logout",userController.UserLogout);

// Brands
router.get("/BrandList",BrandController.BrandList);

// Categories
router.get("/CategoryList",CategoryController.CategoryList);

//Cart
router.post("/CreateCart",AuthMiddleware,CartListController.CreateCartList)
router.get("/ReadCartList",AuthMiddleware,CartListController.ReadCartList)
router.post("/UpdateCart",AuthMiddleware,CartListController.UpdateCartList)
router.post("/RemoveCart",AuthMiddleware,CartListController.RemoveCartList)

//wish
router.post("/CreateWish",AuthMiddleware,WishListController.CreateWish)
router.get("/ReadWish",AuthMiddleware,WishListController.ReadWish)
router.post("/RemoveWish",AuthMiddleware,WishListController.RemoveWish)


//api end point

//Product
router.get("/ProductListByCategory/:CategoryID",ProductController.ProductListByCategory)
router.get("/ProductListByRemark/:remark",ProductController.ProductListByRemark)
router.get("/ProductListByBrand/:BrandID",ProductController.ProductListByBrand)
router.get("/ProductListBySlider",ProductController.ProductListBySlider)
router.get("/ProductDetailsID/:productID",ProductController.ProductDetailsID)
router.get("/ProductListByKeyword/:keyword",ProductController.ProductListByKeyword)
router.get("/ProductReviewListByID/:productID",ProductController.ProductReviewListByID)
router.post("/CreateProductReview",ProductController.CreateProductReview)

//Invoice
router.get("/CreateInvoice",AuthMiddleware,InvoiceController.CreateInvoice)
router.get("/ReadInvoiceList",AuthMiddleware,InvoiceController.ReadInvoiceList)
router.get("/ReadInvoiceProductDetails/:invoiceID",AuthMiddleware,InvoiceController.ReadInvoiceProductDetails)

router.post("/PaymentSuccess/:tranID",InvoiceController.PaymentSuccess)
router.post("/PaymentFail/:tranID",InvoiceController.PaymentFail)
router.post("/PaymentCancel/:tranID",InvoiceController.PaymentCancel)
router.post("/PaymentIpn/:tranID",InvoiceController.PaymentIpn)

//review
router.post("/CreateReview",AuthMiddleware,reviewController.createReview);
router.get("/ReadReview/:productID",AuthMiddleware,reviewController.ReadReview);

//filter
router.post("/ProductListByFilter", ProductController.ProductListByFilter);

//Features


router.get('/FeatureList', FeaturesController.FeatureList);
router.post('/CreateLegalList', FeaturesController.CreateLegalDetails);
router.get('/LegalDetails/:type', FeaturesController.LegalDetails);



export default router;