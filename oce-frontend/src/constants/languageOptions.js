export const languageOptions = [
  {
    id: 1,
    name: "C",
    label: "C",
    value: "c",
    defaultCode: `#include <stdio.h>\n\nint main() {\n  printf("Hello, C!");\n  return 0;\n}`
  },
  {
    id: 2,
    name: "C++",
    label: "C++",
    value: "cpp",
    defaultCode: `#include <iostream>\n\nint main() {\n  std::cout << "Hello, C++!" << std::endl;\n  return 0;\n}`
  },
  {
    id: 3,
    name: "Java",
    label: "Java",
    value: "java",
    defaultCode: `// Write your Java code here\n// If you need to take user input, import Scanner\n// import java.util.Scanner;\npublic class Main {\n  public static void main(String[] args) {\n    System.out.println("Hello, Java!");\n  }\n}`
  },
  {
    id: 4,
    name: "Python",
    label: "Python",
    value: "py",
    defaultCode: `# Write your Python code here\nprint("Hello, Python!")`
  }
];