/** @type {import('next').NextConfig} */
// Dòng trên là một chỉ thị JSDoc, giúp trình soạn thảo mã nguồn (như VS Code)
// cung cấp gợi ý và kiểm tra kiểu dữ liệu cho đối tượng cấu hình Next.js.

const nextConfig = {
  // `reactStrictMode` khi được bật (true), sẽ kích hoạt các kiểm tra và cảnh báo bổ sung
  // cho các thành phần con của nó trong quá trình phát triển. Nó giúp phát hiện các vấn đề tiềm ẩn
  // trong ứng dụng, chẳng hạn như các lifecycle không an toàn, và khuyến khích các phương pháp lập trình tốt hơn.
  reactStrictMode: true,

  // Cấu hình cho việc tối ưu hóa hình ảnh của Next.js (next/image).
  images: {
    // `domains` chỉ định một danh sách các tên miền (hostname) được phép
    // để Next.js tối ưu hóa hình ảnh từ đó. Điều này là một biện pháp bảo mật
    // để ngăn chặn việc sử dụng các URL hình ảnh tùy ý từ các nguồn không đáng tin cậy.
    // Ở đây, chúng ta chỉ cho phép hình ảnh từ Firebase Storage.
    domains: ['firebasestorage.googleapis.com'],
  },

  // `transpilePackages` chỉ định các gói (packages) trong `node_modules` cần được
  // biên dịch (transpile) bởi Next.js. Mặc định, Next.js không biên dịch các gói từ `node_modules`
  // để tăng tốc độ build. Tuy nhiên, một số gói (đặc biệt là các gói viết bằng cú pháp mới
  // hoặc không tuân thủ chuẩn CommonJS) cần được biên dịch để hoạt động chính xác trong Next.js.
  // Ở đây, chúng ta đang biên dịch các gói từ Material-UI.
  transpilePackages: ['@mui/x-date-pickers', '@mui/material'],
}

// Xuất đối tượng cấu hình để Next.js có thể sử dụng nó.
module.exports = nextConfig 