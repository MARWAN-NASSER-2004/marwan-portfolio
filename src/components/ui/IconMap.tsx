import { 
  SiFlutter, 
  SiDart, 
  SiPostman, 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiHtml5, 
  SiTailwindcss, 
  SiBootstrap, 
  SiDotnet, 
  SiMysql, 
  SiDatabricks, 
  SiDiagramsdotnet, 
  SiGithub, 
  SiCisco, 
  SiArduino
} from "react-icons/si";
import { FaReact, FaCode, FaWindows } from "react-icons/fa";

export const IconMap: Record<string, any> = {
  SiFlutter, 
  SiDart, 
  SiPostman, 
  SiReact, 
  SiNextdotjs, 
  SiTypescript, 
  SiJavascript, 
  SiHtml5, 
  SiTailwindcss, 
  SiBootstrap, 
  SiDotnet, 
  SiCsharp: SiDotnet, // Fallback
  SiWindows: FaWindows, // Use FA
  SiMysql, 
  SiMicrosoftsqlserver: SiDatabricks, // Fallback
  SiDatabricks, 
  SiDiagramsdotnet, 
  SiGithub, 
  SiCisco, 
  SiArduino,
  FaReact,
  FaCode
};
