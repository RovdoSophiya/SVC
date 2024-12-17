const Order = require("../models/Order");
const Delivery = require("../models/Delivery");
const OrderedDish = require("../models/OrderedDish");
const Courier = require("../models/Courier");
const Client = require("../models/Client");
const Dish = require("../models/Dish");
const Review = require("../models/Review");
const { Op } = require("sequelize");
const fs = require("fs");
const os = require("os");
const ExcelJS = require("exceljs");
const path = require("path");

const handleError = (res, error) => {
  console.error("Error:", error);
  res.status(500).json({ error: error.message });
};

// Добавление заказа
const addOrder = async (req, res) => {
  try {
    const order = await Order.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    handleError(res, error);
  }
};

// Удаление заказа
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findByPk(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    await order.destroy();
    res.json({ message: "Order deleted" });
  } catch (error) {
    handleError(res, error);
  }
};

//Получение всех заказов клиента
const getClientOrders = async (req, res) => {
  try {
    const {
      clientid,
      page = 1,
      limit = 5,
      sortBy = "orderdate",
      order = "ASC",
    } = req.query;

    const offset = (page - 1) * limit;

    const orders = await Order.findAndCountAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          attributes: ["status", "deliveryaddress", "deliverydate"],
          required: false,

          include: [
            {
              model: Courier,
              attributes: ["name", "lastname", "phone"],
            },
          ],
        },
        {
          model: OrderedDish,
          include: [
            {
              model: Dish,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
      order: [[sortBy, order]],
      limit: parseInt(limit),
      offset,
    });

    const formattedOrders = orders.rows.map((order) => ({
      id: order.id,
      orderdate: order.orderdate,
      totalamount: order.totalamount,
      delivery: {
        status: order.Delivery.status,
        courier: order.Delivery?.Courier
          ? {
              name: order.Delivery.Courier.name,
              lastname: order.Delivery.Courier.lastname,
              phone: order.Delivery.Courier.phone,
            }
          : "Courier has not picked up the order",
      },
      orderedDishes: order.OrderedDishes.map((dish) => ({
        name: dish.Dish.name,
        price: dish.Dish.price,
        quantity: dish.quantity,
        totalprice: dish.totalprice,
      })),
    }));

    const totalCount = await Order.count({
      where: { clientid },
    });

    res.status(200).json({
      orders: formattedOrders,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    res.status(500).json({
      error: "An error occurred while fetching orders.",
      detailes: error.message,
    });
  }
};

//Получение всех текущих заказов клиента
const getCurrentClientOrders = async (req, res) => {
  try {
    const { clientid, page = 1, limit = 5 } = req.query;
    const offset = (page - 1) * limit;

    const statusFilter = {
      [Op.or]: [
        { status: "Pending" },
        { status: "On the Way" },
        { status: "Delayed" },
      ],
    };

    const orders = await Order.findAndCountAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          attributes: [
            "status",
            "deliveryaddress",
            "deliverydate",
            "courierid",
          ],
          required: true,
          where: statusFilter,
          include: [
            {
              model: Courier,
              attributes: ["name", "lastname", "phone"],
            },
          ],
        },
        {
          model: OrderedDish,
          include: [
            {
              model: Dish,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
      limit: parseInt(limit),
      offset,
    });

    const formattedOrders = orders.rows.map((order) => ({
      id: order.id,
      orderdate: order.orderdate,
      totalamount: order.totalamount,
      delivery: {
        status: order.Delivery.status,
        courier:
          order.Delivery.courierid === null
            ? "Courier has not picked up the order"
            : {
                name: order.Delivery.Courier.name,
                lastname: order.Delivery.Courier.lastname,
                phone: order.Delivery.Courier.phone,
              },
      },
      orderedDishes: order.OrderedDishes.map((dish) => ({
        name: dish.Dish.name,
        price: dish.Dish.price,
        quantity: dish.quantity,
        totalprice: dish.totalprice,
      })),
    }));

    const totalCount = await Order.count({
      where: { clientid },
      include: [
        {
          model: Delivery,
          required: true,
          where: statusFilter,
        },
      ],
    });

    res.status(200).json({
      orders: formattedOrders,
      total: totalCount,
      totalPages: Math.ceil(totalCount / limit),
    });
  } catch (error) {
    console.error("Error fetching client orders:", error);
    res.status(500).json({
      error: "An error occurred while fetching orders.",
      details: error.message,
    });
  }
};

//Скачивание отчета в формате Excel
const downloadOrdersExcel = async (req, res) => {
  try {
    const { clientid } = req.query;

    // Получаем данные о клиенте
    const client = await Client.findOne({
      where: { id: clientid },
      attributes: ["name", "lastname", "fathername"],
    });

    if (!client) {
      return res.status(404).json({ error: "Client not found." });
    }

    const clientFullName = `${client.lastname || ""} ${client.name || ""} ${
      client.fathername || ""
    }`.trim();

    // Получаем заказы для клиента
    const orders = await Order.findAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          attributes: ["status", "orderid"],
          include: [
            {
              model: Courier,
              attributes: ["name", "lastname", "phone"],
            },
          ],
        },
        {
          model: OrderedDish,
          attributes: ["quantity", "totalprice"],
          include: [
            {
              model: Dish,
              attributes: ["name", "price"],
            },
          ],
        },
      ],
    });

    const formattedOrders = orders.map((order) => {
      const courier = order.Delivery?.Courier;
      const courierInfo = courier
        ? `${courier.lastname} ${courier.name} (Phone: ${courier.phone})`
        : "Courier not assigned";

      const orderedDishes = order.OrderedDishes.map(
        (orderedDish) =>
          `${orderedDish.Dish.name} (Count: ${orderedDish.quantity}, Price: ${orderedDish.totalprice})`
      ).join("\n ");

      return {
        orderdate: new Date(order.orderdate).toLocaleString(),
        totalamount: order.totalamount,
        deliveryStatus: order.Delivery?.status || "Not Delivered",
        courier: courierInfo,
        orderedDishes: orderedDishes,
      };
    });

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Orders History");

    // Заголовок отчета
    worksheet.mergeCells("A1:E1");
    const titleCell = worksheet.getCell("A1");
    titleCell.value = `Order History Report for Client: ${clientFullName}`;
    titleCell.font = { size: 16, bold: true };
    titleCell.alignment = { horizontal: "center", vertical: "middle" };

    // Добавляем строку с датой генерации отчета
    worksheet.mergeCells("A2:E2");
    const dateCell = worksheet.getCell("A2");
    dateCell.value = `Report Date: ${new Date().toLocaleDateString()}`;
    dateCell.font = { size: 12, italic: true };
    dateCell.alignment = { horizontal: "center", vertical: "middle" };

    // Настройка столбцов
    worksheet.columns = [
      { key: "orderdate", width: 20 },
      { key: "totalamount", width: 15 },
      { key: "deliveryStatus", width: 20 },
      { key: "courier", width: 30 },
      { key: "orderedDishes", width: 50 },
    ];

    // Заголовки столбцов
    const headers = [
      "Order Date",
      "Total Amount",
      "Delivery Status",
      "Courier",
      "Ordered Dishes",
    ];

    // Добавляем заголовки
    headers.forEach((header, index) => {
      const cell = worksheet.getCell(3, index + 1);
      cell.value = header;
      cell.font = { bold: true };
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF80D4FF" },
      };
    });

    // Добавляем данные
    formattedOrders.forEach((order, rowIndex) => {
      const row = worksheet.addRow({
        orderdate: order.orderdate,
        totalamount: order.totalamount,
        deliveryStatus: order.deliveryStatus,
        courier: order.courier,
        orderedDishes: order.orderedDishes,
      });
      row.getCell(5).alignment = { wrapText: true, vertical: "middle" };

      if (rowIndex % 2 === 0) {
        row.eachCell((cell) => {
          cell.fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "E0FFFF" },
          };
        });
      }
    });

    // Добавляем стили к заголовкам
    worksheet.getRow(3).font = { bold: true };
    worksheet.getRow(3).eachCell((cell) => {
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.fill = {
        type: "pattern",
        pattern: "solid",
        fgColor: { argb: "FF80D4FF" },
      };
    });

    // Добавляем рамки к таблице
    worksheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      });
    });

    // Сохраняем и отправляем файл
    const downloadsPath = path.join(os.homedir(), "Downloads");
    const filePath = path.join(
      downloadsPath,
      `orders_history_${clientid}.xlsx`
    );

    await workbook.xlsx.writeFile(filePath);

    return res.download(filePath, `orders_history_${clientid}.xlsx`, (err) => {
      if (err) {
        console.error("Download error:", err);
        res.status(500).send("Error downloading file.");
      }
      fs.unlinkSync(filePath); // Удаляем файл после скачки
    });
  } catch (error) {
    console.error("Error generating Excel file:", error);
    res
      .status(500)
      .json({ error: "An error occurred while generating the Excel file." });
  }
};

