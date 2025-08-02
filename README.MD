# Node.js Pro - @hoidanit (FINAL PROJECT)
Full source code series Node.js Pro của tác giả Hoàng Văn (Eric)
# tạo lại cở sở dữ liệu
npx prisma generate
npx prisma migrate dev --name update-sold

# chạy ứng dụng
npm run dev
# hoặc      
npm run start
# hoặc nếu bạn muốn chạy với Docker
docker compose up -d    
# hoặc nếu bạn muốn chạy với Docker Compose
docker compose up -d --build    
# git
git add .
git commit -m "update"
git push origin master 

