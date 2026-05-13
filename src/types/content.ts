export type ProjectItem = {
  title: string;
  description: string;
  stack: string[];
  link: string;
};

export type CursusItem = {
  period: string;
  title: string;
  description: string;
};

export type ClientFeedbackItem = {
  quote: string;
  name: string;
  role: string;
};

export type PortfolioContent = {
  projects: ProjectItem[];
  stack: string[];
  cursus: CursusItem[];
  feedback: ClientFeedbackItem[];
};
