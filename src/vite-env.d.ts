
/// <reference types="vite/client" />

// Type declarations for CSS imports
declare module "*.css" {
    const content: string;
    export default content;
  }
  
  declare module "*.scss" {
    const content: string;
    export default content;
  }
  
  declare module "*.sass" {
    const content: string;
    export default content;
  }
  
  declare module "*.less" {
    const content: string;
    export default content;
  }
  
  declare module "*.styl" {
    const content: string;
    export default content;
  }