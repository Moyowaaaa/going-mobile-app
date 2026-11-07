import { FlashList } from "@shopify/flash-list";
import { Search, SearchX, X } from "lucide-react-native";
import { useColorScheme } from "nativewind";
import { useCallback, useMemo, useState } from "react";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { DiscoveryPanel } from "@/components/search/discovery-panel";
import { ResultRow } from "@/components/search/result-row";
import { AvailableEvents, eventCategories } from "@/constants/data";
import { BottomTabInset, DisplayFont } from "@/constants/theme";
import type { EventItem } from "@/constants/types";

const browseCategories = eventCategories.filter((category) => category !== "For you");

export default function SearchScreen() {
  const insets = useSafeAreaInsets();
  const { colorScheme } = useColorScheme();
  const isDark = colorScheme === "dark";
  const mutedColor = isDark ? "#a9a9a3" : "#777773";

  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Derived, never stored: the list is a pure function of query + category.
  const trimmedQuery = query.trim();
  const isSearching = trimmedQuery.length > 0 || activeCategory !== null;

  const results = useMemo(() => {
    if (!isSearching) return [];

    const needle = trimmedQuery.toLowerCase();
    return AvailableEvents.filter((event) => {
      const category = event.type[0] ?? "";
      const matchesCategory = activeCategory === null || category === activeCategory;
      const matchesQuery =
        needle.length === 0 ||
        `${event.title} ${event.location} ${category} ${event.date}`
          .toLowerCase()
          .includes(needle);
      return matchesCategory && matchesQuery;
    });
  }, [isSearching, trimmedQuery, activeCategory]);

  const rememberSearch = useCallback((term: string) => {
    const value = term.trim();
    if (value.length === 0) return;
    setRecentSearches((previous) =>
      [value, ...previous.filter((item) => item !== value)].slice(0, 6),
    );
  }, []);

  const handleToggleFavorite = useCallback((title: string) => {
    setFavorites((previous) =>
      previous.includes(title)
        ? previous.filter((item) => item !== title)
        : [...previous, title],
    );
  }, []);

  const handlePickSearch = useCallback(
    (term: string) => {
      setQuery(term);
      rememberSearch(term);
    },
    [rememberSearch],
  );

  const handlePickCategory = useCallback((category: string) => {
    setActiveCategory((previous) => (previous === category ? null : category));
  }, []);

  const handleClearRecent = useCallback(() => {
    setRecentSearches([]);
  }, []);

  const handleClearAll = useCallback(() => {
    setQuery("");
    setActiveCategory(null);
  }, []);

  const renderItem = useCallback(
    ({ item }: { item: EventItem }) => (
      <ResultRow
        title={item.title}
        category={item.type[0] ?? "Event"}
        date={item.date}
        time={item.time}
        location={item.location}
        price={item.price}
        color={item.color}
        favorite={favorites.includes(item.title)}
        onToggleFavorite={handleToggleFavorite}
      />
    ),
    [favorites, handleToggleFavorite],
  );

  const listHeader = isSearching ? (
    <View className="flex-row items-center justify-between pb-4">
      <Text className="text-sm text-[#777773] dark:text-[#a9a9a3]">
        {results.length} {results.length === 1 ? "event" : "events"}
        {trimmedQuery.length > 0 ? ` for “${trimmedQuery}”` : ""}
      </Text>
      <Pressable onPress={handleClearAll} accessibilityRole="button" className="active:opacity-60">
        <Text className="text-sm font-semibold text-[#ff775d]">Clear</Text>
      </Pressable>
    </View>
  ) : (
    <DiscoveryPanel
      recentSearches={recentSearches}
      onPickSearch={handlePickSearch}
      onClearRecent={handleClearRecent}
      categories={browseCategories}
      activeCategory={activeCategory}
      onPickCategory={handlePickCategory}
    />
  );

  const listEmpty = isSearching ? (
    <View className="items-center gap-3 px-6 py-16">
      <SearchX size={32} color={mutedColor} />
      <Text
        style={{ fontFamily: DisplayFont }}
        className="text-xl font-bold tracking-[-0.8px] text-[#111111] dark:text-[#f5f2ec]">
        No events found
      </Text>
      <Text className="text-center text-sm leading-5 text-[#777773] dark:text-[#a9a9a3]">
        Try a different artist, venue, or category.
      </Text>
      <Pressable
        onPress={handleClearAll}
        accessibilityRole="button"
        className="mt-2 rounded-full bg-[#111111] px-5 py-2.5 active:opacity-80 dark:bg-[#f5f2ec]">
        <Text className="text-sm font-semibold text-white dark:text-[#111111]">Clear search</Text>
      </Pressable>
    </View>
  ) : null;

  return (
    <View className="flex-1 bg-[#f7f6f2] dark:bg-[#0b1020]">
      <View style={{ paddingTop: insets.top + 8 }} className="px-5 pb-3">
        <Text
          style={{ fontFamily: DisplayFont }}
          className="text-[32px] font-bold tracking-[-1.8px] text-[#111111] dark:text-[#f5f2ec]">
          Search
        </Text>

        <View
          style={styles.searchBar}
          className="mt-4 flex-row items-center gap-2 rounded-full bg-white px-4 dark:bg-[#151b2e]">
          <Search size={18} color={mutedColor} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            onSubmitEditing={() => rememberSearch(query)}
            placeholder="Events, artists, or venues"
            placeholderTextColor={mutedColor}
            accessibilityLabel="Search events"
            returnKeyType="search"
            autoCapitalize="none"
            autoCorrect={false}
            className="flex-1 py-3 text-base text-[#111111] dark:text-[#f5f2ec]"
          />
          {query.length > 0 ? (
            <Pressable
              onPress={() => setQuery("")}
              accessibilityRole="button"
              accessibilityLabel="Clear search text"
              hitSlop={8}
              className="active:opacity-60">
              <X size={16} color={mutedColor} />
            </Pressable>
          ) : null}
        </View>
      </View>

      <FlashList
        data={results}
        renderItem={renderItem}
        keyExtractor={(item) => item.title}
        ListHeaderComponent={listHeader}
        ListEmptyComponent={listEmpty}
        ItemSeparatorComponent={Separator}
        keyboardShouldPersistTaps="handled"
        keyboardDismissMode="on-drag"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

function Separator() {
  return <View style={styles.separator} />;
}

const styles = StyleSheet.create({
  searchBar: {
    borderCurve: "continuous",
    boxShadow: "0 2px 10px rgba(0, 0, 0, 0.05)",
  },
  listContent: {
    paddingHorizontal: 20,
    paddingBottom: BottomTabInset + 24,
  },
  separator: {
    height: 8,
  },
});
