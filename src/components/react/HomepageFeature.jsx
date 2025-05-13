import { humanize } from "@/lib/utils/textConverter";
import * as Icon from "react-feather";
import { markdownify } from "@/lib/utils/textConverter";

const HomapageFeature = ({ feature_list }) => {
  return (
    <div className="key-feature-grid mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
      {feature_list.map((item, i) => {
        const FeatherIcon = Icon[humanize(item.icon)];
        return (
          <div
            key={i}
            className="flex flex-col justify-between rounded-lg bg-surface p-4 shadow-lg hover:shadow-xl hover:shadow-secondary/50 transition-all hover:scale-105"
          >
            <div>
              <div className="flex flex-row items-center mb-2">
                <span className="icon flex-shrink-0">
                <FeatherIcon />
                </span>
                <h3 className="ml-2 break-words text-sm md:text-lg font-medium">{item.title}</h3>
              </div>
              <p className="text-xs sm:text-sm" dangerouslySetInnerHTML={{__html: markdownify(item.content)}}></p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default HomapageFeature;
