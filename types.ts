
export interface IdeaText {
  pitch: string;
  howItWorks: string;
}

export interface Idea extends IdeaText {
  imageUrl: string;
}

export interface GeminiResponse {
  synthesis: string;
  ideas: IdeaText[];
}
