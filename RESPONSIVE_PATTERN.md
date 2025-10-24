# Responsive UI Pattern

Hệ thống pattern để tách biệt UI cho mobile và web một cách có tổ chức và dễ maintain.

## 🎯 **Mục tiêu**

- **Tách biệt hoàn toàn** UI cho mobile và web
- **Logic chung** được tái sử dụng
- **Không cần** `if Platform.OS !== 'web'` nhiều lần
- **Dễ maintain** và mở rộng
- **Type-safe** với TypeScript

## 🏗️ **Architecture Pattern**

### 1. **ResponsiveView Component**

Component chính để tách biệt mobile và web UI:

```tsx
import { ResponsiveView } from '@/components/ui';

<ResponsiveView
  mobile={<MobileComponent />}
  web={<WebComponent />}
  className="flex-1"
/>;
```

### 2. **Screen Components Structure**

Mỗi màn hình có 2 components riêng:

```
src/components/screens/
├── feed-screen.tsx          # MobileFeedScreen + WebFeedScreen
├── settings-screen.tsx       # MobileSettingsScreen + WebSettingsScreen
├── style-screen.tsx          # MobileStyleScreen + WebStyleScreen
├── login-screen.tsx          # MobileLoginScreen + WebLoginScreen
└── onboarding-screen.tsx     # MobileOnboardingScreen + WebOnboardingScreen
```

### 3. **Main Screen Pattern**

Màn hình chính chỉ chứa logic và sử dụng ResponsiveView:

```tsx
// src/app/(app)/index.tsx
export default function Feed() {
  // Logic chung
  const { data, isPending, isError } = usePosts();
  const handleCreatePost = () => {
    /* logic */
  };

  return (
    <ResponsiveView
      mobile={<MobileFeedScreen {...props} />}
      web={<WebFeedScreen {...props} />}
    />
  );
}
```

## 📱 **Mobile vs Web UI Differences**

### **Mobile UI**

- **Layout**: Vertical, single column
- **Navigation**: Tab bar, simple headers
- **Components**: Native components (FlashList, ScrollView)
- **Styling**: Mobile-first, compact
- **Max Width**: `2xl` (672px)

### **Web UI**

- **Layout**: Grid, multi-column, complex layouts
- **Navigation**: Rich headers, sidebars
- **Components**: Web-optimized (CSS Grid, Flexbox)
- **Styling**: Desktop-first, spacious
- **Max Width**: `full` hoặc `6xl` (1152px)

## 🔧 **Implementation Guide**

### **Bước 1: Tạo Screen Components**

```tsx
// src/components/screens/example-screen.tsx
import React from 'react';
import {
  FocusAwareStatusBar,
  ResponsiveContainer,
  View,
} from '@/components/ui';

type ExampleScreenProps = {
  data: any[];
  onAction: () => void;
};

export function MobileExampleScreen({ data, onAction }: ExampleScreenProps) {
  return (
    <ResponsiveContainer maxWidth="2xl" className="flex-1">
      <FocusAwareStatusBar />
      {/* Mobile-specific UI */}
    </ResponsiveContainer>
  );
}

export function WebExampleScreen({ data, onAction }: ExampleScreenProps) {
  return (
    <View className="flex-1 bg-gray-50 dark:bg-gray-900">
      <FocusAwareStatusBar />
      <ResponsiveContainer maxWidth="full" className="flex-1">
        <View className="flex h-full flex-col">
          {/* Web Header */}
          <View className="border-b border-gray-200 bg-white px-6 py-4">
            <h1 className="text-2xl font-bold">Web Title</h1>
          </View>

          {/* Web Content */}
          <View className="flex-1">{/* Web-specific UI */}</View>
        </View>
      </ResponsiveContainer>
    </View>
  );
}
```

### **Bước 2: Cập nhật Main Screen**

```tsx
// src/app/example.tsx
import React from 'react';
import {
  MobileExampleScreen,
  WebExampleScreen,
} from '@/components/screens/example-screen';
import { ResponsiveView } from '@/components/ui';

export default function Example() {
  // Logic chung
  const data = [];
  const handleAction = () => {};

  return (
    <ResponsiveView
      mobile={<MobileExampleScreen data={data} onAction={handleAction} />}
      web={<WebExampleScreen data={data} onAction={handleAction} />}
    />
  );
}
```

## 🎨 **Web UI Patterns**

### **1. Header Pattern**

```tsx
<View className="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800">
  <Text className="text-2xl font-bold text-gray-900 dark:text-white">
    Page Title
  </Text>
  <Text className="text-sm text-gray-600 dark:text-gray-400">
    Page description
  </Text>
</View>
```

### **2. Grid Layout Pattern**

```tsx
<View className="grid grid-cols-1 gap-6 p-6 lg:grid-cols-2">
  <View className="rounded-lg bg-white p-6 shadow-sm dark:bg-gray-800">
    {/* Card content */}
  </View>
</View>
```

### **3. Background Pattern**

```tsx
<View className="flex-1 bg-gray-50 dark:bg-gray-900">{/* Content */}</View>
```

## 📊 **Max Width Guidelines**

| Screen Type        | Mobile        | Web            |
| ------------------ | ------------- | -------------- |
| **Simple Content** | `2xl` (672px) | `4xl` (896px)  |
| **Complex Layout** | `2xl` (672px) | `6xl` (1152px) |
| **Full Width**     | `2xl` (672px) | `full` (100%)  |
| **Forms**          | `md` (448px)  | `md` (448px)   |

## 🔍 **Best Practices**

### **1. Props Interface**

- Sử dụng cùng props interface cho mobile và web components
- Đảm bảo type safety với TypeScript

### **2. Logic Separation**

- Logic business ở main screen
- UI logic ở screen components
- Không duplicate logic giữa mobile và web

### **3. Styling**

- Mobile: Sử dụng NativeWind classes
- Web: Sử dụng CSS Grid và Flexbox
- Dark mode support cho cả hai

### **4. Performance**

- Mobile: FlashList cho danh sách lớn
- Web: CSS Grid cho layout phức tạp
- Lazy loading khi cần thiết

## 🚀 **Benefits**

### **✅ Advantages**

- **Clean separation** của mobile và web UI
- **Reusable logic** giữa các platforms
- **Type-safe** với TypeScript
- **Easy to maintain** và extend
- **Consistent patterns** across app

### **⚠️ Considerations**

- **More files** để maintain
- **Initial setup** phức tạp hơn
- **Learning curve** cho team mới

## 📝 **Migration Guide**

### **Từ Platform.OS checks:**

```tsx
// Before
if (Platform.OS === 'web') {
  return <WebUI />;
}
return <MobileUI />;

// After
return <ResponsiveView mobile={<MobileUI />} web={<WebUI />} />;
```

### **Từ conditional rendering:**

```tsx
// Before
const isWeb = Platform.OS === 'web';
return (
  <View className={isWeb ? 'web-class' : 'mobile-class'}>
    {isWeb ? <WebComponent /> : <MobileComponent />}
  </View>
);

// After
return <ResponsiveView mobile={<MobileComponent />} web={<WebComponent />} />;
```

## 🎯 **Next Steps**

1. **Apply pattern** cho các màn hình còn lại
2. **Create shared components** cho common UI patterns
3. **Add animations** khác nhau cho mobile/web
4. **Optimize performance** cho từng platform
5. **Add testing** cho responsive components
