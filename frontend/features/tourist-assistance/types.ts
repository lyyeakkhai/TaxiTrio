export type AssistanceCategory = "emergency" | "language" | "route" | "support";

export type AssistanceItem = {
  id: string;
  category: AssistanceCategory;
  title: string;
  content: string;
  is_active: boolean;
};
