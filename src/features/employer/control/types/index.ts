export interface ControlModule {
  id: string;
  name: string;
  description: string;
  isEnabled: boolean;
  icon: string;
}

export interface ControlPageData {
  modules: ControlModule[];
  totalActive: number;
  totalModules: number;
}