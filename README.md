<h1 align="center">
  <img alt="logo" src="./assets/icon.png" width="124px" style="border-radius:10px"/><br/>
Mobile App </h1>

## Requirements

- [React Native dev environment ](https://reactnative.dev/docs/environment-setup)
- [Node.js LTS release](https://nodejs.org/en/)
- [Git](https://git-scm.com/)
- [Watchman](https://facebook.github.io/watchman/docs/install#buildinstall), required only for macOS or Linux users
- [Pnpm](https://pnpm.io/installation)
- [Cursor](https://www.cursor.com/) or [VS Code Editor](https://code.visualstudio.com/download) ⚠️ Make sure to install all recommended extension from `.vscode/extensions.json`

## 👋 Quick start

Clone the repo to your machine and install deps :

```sh
git clone https://github.com/user/repo-name

cd ./repo-name

pnpm install
```

To run the app on ios

```sh
pnpm ios
```

To run the app on Android

```sh
pnpm android
```

## ✍️ EAS Build

- pnpm add -g expo-cli
- pnpm add -g eas-cli
- tao tai khoan expo.dev
- eas login
- eas build:configure => xem thong tin va thay EAS_PROJECT_ID + EXPO_ACCOUNT_OWNER trong env.js
- vi du build ipa : run yarn build:development:ios -> lam theo huong dan dang nhap apple de import profile len expo.dev

## ✍️ Github Action

1. Github -> Settings -> Secret and variables -> Actions
2. New repository secret -> Name: EXPO TOKEN, Value: Token tao tu expo.dev -> Account Settings -> Access Tokens
3. Cac scripts co trong folder .github , hay xem va su dung chung
4. Y nghia nhu sau :
   - lint-ts , test, type-check, expo-doctor -> kiem soat chat luong code khi co push hoac pull request vao nhanh master
   - compress-image : toi uu assets, tự động chạy tool nén ảnh, tạo pull request chứa ảnh đã nén khi có push hoặc pull request chứa ảnh mới
   - new-app-version : mục đích tạo ra 1 tag mới , có thể chọn branch và minor, major hoặc patch rồi nó sẽ tự đánh version cho tag
5. Khi build release development hoặc stg
   - Chạy lệnh build ipa hoặc apk ít nhất 1 lần dưới local trước để eas lấy được profile + keystore đẩy lên đã
   - Khi thành công rồi thì mỗi lần cần build auto thì có 2 cách build:
     1. Lên github action chọn "EAS QA Build Dev (Android & IOS) (EAS)" rồi chọn nhánh cần build là nó build
     2. Vào chỗ tag , chọn tag cần build và tạo release và release note xong là nó sẽ tự chạy
     3. Chú ý : Hiện tại đang auto là build developmnent để test , nếu muốn sửa thành stg thì vào .github/workflows/eas-build-qa để sửa rồi push code lên
