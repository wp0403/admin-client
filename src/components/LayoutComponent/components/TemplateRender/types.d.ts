export type AppItemProps = {
  title: React.ReactNode;
  desc?: React.ReactNode;
  icon?: React.ReactNode | (() => React.ReactNode);
  url?: string;
  target?: string;
  children?: Omit<AppItemProps, "children">[];
};

export type AppListProps = AppItemProps[];

export type AppLogoProps = {
  logo: string | React.ReactNode | (() => React.ReactNode),
  title?: React.ReactNode
}

export type AppSimpleContentProps = {
  title: string;
  logo: string | React.ReactNode | (() => React.ReactNode);
  url?: string;
  isMobile: boolean;
  itemClick?: (item: {
    title: string;
    logo: string | React.ReactNode | (() => React.ReactNode);
    url?: string;
  }) => void;
};
