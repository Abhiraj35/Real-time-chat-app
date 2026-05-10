type SectionHeaderProps = {
  title: string;
  emphasizedText?: string;
  description: string;
};

const SectionHeader = ({ title, emphasizedText, description }: SectionHeaderProps) => (
  <div className="flex flex-col gap-2">
    <h2 className="text-2xl font-bold text-foreground">
      {title}{" "}
      {emphasizedText ? (
        <span className="bg-linear-to-b from-primary to-accent-secondary bg-clip-text text-transparent">
          {emphasizedText}
        </span>
      ) : null}
    </h2>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default SectionHeader;
