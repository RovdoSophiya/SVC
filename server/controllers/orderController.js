const Order = require("../models/Order");
const Delivery = require("../models/Delivery");
const OrderedDish = require("../models/OrderedDish");
const Courier = require("../models/Courier");
const Client = require("../models/Client");
const Dish = require("../models/Dish");
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
//   try {
//     const { clientid, page = 1, limit = 5 } = req.query;
//     const offset = (page - 1) * limit;

//     const statusFilter = {
//       [Op.or]: [
//         { status: "Pending" },
//         { status: "On the way" },
//         { status: "Delayed" },
//         { status: null },
//         // { status: "None" },
//         // { status: "none" },
//       ],
//     };

//     // Получаем все заказы с фильтрацией по статусу
//     const orders = await Order.findAndCountAll({
//       where: { clientid },
//       include: [
//         {
//           model: Delivery,
//           attributes: ["status", "deliveryaddress", "deliverydate"],
//           required: false,
//           where: statusFilter,
//           include: [
//             {
//               model: Courier,
//               attributes: ["name", "lastname", "phone"],
//             },
//           ],
//         },
//         {
//           model: OrderedDish,
//           include: [
//             {
//               model: Dish,
//               attributes: ["name", "price"],
//             },
//           ],
//         },
//       ],
//       limit: parseInt(limit),
//       offset,
//     });

//     // Формируем данные
//     const formattedOrders = orders.rows.map((order) => ({
//       id: order.id,
//       orderdate: order.orderdate,
//       totalamount: order.totalamount,
//       delivery: {
//         status: order.Delivery?.status || "None",
//         // status: order.Delivery ? order.Delivery.status : "None",
//         courier: order.Delivery?.Courier
//           ? {
//               name: order.Delivery.Courier.name,
//               lastname: order.Delivery.Courier.lastname,
//               phone: order.Delivery.Courier.phone,
//             }
//           : "Courier has not picked up the order",
//       },
//       orderedDishes: order.OrderedDishes.map((dish) => ({
//         name: dish.Dish.name,
//         price: dish.Dish.price,
//         quantity: dish.quantity,
//         totalprice: dish.totalprice,
//       })),
//     }));

//     res.status(200).json({
//       orders: formattedOrders,
//       total: orders.count, // Используем общее количество заказов из базы данных
//     });
//   } catch (error) {
//     console.error("Error fetching client orders:", error);
//     res.status(500).json({
//       error: "An error occurred while fetching orders.",
//       details: error.message,
//     });
//   }
// };

// const downloadOrdersWord = async (req, res) => {
//   try {
//     const { clientid } = req.query;

//     const ordersResponse = await getClientOrders({ query: { clientid } }, res);

//     if (ordersResponse.status !== 200) {
//       return res
//         .status(ordersResponse.status)
//         .json({ error: "Failed to fetch orders." });
//     }

//     const formattedOrders = ordersResponse.data.orders;

//     const doc = officegen("doc");

//     // Заголовок документа
//     doc.addParagraph("Список заказов", { align: "center", font_size: 24 });
//     doc.putPageBreak(); // Переход на новую страницу после заголовка

//     formattedOrders.forEach((order) => {
//       doc.addParagraph(`ID заказа: ${order.id}`);
//       doc.addParagraph(`Дата: ${new Date(order.orderdate).toLocaleString()}`);
//       doc.addParagraph(`Общая сумма: ${order.totalamount}`);
//       doc.addParagraph(`Статус доставки: ${order.delivery.status}`);

//       const courierInfo =
//         typeof order.delivery.courier === "object"
//           ? `Курьер: ${order.delivery.courier.name} ${order.delivery.courier.lastname}, Телефон: ${order.delivery.courier.phone}`
//           : `Курьер: ${order.delivery.courier}`;
//       doc.addParagraph(courierInfo);

//       const orderedDishes = order.orderedDishes
//         .map(
//           (dish) =>
//             `${dish.name} (Количество: ${dish.quantity}, Цена: ${dish.totalprice})`
//         )
//         .join(", ");
//       doc.addParagraph(`Заказанные блюда: ${orderedDishes}`);

//       // Добавление разделителя между заказами
//       doc.addParagraph(""); // Пустой параграф для отступа
//       doc.addParagraph("---"); // Линия-разделитель
//       doc.addParagraph(""); // Пустой параграф для отступа
//     });

//     // Установка заголовков для скачивания файла
//     res.setHeader("Content-Disposition", "attachment; filename=orders.doc");
//     res.setHeader("Content-Type", "application/msword");

//     // Генерация документа
//     const buffer = await new Promise((resolve, reject) => {
//       doc.generate(res, {
//         final: (err) => {
//           if (err) {
//             return reject(err);
//           }
//           resolve();
//         },
//       });
//     });

//     // Отправка документа
//     res.end(buffer);
//   } catch (error) {
//     console.error("Error generating Word file:", error);
//     if (!res.headersSent) {
//       res
//         .status(500)
//         .json({ error: "An error occurred while generating the Word file." });
//     }
//   }
// };

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

module.exports = {
  addOrder,
  deleteOrder,
  getClientOrders,
  getCurrentClientOrders,
  downloadOrdersExcel,
};
