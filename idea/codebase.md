```
src/
├── app/                        # SERVER LAND (Mặc định là Server Components)
│   ├── products/               # Routing
│   │   ├── [id]/
│   │   │   └── page.tsx        # Chi tiết sản phẩm (Fetch data theo ID)
│   │   ├── layout.tsx          # Layout riêng cho trang products
│   │   ├── loading.tsx         # ✨ Tối ưu UX: Skeleton loading tự động
│   │   └── page.tsx            # Danh sách sản phẩm (Fetch data list)
│   ├── layout.tsx              # Root Layout
│   └── page.tsx                # Homepage
│
├── components/                 # CLIENT LAND (Nơi chứa UI & Interactivity)
│   ├── ui/                     # Các component nhỏ (Button, Card, Input)
│   ├── product-card.tsx        # Component hiển thị (Có thể là Client nếu cần interaction)
│   └── navbar.tsx              # Điều hướng
│
└── lib/                        # LOGIC SHARE
    └── api.ts                  # Hàm gọi API đơn giản (để tái sử dụng)
```