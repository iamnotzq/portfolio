/**
 * Type definition for a skill.
 */
export type Skill = {
    id: number;
    name: string;
    designation: string;
    image: string;
  };
  
  /**
   * General list of skills for components like the Hero section.
   */
  export const SKILLS: Skill[] = [
    { id: 1, name: "JavaScript (ES6+)", designation: "Core Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
    { id: 2, name: "TypeScript", designation: "Static Typing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { id: 3, name: "React", designation: "Frontend & Mobile", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
    { id: 4, name: "Node.js", designation: "Backend Runtime", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
    { id: 5, name: "Expo", designation: "Development Toolkit", image: "/icons/expo.png" },
    { id: 6, name: "MySQL", designation: "Database", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" },
    { id: 7, name: "Firebase", designation: "Backend as a Service", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
    { id: 8, name: "Google Cloud", designation: "Cloud Platform", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
    { id: 9, name: "GitHub", designation: "Version Control", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
    { id: 10, name: "Figma", designation: "Design Tool", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
  ];
  
  /**
   * List of skills acquired at the university.
   */
  export const universitySkills: Skill[] = [
      { id: 1, name: "React", designation: "Frontend Library", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
      { id: 2, name: "Python", designation: "General Purpose", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg" },
      { id: 3, name: "JavaScript", designation: "Web Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
      { id: 4, name: "HTML5", designation: "Markup Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg" },
      { id: 5, name: "CSS3", designation: "Styling Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg" },
      { id: 6, name: "MySQL", designation: "Relational Database", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original-wordmark.svg" },
      { id: 7, name: "PHP", designation: "Scripting Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg" },
      { id: 8, name: "C++", designation: "Systems Programming", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/cplusplus/cplusplus-original.svg" },
      { id: 9, name: "R", designation: "Statistical Computing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/r/r-original.svg" },
      { id: 10, name: "Spark", designation: "Data Processing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apachespark/apachespark-original-wordmark.svg" },
      { id: 11, name: "HBase", designation: "NoSQL Database", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/apache/apache-original-wordmark.svg" },
      { id: 12, "name": "TensorFlow", "designation": "Machine Learning", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tensorflow/tensorflow-original.svg" },
      { id: 13, "name": "Scikit-learn", "designation": "ML Library", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/scikitlearn/scikitlearn-original.svg" },
      { id: 14, "name": "Keras", "designation": "Neural Networks", "image": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/keras/keras-original.svg" },
];
  
export const propsFactorySkill: Skill[] = [
  { id: 1, name: "React", designation: "Frontend Library", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg" },
   { id: 3, name: "JavaScript", designation: "Web Language", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" },
   { id: 2, name: "TypeScript", designation: "Static Typing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" },
    { id: 4, name: "Node.js", designation: "Backend Runtime", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg" },
   { id: 5, name: "Expo", designation: "Development Toolkit", image: "/icons/expo.png" },
    { id: 7, name: "Firebase", designation: "Backend as a Service", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/firebase/firebase-plain.svg" },
   { id: 8, name: "Google Cloud", designation: "Cloud Platform", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/googlecloud/googlecloud-original.svg" },
   { id: 9, name: "GitHub", designation: "Version Control", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg" },
   { id: 6, name: "Figma", designation: "Design Tool", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg" },
   
];
  
  /**
   * List of skills acquired at the polytechnic.
   */
  export const polytechnicSkills: Skill[] = [
      { id: 1, name: "Rhino 3D", designation: "3D Modeling", image: "/icons/rhino.png" },
      { id: 2, name: "Keyshot", designation: "3D Rendering", image: "/icons/keyshot.jpg" },
      { id: 3, name: "Adobe Illustrator", designation: "Vector Graphics", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg" },
      { id: 4, name: "Adobe Photoshop", designation: "Image Editing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
      { id: 5, name: "Adobe Premiere Pro", designation: "Video Editing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/premierepro/premierepro-plain.svg" },
];
  
export const auralAidSkills: Skill[] = [
  { id: 1, name: "Rhino 3D", designation: "3D Modeling", image: "/icons/rhino.png" },
  { id: 2, name: "Grasshopper", designation: "Parametric Design", image: "/icons/grasshopper.png" },
  { id: 3, name: "Keyshot", designation: "3D Rendering", image: "/icons/keyshot.jpg" },
  { id: 4, name: "3ds Max", designation: "3D Rendering", image: "/icons/3dsmax.png" },
  { id: 5, name: "Adobe Illustrator", designation: "Vector Graphics", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/illustrator/illustrator-plain.svg" },
  { id: 6, name: "Adobe Photoshop", designation: "Image Editing", image: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/photoshop/photoshop-plain.svg" },
  ];
  