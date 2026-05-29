import { Badge } from "@radix-ui/themes";

interface CustomTagsProps {
  tags?: string;
  scale?: number;
  fontSize?: string;
  padding?: string;
}

const CustomTags = ({ tags, scale = 1, fontSize = 'text-[10px]', padding = 'px-1 py-0' }: CustomTagsProps) => {
  if (!tags || tags.trim() === "") {
    return null;
  }
  
  const tagList = tags.split(";").filter((tag) => tag.trim() !== "");
  
  const colors: Array<
    | "ruby"
    | "gray"
    | "gold"
    | "bronze"
    | "brown"
    | "yellow"
    | "amber"
    | "orange"
    | "tomato"
    | "red"
    | "crimson"
    | "pink"
    | "plum"
    | "purple"
    | "violet"
    | "iris"
    | "indigo"
    | "blue"
    | "cyan"
    | "teal"
    | "jade"
    | "green"
    | "grass"
    | "lime"
    | "mint"
    | "sky"
  > = [
    "ruby",
    "gray",
    "gold",
    "bronze",
    "brown",
    "yellow",
    "amber",
    "orange",
    "tomato",
    "red",
    "crimson",
    "pink",
    "plum",
    "purple",
    "violet",
    "iris",
    "indigo",
    "blue",
    "cyan",
    "teal",
    "jade",
    "green",
    "grass",
    "lime",
    "mint",
    "sky"
  ];

  // 解析带颜色的标签
  const parseTagWithColor = (tag: string) => {
    const colorMatch = tag.match(/<(\w+)>$/);
    if (colorMatch) {
      const color = colorMatch[1].toLowerCase();
      const text = tag.replace(/<\w+>$/, "");
      // 检查颜色是否在支持的颜色列表中
      if (colors.includes(color as any)) {
        return { text, color: color as typeof colors[number] };
      }
    }
    return { text: tag, color: null };
  };

  // 如果 scale 为 1，不需要额外的缩放容器
  if (scale === 1) {
    return (
      <>
        {tagList.map((tag, index) => {
          const { text, color } = parseTagWithColor(tag);
          const badgeColor = color || colors[index % colors.length];
          
          return (
            <Badge
              key={index}
              color={badgeColor}
              variant="soft"
              size="1"
              className={`${fontSize} ${padding} whitespace-nowrap`}
              style={{ lineHeight: '1.2' }}
            >
              {text}
            </Badge>
          );
        })}
      </>
    );
  }

  // 如果需要缩放，使用缩放容器
  return (
    <div 
      className="inline-flex items-center gap-0.5"
      style={{
        transform: `scale(${scale})`,
        transformOrigin: 'left center'
      }}
    >
      {tagList.map((tag, index) => {
        const { text, color } = parseTagWithColor(tag);
        const badgeColor = color || colors[index % colors.length];
        
        return (
          <Badge
            key={index}
            color={badgeColor}
            variant="soft"
            size="1"
            className={`${fontSize} ${padding} whitespace-nowrap`}
            style={{ lineHeight: '1.2' }}
          >
            {text}
          </Badge>
        );
      })}
    </div>
  );
};

export default CustomTags;