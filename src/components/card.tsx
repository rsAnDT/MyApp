import { Link } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import type { Post } from '@/api';
import { Image, Pressable, Text, View } from '@/components/ui';

type Props = Post;

const images = [
  'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1564507004663-b6dfb3c824d5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1515386474292-47555758ef2e?auto=format&fit=crop&w=800&q=80',
  'https://plus.unsplash.com/premium_photo-1666815503002-5f07a44ac8fb?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1587974928442-77dc3e0dba72?auto=format&fit=crop&w=800&q=80',
];

export const Card = ({ title, body, id }: Props) => {
  // Mobile styling
  if (Platform.OS !== 'web') {
    return (
      <Link href={`/feed/${id}`} asChild>
        <Pressable>
          <View className="m-2 overflow-hidden rounded-xl border border-neutral-300 bg-white dark:bg-neutral-900 sm:m-4">
            <Image
              className="h-56 w-full overflow-hidden rounded-t-xl sm:h-64"
              contentFit="cover"
              source={{
                uri: images[Math.floor(Math.random() * images.length)],
              }}
            />
            <View className="p-3 sm:p-4">
              <Text className="py-2 text-xl sm:py-3 sm:text-2xl">{title}</Text>
              <Text
                numberOfLines={3}
                className="leading-relaxed text-gray-600 sm:leading-snug"
              >
                {body}
              </Text>
            </View>
          </View>
        </Pressable>
      </Link>
    );
  }

  // Web styling - compact card cho grid layout
  return (
    <Link href={`/feed/${id}`} asChild>
      <Pressable>
        <View className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-700 dark:bg-gray-800">
          <Image
            className="h-48 w-full object-cover"
            contentFit="cover"
            source={{
              uri: images[Math.floor(Math.random() * images.length)],
            }}
          />
          <View className="p-4">
            <Text className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </Text>
            <Text
              numberOfLines={3}
              className="text-sm leading-relaxed text-gray-600 dark:text-gray-300"
            >
              {body}
            </Text>
          </View>
        </View>
      </Pressable>
    </Link>
  );
};
