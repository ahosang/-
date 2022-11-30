const { orderModel } = require("../src/db");
const { productModel } = require("../src/db");
const { userModel } = require("../src/db");
const { getRandomInt } = require("./get-random-int");

async function order() {
  let orderDatas = await noAuthOrder();
  let authOrderDatas = await authOrder();

  orderDatas = orderDatas.concat(authOrderDatas);
  let userIdObj = {};
  try {
    const orders = await orderModel.setTestdata(orderDatas);
    orders.forEach((cur) => {
      if (cur.userId) {
        userIdObj[cur.userId]
          ? userIdObj[cur.userId].push(cur._id.toString())
          : (userIdObj[cur.userId] = [cur._id.toString()]);
      }
    });
    for (const [userId, value] of Object.entries(userIdObj)) {
      const toUpdate = { orders: value };
      const t = await userModel.update({ _id: userId }, toUpdate);
    }
  } catch (error) {
    console.log(error);
  }
}

async function noAuthOrder() {
  let orderDatas = [
    {
      fullName: "김비회원",
      phoneNumber: "01012341234",
      address: {
        postalCode: "55343",
        address1: "서울 성동구 아차산로17길 48",
      },
      status: "상품준비중",
      totalPrice: 0,
      payment: { method: "신용카드", detail: "농협", number: "1234123412341234" },
      productsInOrder: [],
    },
    {
      fullName: "최비회원",
      phoneNumber: "01012341234",
      address: {
        postalCode: "55343",
        address1: "전주시 완산구 천변로1길 42",
      },
      status: "상품준비중",
      totalPrice: 0,
      payment: { method: "신용카드", detail: "신한", number: "1234123412341234" },
      productsInOrder: [],
    },
  ];

  const products = await productModel.findAll();
  var i = 0;

  orderDatas = await Promise.all(
    orderDatas.map(async (cur) => {
      for (let t = 0; t < 2; t++) {
        const id = products[i]._id.toString();
        const quantity = getRandomInt(1, 5);
        cur.productsInOrder.push({ id, quantity });
        cur.totalPrice += products[i].price * quantity;
        i++;
      }
      return cur;
    })
  );

  return orderDatas;
}

async function authOrder() {
  const users = await userModel.findAll();
  const orderData = {
    status: "상품준비중",
    totalPrice: 0,
    productsInOrder: [],
    payment: { method: "신용카드", detail: "KB 국민", number: "1234123412341234" },
  };

  let authOrderdatas = users.map((user) => {
    const { _id, fullName, phoneNumber, address } = user;
    const order = { userId: _id.toString(), fullName, phoneNumber, address, ...orderData };
    return order;
  });

  const products = await productModel.findAll();
  var i = 0;
  authOrderdatas = await Promise.all(
    authOrderdatas.map((cur) => {
      for (let t = 0; t < 2; t++) {
        const id = products[i]._id.toString();
        const quantity = getRandomInt(1, 5);
        cur.productsInOrder.push({ id, quantity });
        cur.totalPrice += products[i].price * quantity;
        i++;
      }
      return cur;
    })
  );

  return authOrderdatas;
}

module.exports = { order };