//Получение завершенных заказов без отзывов
const getCompletedDeliveriesWithoutReview = async (req, res) => {
  try {
    const { clientid } = req.params;

    const orders = await Order.findAll({
      where: { clientid },
      include: [
        {
          model: Delivery,
          where: { status: "Delivered" },
          required: true,
        },
        {
          model: OrderedDish,
          include: [
            {
              model: Dish,
              attributes: ["name", "price", "photo"],
            },
          ],
        },
      ],
    });

    const ordersWithoutReview = [];
    for (const order of orders) {
      const reviewExists = await Review.findOne({
        where: { orderid: order.id },
      });

      if (!reviewExists) {
        ordersWithoutReview.push({
          orderId: order.id,
          totalAmount: order.totalamount,
          deliveryAddress: order.Delivery.deliveryaddress,
          deliveryDate: order.Delivery.deliverydate,
          orderedDishes: order.OrderedDishes.map((item) => ({
            dishName: item.Dish.name,
            dishPrice: item.Dish.price,
            dishPhoto: item.Dish.photo,
            quantity: item.quantity,
            totalPrice: item.totalprice,
          })),
        });
      }
    }

    res.status(200).json(ordersWithoutReview);
  } catch (error) {
    console.error("Error fetching deliveries:", error.message);
    res.status(500).json({ error: "Failed to fetch deliveries" });
  }
};

module.exports = {
  addOrder,
  deleteOrder,
  getClientOrders,
  getCurrentClientOrders,
  downloadOrdersExcel,
  getCompletedDeliveriesWithoutReview,
};
