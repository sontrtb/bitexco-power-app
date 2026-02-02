import useColor from "@/hooks/useColor";
import { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import SpaceUi from "../ui/SpaceUi";
import TextUi from "../ui/TextUi";

interface CardCategoryProps {
  color: string;
  type: "top" | "left" | "bottom" | "right";
  height?: number;
  text: string;
  count: number;
}

function CardCategory(props: CardCategoryProps) {
  const { color, type, height, text, count } = props;

  const colors = useColor();

  const padding = useMemo(() => {
    switch (type) {
      case "bottom":
        return {
          paddingBottom: 4,
        };
      case "top":
        return {
          paddingTop: 4,
        };
      case "left":
        return {
          paddingLeft: 4,
        };
      case "right":
        return {
          paddingRight: 4,
        };
    }
  }, [type]);

  return (
    <View style={[styles.container, { backgroundColor: color }, padding]}>
      <View style={[styles.content, { backgroundColor: colors.bgCard, height: height}]}>
        <TextUi style={styles.title}>{text}</TextUi>
        <SpaceUi height={4} />
        <TextUi style={[styles.count, {color: color}]}>{count ?? 0}</TextUi>
      </View>
    </View>
  );
}

export default CardCategory;

const styles = StyleSheet.create({
  container: {
    borderRadius: 34,
    overflow: "hidden",

    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  content: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    justifyContent: "center",
    borderRadius: 32,
  },
  title: { fontWeight: "700" },
  count: { fontWeight: "700", fontSize: 32 },
});