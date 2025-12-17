# Phân tích Cấu trúc Frontend Hiện tại

Dựa trên mã nguồn của dự án Vue.js, dưới đây là mô tả chi tiết về cấu trúc cây điều hướng (Route Tree), các component tương ứng và các đầu API được gọi tại mỗi màn hình.

## 1. Cấu trúc Route Tree & API Tương ứng

Bảng dưới đây liệt kê các route được định nghĩa trong `src/router/index.js` và các API endpoint được sử dụng trong các component tương ứng (dựa trên `src/config/api.js`).

| Route Path         | Tên Route                | Component Chính              | Mô tả Chức năng                                                                                                | Đầu API Tương ứng (Method - Endpoint)                                                                                                                                                                                                                                                                                                                               |
| :----------------- | :----------------------- | :--------------------------- | :------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `/`                | `Home`                   | `HomePage.vue`               | Trang chủ, hiển thị danh sách sản phẩm, lọc theo danh mục.                                                     | **Products:**<br>- `GET /products` (Lấy tất cả sản phẩm)<br>**Categories:**<br>- `GET /categories/{id}/products` (Lấy SP theo danh mục)<br>- `GET /categories` (Thường được gọi bởi SiteNavbar để hiển thị menu)                                                                                                                                                    |
| `/products/:id`    | `ProductDetail`          | `ProductDetail.vue`          | Trang chi tiết thông tin một sản phẩm và các sản phẩm liên quan.                                               | **Products:**<br>- `GET /products/{id}` (Lấy chi tiết SP)<br>**Categories:**<br>- `GET /categories/{id}/products` (Lấy SP liên quan cùng danh mục)                                                                                                                                                                                                                  |
| `/blogs`           | `BlogList`               | `BlogList.vue`               | Trang danh sách các bài viết blog.                                                                             | **Blogs:**<br>- `GET /blogs` (Lấy tất cả blog)<br>- `GET /blogs?search={keyword}` (Tìm kiếm blog)                                                                                                                                                                                                                                                                   |
| `/blogs/:id`       | `BlogDetail`             | `BlogDetail.vue`             | Trang hiển thị nội dung chi tiết của một bài viết.                                                             | **Blogs:**<br>- `GET /blogs/{id}` (Lấy chi tiết blog)                                                                                                                                                                                                                                                                                                               |
| `/admin/login`     | `AdminLogin`             | `AdminLogin.vue`             | Trang đăng nhập dành cho quản trị viên.                                                                        | **Admin:**<br>- `POST /admins/login` (Đăng nhập, lấy token/thông tin admin)                                                                                                                                                                                                                                                                                         |
| `/admin/dashboard` | `AdminDashboard`         | `AdminDashboard.vue`         | Trang quản trị trung tâm. Tích hợp quản lý Sản phẩm, Danh mục và Blog (nhúng component `AdminBlogManagement`). | **Products:**<br>- `POST /products`<br>- `PUT /products/{id}`<br>- `DELETE /products/{id}`<br>**Categories:**<br>- `GET /categories`<br>- `POST /categories`<br>- `PUT/DELETE /categories/{id}`<br>**Blogs (via AdminBlogManagement):**<br>- `GET /admin/blogs`<br>- `POST /admin/blogs`<br>- `PUT/DELETE /admin/blogs/{id}`<br>- `PATCH /admin/blogs/{id}/publish` |
| `/admin/products`  | `AdminProductManagement` | `AdminProductManagement.vue` | Trang quản lý sản phẩm (Legacy).                                                                               | **Legacy/Utils:**<br>- Sử dụng `uploadProductImage` từ file utils.                                                                                                                                                                                                                                                                                                  |

## 2. Chi tiết các Component Quản trị (Admin)

Trong `src/components/AdminDashboard.vue`, giao diện được chia thành các section (tab) chính để quản lý dữ liệu:

- **Quản lý Sản phẩm (Section #products):**

  - Sử dụng API `products` để tạo mới (`create`), cập nhật (`update`) và xóa (`delete`) sản phẩm.
  - Tích hợp component `ImageUploader` để gọi các API upload ảnh:
    - `POST /products/{id}/images/main` (Upload ảnh đại diện)
    - `POST /products/{id}/images` (Upload ảnh phụ)

- **Quản lý Danh mục (Section #categories):**

  - Sử dụng API `categories` để quản lý danh sách phân loại sản phẩm.

- **Quản lý Blog (Sử dụng component `AdminBlogManagement.vue`):**
  - Component này được nhúng trực tiếp vào Dashboard.
  - Sử dụng nhóm API `admin.blogs` (có prefix `/admin`):
    - `GET /admin/blogs` (Lấy danh sách blog quyền admin - bao gồm cả nháp)
    - `POST /admin/blogs` (Tạo bài viết)
    - `PUT /admin/blogs/{id}` (Cập nhật)
    - `PATCH /admin/blogs/{id}/publish` hoặc `unpublish` (Xuất bản/Gỡ bài)
    - Các API upload ảnh cho blog tương tự như sản phẩm.

## 3. Cấu hình API (`src/config/api.js`)

File config định nghĩa `API_BASE_URL` (mặc định là `http://localhost:8080/api`) và tổ chức các endpoint theo đối tượng:

- **`products`**: CRUD sản phẩm và quản lý hình ảnh.
- **`categories`**: CRUD danh mục.
- **`collections`**: CRUD bộ sưu tập.
- **`blogs`**:
  - Public: `getAll`, `getById`, `search`.
  - Admin: `getAllAdmin`, `create`, `update`, `delete`, `publish`, `unpublish`, `uploadImage`.
- **`admin`**: Chỉ chứa endpoint `login`.

Hệ thống được thiết kế phân tách rõ ràng giữa trang **Client** (Home, Products, Blogs) sử dụng các API public và trang **Admin** (Dashboard) sử dụng các API secure.
