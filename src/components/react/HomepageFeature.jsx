import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
import { markdownify } from "@/lib/utils/textConverter";


const HomapageFeature = ({ feature_list }) => {
  // Helper function to get href based on feature title
  const getHrefFromTitle = (title) => {
    switch (title) {
      case "Strefa Pacjenta":
        return "/wiedza/dla-pacjenta";
      case "Strefa Biznesu":
        return "/wiedza/dla-biznesu";
      case "Strefa Medyczna":
        return "/wiedza/dla-lekarzy";
      case "Konopne ABC":
        return "/wiedza/abc-konopi";
      case "Aktualności":
        return "/aktualnosci";
      case "Strefa Badań":
        return "/wiedza/strefa-badan";
      case "Członkowie":
        return "/czlonkowie";
      case "Partnerzy Wspierający":
        return "/partnerzy";
      case "Zastosowania":
        return "/wiedza/strefa-badan";
      default:
        return "/wiedza";
    }
  };

  // Helper function to get the correct icon component
  const getIconComponent = (iconName) => {
    // Map icon names to the correct capitalization in react-feather
    const iconMap = {
      "book": "Book",
      "briefcase": "Briefcase",
      "activity": "Activity",
      "table": "Grid", // "Table" doesn't exist in react-feather, using Grid instead
      "target": "Target",
      "calendar": "Calendar",
      "search": "Search",
      "users": "Users",
      "file-text": "FileText",
      "award": "Award"
    };
    
    const iconKey = iconMap[iconName] || "HelpCircle";
    return Icon[iconKey];
  };

  // Custom brighter green color
  const brightGreen = "#00CC66"; // Brighter green hex color
  
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
      {feature_list.map((item, i) => {
        const FeatherIcon = getIconComponent(item.icon);
        const href = getHrefFromTitle(item.title);
        
        return (
          <a 
            href={href}
            key={i}
            className="flex flex-col justify-between rounded-lg bg-surface p-4 shadow-lg hover:shadow-xl hover:shadow-[#00CC66]/40 transition-all hover:scale-105 no-underline cursor-pointer"
          >
            <div>
              <div className="flex flex-row items-center mb-2">
                <span className="icon flex-shrink-0" style={{ color: brightGreen }}>
                  {FeatherIcon && <FeatherIcon color={brightGreen} size={20} />}
                </span>
                <h3 className="ml-2 break-words text-sm md:text-lg font-medium" style={{ color: brightGreen }}>{item.title}</h3>
              </div>
              <p className="text-xs sm:text-sm text-current text-justify" dangerouslySetInnerHTML={{__html: markdownify(item.content)}}></p>
            </div>
          </a>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
