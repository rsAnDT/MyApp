# Web Screen Configuration Guide

## Tổng quan

Để đảm bảo trải nghiệm người dùng tốt nhất trên web, tất cả các màn hình (screen) sử dụng `Stack.Screen` nên **tự động ẩn header và back button** trên web.

Chúng ta đã tạo một helper function `getWebScreenOptions()` để xử lý việc này một cách tự động và nhất quán.

---

## Sử dụng `getWebScreenOptions()`

### Import

```typescript
import { getWebScreenOptions } from '@/lib';
```

### Cú pháp cơ bản

```tsx
<Stack.Screen
  options={getWebScreenOptions({
    title: 'Tiêu đề màn hình',
    headerBackTitle: 'Quay lại', // optional, chỉ cho mobile
  })}
/>
```

### Ví dụ thực tế

#### 1. Màn hình đơn giản

```tsx
// src/app/feed/add-post.tsx
import { Stack } from 'expo-router';
import { getWebScreenOptions } from '@/lib';

export default function AddPost() {
  return (
    <View>
      <Stack.Screen
        options={getWebScreenOptions({
          title: 'Add Post',
          headerBackTitle: 'Feed',
        })}
      />
      {/* Nội dung màn hình */}
    </View>
  );
}
```

#### 2. Màn hình với nhiều trạng thái

```tsx
// src/app/feed/[id].tsx
import { getWebScreenOptions, translate } from '@/lib';

export default function PostDetail() {
  const { data, isPending, isError } = usePost();

  if (isPending) {
    return (
      <View>
        <Stack.Screen
          options={getWebScreenOptions({
            title: translate('post.title'),
            headerBackTitle: translate('post.back'),
          })}
        />
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <View>
      <Stack.Screen
        options={getWebScreenOptions({
          title: translate('post.title'),
          headerBackTitle: translate('post.back'),
        })}
      />
      {/* Nội dung bài viết */}
    </View>
  );
}
```

#### 3. Màn hình 404

```tsx
// src/app/[...messing].tsx
export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen
        options={getWebScreenOptions({
          title: translate('not_found.title'),
        })}
      />
      <View>
        <Text>404 - Not Found</Text>
      </View>
    </>
  );
}
```

---

## Cách hoạt động

### Trên Mobile

- ✅ Hiển thị header với title
- ✅ Hiển thị back button với text tùy chỉnh
- ✅ Hiển thị headerRight nếu có

### Trên Web

- ✅ Ẩn hoàn toàn header (`headerShown: false`)
- ✅ Không hiển thị back button
- ✅ Giao diện sạch sẽ, phù hợp với web app

---

## API Reference

### `getWebScreenOptions(options)`

#### Parameters

| Tham số           | Type                    | Required | Mô tả                                   |
| ----------------- | ----------------------- | -------- | --------------------------------------- |
| `title`           | `string`                | ✅       | Tiêu đề màn hình (hiển thị trên mobile) |
| `headerBackTitle` | `string`                | ❌       | Text của back button (chỉ mobile)       |
| `headerRight`     | `() => React.ReactNode` | ❌       | Component bên phải header (chỉ mobile)  |

#### Returns

- **Mobile:** Trả về object với đầy đủ options (title, headerBackTitle, headerRight)
- **Web:** Trả về `{ title, headerShown: false }`

---

## Best Practices

### ✅ Nên làm

1. **Luôn sử dụng `getWebScreenOptions()`** cho tất cả Stack.Screen

   ```tsx
   <Stack.Screen options={getWebScreenOptions({ title: 'My Screen' })} />
   ```

2. **Sử dụng với i18n**

   ```tsx
   <Stack.Screen
     options={getWebScreenOptions({
       title: translate('screen.title'),
       headerBackTitle: translate('screen.back'),
     })}
   />
   ```

3. **Đặt Stack.Screen ngay đầu component**
   ```tsx
   return (
     <View>
       <Stack.Screen options={...} />
       {/* Nội dung */}
     </View>
   );
   ```

### ❌ Không nên làm

1. **Không dùng `Platform.OS` trực tiếp**

   ```tsx
   // ❌ BAD
   <Stack.Screen
     options={{
       title: 'My Screen',
       headerShown: Platform.OS !== 'web',
     }}
   />

   // ✅ GOOD
   <Stack.Screen
     options={getWebScreenOptions({ title: 'My Screen' })}
   />
   ```

2. **Không bỏ qua headerBackTitle**

   ```tsx
   // ❌ BAD - không có back text trên mobile
   <Stack.Screen options={{ title: 'My Screen' }} />

   // ✅ GOOD
   <Stack.Screen
     options={getWebScreenOptions({
       title: 'My Screen',
       headerBackTitle: 'Back',
     })}
   />
   ```

---

## Migration Guide

### Màn hình cũ (Before)

```tsx
import { Platform } from 'react-native';

<Stack.Screen
  options={{
    title: 'Add Post',
    headerBackTitle: 'Feed',
    headerShown: Platform.OS !== 'web',
  }}
/>;
```

### Màn hình mới (After)

```tsx
import { getWebScreenOptions } from '@/lib';

<Stack.Screen
  options={getWebScreenOptions({
    title: 'Add Post',
    headerBackTitle: 'Feed',
  })}
/>;
```

---

## Các màn hình đã được cập nhật

- ✅ `/feed/add-post` - Thêm bài viết
- ✅ `/feed/[id]` - Chi tiết bài viết
- ✅ `[...messing]` - 404 Not Found

## Checklist cho màn hình mới

Khi tạo màn hình mới với Stack.Screen:

- [ ] Import `getWebScreenOptions` từ `@/lib`
- [ ] Sử dụng `getWebScreenOptions()` thay vì options object trực tiếp
- [ ] Cung cấp `title` (required)
- [ ] Cung cấp `headerBackTitle` cho mobile (nếu cần)
- [ ] Test trên cả mobile và web

---

## Source Code

File: `src/lib/use-web-screen-options.ts`

```typescript
import { Platform } from 'react-native';

export function getWebScreenOptions(options: {
  title: string;
  headerBackTitle?: string;
  headerRight?: () => React.ReactNode;
}) {
  if (Platform.OS === 'web') {
    return {
      title: options.title,
      headerShown: false,
    };
  }

  return {
    title: options.title,
    headerBackTitle: options.headerBackTitle,
    headerRight: options.headerRight,
  };
}
```
