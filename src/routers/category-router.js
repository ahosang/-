import { Router } from "express";
import { BadRequest } from "../utils/errorCodes";

import { categoryService, productService } from "../services";

const categoryRouter = Router();

// 전체 카테고리 목록을 가져옴 (배열 형태)
categoryRouter.get("/", async (req, res, next) => {
  try {
    // 전체 카테고리 목록을 얻음
    const category = await categoryService.getCategories();

    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

// 카테고리 상세 정보를 가져옴 (배열 형태)
categoryRouter.get("/:categoryId", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      throw new BadRequest("Undefined params", 4005);
    }
    const category = await categoryService.getCategoryById(categoryId);

    // 카테고리 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(category);
  } catch (error) {
    next(error);
  }
});

categoryRouter.get("/:categoryId/products", async (req, res, next) => {
  try {
    const { categoryId } = req.params;
    if (!categoryId) {
      throw new BadRequest("Undefined params", 4005);
    }
    const page = Number(req.query.page || 1);
    const perPage = Number(req.query.perPage || 9);

    const { products } = await categoryService.getCategoryById(categoryId);
    let productList = await productService.getProductList(products);
    // 페이지네이션
    let arr = [];
    for (let i = 0; i < productList.length; i++) {
      arr.push(productList[i]);
    }

    const productsPerPage = arr.slice(
      perPage * (page - 1),
      perPage * (page - 1) + perPage
    );

    const total = arr.length;
    const totalPage = Math.ceil(total / perPage);
    productList = productsPerPage;

    const result = {
      totalPage,
      total,
      productList,
    };

    // 주문 목록(배열)을 JSON 형태로 프론트에 보냄
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
});

export { categoryRouter };
