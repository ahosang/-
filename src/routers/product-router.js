import { Router } from "express";
<<<<<<< HEAD
import is from "@sindresorhus/is";
=======
>>>>>>> c158cc95b6854a9a1986ffb0dcb40a6fb2f93b28

import { productService } from "../services";

const productRouter = Router();

<<<<<<< HEAD
// 권한 체크 로직 추가필요
// 제품 추가 (관리자)
productRouter.post("/admin/products", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }

    // req (request)의 body 에서 데이터 가져오기
    // 논의 필요
    const { name, price, category, image, brand, content } = req.body;

    // 위 데이터를 상품 db에 추가하기
    const newProduct = await productService.addProduct({
      name,
      price,
      category,
      image,
      brand,
      content,
    });

    res.status(201).json(newProduct);
  } catch (error) {
    next(error);
  }
});

// 상품 정보 수정
productRouter.patch("/admin/products/:productId", async (req, res, next) => {
  try {
    if (is.emptyObject(req.body)) {
      throw new Error(
        "headers의 Content-Type을 application/json으로 설정해주세요"
      );
    }
    
    const { productId } = req.params;

    const { name, price, category, image, brand, content } = req.body;

    // 위 데이터를 상품 db에 추가하기
    const updateProduct = await productService.updateProduct(productId, {
      name,
      price,
      category,
      image,
      brand,
      content,
    });

    // 업데이트 이후의 데이터를 프론트에 보내 줌
    res.status(200).json(updateProduct);
  } catch (error) {
    next(error);
  }
});

// 상품 삭제(관리자)
productRouter.delete("/admin/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const products = await productService.deleteProduct(productId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

// 전체 상품 목록을 가져옴 (배열 형태)
productRouter.get("/products", async (req, res, next) => {
=======

// 전체 상품 목록을 가져옴 (배열 형태)
productRouter.get("/", async (req, res, next) => {
>>>>>>> c158cc95b6854a9a1986ffb0dcb40a6fb2f93b28
  try {
    // 전체 상품 목록을 얻음
    const products = await productService.getProducts();

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
});

<<<<<<< HEAD
// 상품 상세 정보를 가져옴 (배열 형태)
productRouter.get("/products/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await productService.getProductById(productId);

    // 상품 목록(배열)을 JSON 형태로 프론트에 보냄
=======
// 상품 상세 정보를 가져옴
productRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params;
    console.log(productId)
    const product = await productService.getProductById(productId);
    console.log(product)

    // 상품 목록을 JSON 형태로 프론트에 보냄
>>>>>>> c158cc95b6854a9a1986ffb0dcb40a6fb2f93b28
    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
});

export { productRouter };
