const { MongoClient } = require("mongodb");
const bcrypt = require("bcryptjs");

/* script get from "https://visior.vn/product"
  JSON.stringify([...document.querySelectorAll(".nav-link")].map(elem => ({ name: elem.innerText, is_delete: false })))
*/

const defaultCategories = [
  { name: "Đồ Chơi, Phụ Kiện Xe Hơi", is_delete: false },
  { name: "Máy Hàn Và Phụ Kiện", is_delete: false },
  { name: "Máy Hàn Điện Tử", is_delete: false },
  { name: "Máy Hàn Tig", is_delete: false },
  { name: "Máy Hàn Cắt Plasma", is_delete: false },
  { name: "Máy Hàn Mig", is_delete: false },
  { name: "Biến Thế Hàn", is_delete: false },
  { name: "Máy Hàn Bấm", is_delete: false },
  { name: "Phụ Kiện Hàn", is_delete: false },
  { name: "Sản Phẩm Dùng Điện", is_delete: false },
  { name: "Máy Bơm Nước", is_delete: false },
  { name: "Máy Cưa Xích Dùng Điện", is_delete: false },
  { name: "Các Dòng Máy Bàn", is_delete: false },
  { name: "Máy Trộn Bê Tông", is_delete: false },
  { name: "Máy Khoan", is_delete: false },
  { name: "Máy Khoan Bàn", is_delete: false },
  { name: "Máy Mài Góc", is_delete: false },
  { name: "Máy Mài Khuôn", is_delete: false },
  { name: "Máy Mài 2 Đá", is_delete: false },
  { name: "Máy Cắt ( Gạch, Kim Loại, Gỗ )", is_delete: false },
  { name: "Máy Bào", is_delete: false },
  { name: "Máy Chà Nhám", is_delete: false },
  { name: "Máy Đánh Bóng", is_delete: false },
  { name: "Máy Cưa", is_delete: false },
  { name: "Máy Phay", is_delete: false },
  { name: "Máy Thổi Hơi Nóng", is_delete: false },
  { name: "Máy Bắn Vít", is_delete: false },
  { name: "Máy Đục", is_delete: false },
  { name: "Máy Phun Xịt Rửa Áp Lực", is_delete: false },
  { name: "Máy Hút Bụi", is_delete: false },
  { name: "Máy Vặn Bu Lông", is_delete: false },
  { name: "Máy Bắn Đinh", is_delete: false },
  { name: "Máy Trộn Sơn", is_delete: false },
  { name: "Máy Khoét Rảnh", is_delete: false },
  { name: "Máy Phun Sơn", is_delete: false },
  { name: "Súng Bắn Keo", is_delete: false },
  { name: "Máy Thổi Bụi", is_delete: false },
  { name: "Máy Rút Rive", is_delete: false },
  { name: "Máy Ghép Cạnh", is_delete: false },
  { name: "Máy Đầm Dùi Bê Tông", is_delete: false },
  { name: "Máy Taro Ren", is_delete: false },
  { name: "Máy Uốn Kim Loại", is_delete: false },
  { name: "Máy Bơm Khí Nén", is_delete: false },
  { name: "Sản Phẩm Dùng Pin", is_delete: false },
  { name: "Máy Khoan Pin", is_delete: false },
  { name: "Máy Khoan Bê Tông Pin", is_delete: false },
  { name: "Máy Cưa Đĩa Pin", is_delete: false },
  { name: "Máy Cưa Lọng Pin", is_delete: false },
  { name: "Máy Cắt Đa Năng Pin", is_delete: false },
  { name: "Máy Cưa Kiếm Pin", is_delete: false },
  { name: "Máy Cắt Ống Pin", is_delete: false },
  { name: "Máy Cắt Cành Pin", is_delete: false },
  { name: "Máy Cưa Đa Góc Pin", is_delete: false },
  { name: "Máy Cưa Bàn Pin", is_delete: false },
  { name: "Máy Chà Nhám Pin", is_delete: false },
  { name: "Máy Bào Tay Pin", is_delete: false },
  { name: "Máy Phay Pin", is_delete: false },
  { name: "Máy Mài Khuôn Pin", is_delete: false },
  { name: "Máy Mài Góc Pin", is_delete: false },
  { name: "Máy Bơm Silicon Pin", is_delete: false },
  { name: "Đèn Làm Việc Pin", is_delete: false },
  { name: "Phụ Kiện Pin và Sạc", is_delete: false },
  { name: "Máy Khoan Góc Pin", is_delete: false },
  { name: "Máy Nén Khí Pin", is_delete: false },
  { name: "Máy Tỉa Hàng Rào Pin", is_delete: false },
  { name: "Bộ Combo Pin", is_delete: false },
  { name: "Quạt Dùng Pin", is_delete: false },
  { name: "Máy Khoan từ dùng Pin", is_delete: false },
  { name: "Đèn Led Dùng Pin", is_delete: false },
  { name: "Máy Đánh Bóng Dùng Pin", is_delete: false },
  { name: "Máy Cắt Cỏ Dùng Pin", is_delete: false },
  { name: "Máy Bắt Vít Pin", is_delete: false },
  { name: "Máy Vặn Bu Lông Pin", is_delete: false },
  { name: "Máy Hút Bụi Pin", is_delete: false },
  { name: "Máy Thổi Bụi Pin", is_delete: false },
  { name: "Máy Bắn Đinh Pin", is_delete: false },
  { name: "Máy Phun Sơn Pin", is_delete: false },
  { name: "Súng Bắn Keo Dùng Pin", is_delete: false },
  { name: "Thang Nhôm, Sắt, Inox", is_delete: false },
  { name: "Thang Nhôm Chữ A", is_delete: false },
  { name: "Thang Nhôm Rút, Xếp, Kéo, Trượt", is_delete: false },
  { name: "Thang Nhôm Bàn", is_delete: false },
  { name: "Thang Nhôm Gấp", is_delete: false },
  { name: "Thang Nhôm Ghế", is_delete: false },
  { name: "Thang Nhôm Thẳng", is_delete: false },
  { name: "Thang Nhôm Khác", is_delete: false },
  { name: "Thang Nhôm Rút", is_delete: false },
  { name: "Thiết Bị Và Dụng Cụ Đo", is_delete: false },
  { name: "Máy Đo Khoảng Cách", is_delete: false },
  { name: "Máy Cân Mực", is_delete: false },
  { name: "Máy Cân Tia", is_delete: false },
  { name: "Máy Trắc Địa", is_delete: false },
  { name: "Phụ Kiện và Chân Giá Đỡ", is_delete: false },
  { name: "Máy Dò Kim Loại", is_delete: false },
  { name: "Máy Đo Tốc Độ", is_delete: false },
  { name: "Máy Kiểm Tra Độ Phẳng", is_delete: false },
  { name: "Máy Thủy Bình", is_delete: false },
  { name: "Máy Đo Nhiệt Độ", is_delete: false },
  { name: "Máy Đo Điện Năng", is_delete: false },
  { name: "Dụng Cụ, Thiết Bị Vệ Sinh", is_delete: false },
  { name: "Xe Làm Vệ Sinh", is_delete: false },
  { name: "Dụng Cụ Vệ Sinh", is_delete: false },
  { name: "Máy Chà Sàn", is_delete: false },
  { name: "Bình Xit - Bình Phun", is_delete: false },
  { name: "Thiết bị nâng đỡ", is_delete: false },
  { name: "Xe đẩy hàng", is_delete: false },
  { name: "Dụng Cụ Đồ Nghề", is_delete: false },
  { name: "Tua Vít", is_delete: false },
  { name: "Bộ Khẩu ( Tuýp )", is_delete: false },
  { name: "Bộ Khóa Lục Giác", is_delete: false },
  { name: "Bút Thử Điện", is_delete: false },
  { name: "Cán Sơn Bông Lăn", is_delete: false },
  { name: "Cưa ( Gỗ, Sắt …)", is_delete: false },
  { name: "Dao Cắt", is_delete: false },
  { name: "Đục(Lấy dấu, sắt, ..)", is_delete: false },
  { name: "Ê Ke", is_delete: false },
  { name: "Hộp Đựng Đồ Nghề", is_delete: false },
  { name: "Kìm", is_delete: false },
  { name: "Thước Đo", is_delete: false },
  { name: "Kéo", is_delete: false },
  { name: "Đá ( Đá Cắt, Đá Mài,.. )", is_delete: false },
  { name: "Bộ Bào Gỗ", is_delete: false },
  { name: "Cờ Lê", is_delete: false },
  { name: "Bật Mực", is_delete: false },
  { name: "Bộ Dũa", is_delete: false },
  { name: "Bộ Đục", is_delete: false },
  { name: "Bộ Dụng Cụ Đa Năng", is_delete: false },
  { name: "Bộ Lã", is_delete: false },
  { name: "Bông Sơn", is_delete: false },
  { name: "Búa", is_delete: false },
  { name: "Ê Tô", is_delete: false },
  { name: "Lưỡi", is_delete: false },
  { name: "Mỏ Hàn", is_delete: false },
  { name: "Mỏ Lếch", is_delete: false },
  { name: "Tủ Đựng Đồ Nghề", is_delete: false },
  { name: "Túi Đeo", is_delete: false },
  { name: "Vít", is_delete: false },
  { name: "Xà Beng", is_delete: false },
  { name: "Phụ Kiện Các Loại", is_delete: false },
  { name: "Mũi Khoan", is_delete: false },
  { name: "Đĩa Cắt ( Gỗ, Nhôm, Sắt...)", is_delete: false },
  { name: "Kẹp Nhanh", is_delete: false },
  { name: "Con Đội", is_delete: false },
];

async function seedData(uri) {
  console.log("START CONNECT--------", uri);
  const client = new MongoClient(uri);
  console.log("CREATE CONNECTION SUCCESSFULLY--------");

  try {
    // Connect to the MongoDB cluster
    await client.connect();
    console.log("CONNECT SUCCESSFULLY--------");

    // Create a new database
    const database = client.db("sale_web");

    console.log("Seeding data...");
    const categoryCollection = await database.collection("category");

    for (item of defaultCategories) {
      console.log("Inserting category data");
      const insertedCategory = await categoryCollection.insertOne(item);
      console.log(
        "Inserted category with name: " +
          item.name +
          " id: " +
          insertedCategory.insertedId
      );
    }

    console.log("Seed data successful");
  } catch (err) {
    console.error("Error creating database and collections:", err);
  } finally {
    // Close the MongoDB client
    await client.close();
  }
}

module.exports = seedData;
