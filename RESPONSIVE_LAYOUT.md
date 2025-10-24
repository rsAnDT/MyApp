# Responsive Layout System

Hệ thống responsive layout được thiết kế để tự động điều chỉnh giao diện cho cả mobile và web một cách dễ dàng.

## Components

### ResponsiveContainer

Wrapper component cơ bản để giới hạn chiều rộng và căn giữa nội dung trên web.

```tsx
import { ResponsiveContainer } from '@/components/ui';

<ResponsiveContainer maxWidth="2xl" className="flex-1">
  {/* Nội dung của bạn */}
</ResponsiveContainer>;
```

### ResponsiveLayout

Layout component nâng cao với padding responsive và nhiều tùy chọn hơn.

```tsx
import { ResponsiveLayout } from '@/components/ui';

<ResponsiveLayout maxWidth="3xl" centerContent={false}>
  {/* Nội dung của bạn */}
</ResponsiveLayout>;
```

## Props

### ResponsiveContainer & ResponsiveLayout

| Prop            | Type                                                                                           | Default | Description                                       |
| --------------- | ---------------------------------------------------------------------------------------------- | ------- | ------------------------------------------------- |
| `children`      | `React.ReactNode`                                                                              | -       | Nội dung cần wrap                                 |
| `className`     | `string`                                                                                       | `''`    | CSS classes bổ sung                               |
| `maxWidth`      | `'sm' \| 'md' \| 'lg' \| 'xl' \| '2xl' \| '3xl' \| '4xl' \| '5xl' \| '6xl' \| '7xl' \| 'full'` | `'2xl'` | Chiều rộng tối đa                                 |
| `centerContent` | `boolean`                                                                                      | `true`  | Có căn giữa nội dung không (chỉ ResponsiveLayout) |

## Breakpoints

Hệ thống sử dụng các breakpoints sau:

- `xs`: 475px
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## Max Width Classes

- `sm`: 20rem (320px)
- `md`: 28rem (448px)
- `lg`: 32rem (512px)
- `xl`: 36rem (576px)
- `2xl`: 42rem (672px)
- `3xl`: 48rem (768px)
- `4xl`: 56rem (896px)
- `5xl`: 64rem (1024px)
- `6xl`: 72rem (1152px)
- `7xl`: 80rem (1280px)

## Cách sử dụng

### 1. Trong Layout Files

```tsx
// src/app/_layout.tsx
import { ResponsiveContainer } from '@/components/ui';

export default function RootLayout() {
  return (
    <Providers>
      <ResponsiveContainer maxWidth="full" className="flex-1">
        <Stack>{/* Screens */}</Stack>
      </ResponsiveContainer>
    </Providers>
  );
}
```

### 2. Trong Tab Layout

```tsx
// src/app/(app)/_layout.tsx
import { ResponsiveContainer } from '@/components/ui';

export default function TabLayout() {
  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <Tabs>{/* Tab screens */}</Tabs>
    </ResponsiveContainer>
  );
}
```

### 3. Trong Individual Pages

```tsx
// src/app/(app)/settings.tsx
import { ResponsiveLayout } from '@/components/ui';

export default function Settings() {
  return (
    <ResponsiveLayout maxWidth="lg" centerContent={false}>
      <View>{/* Settings content */}</View>
    </ResponsiveLayout>
  );
}
```

## Responsive Classes

Sử dụng các class responsive của Tailwind:

```tsx
<View className="m-2 sm:m-4 lg:m-6">
  <Text className="text-lg sm:text-xl lg:text-2xl">Responsive text</Text>
</View>
```

## Lưu ý

- Components chỉ áp dụng responsive trên web (Platform.OS === 'web')
- Trên mobile, components sẽ render như View thông thường
- Sử dụng `maxWidth="full"` cho root layout để không giới hạn chiều rộng
- Sử dụng `maxWidth="2xl"` hoặc nhỏ hơn cho content areas
- Padding responsive được áp dụng tự động trong ResponsiveLayout
