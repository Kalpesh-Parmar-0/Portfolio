import { WindowControls } from "#components";
import WindowWraper from "#hoc/WindowWraper";
import {
  ChevronLeft,
  ChevronRight,
  Copy,
  PanelLeft,
  Plus,
  Search,
  Share,
  ShieldHalf,
} from "lucide-react";
import { educationHistory } from "#constants";

const Safari = () => {
  return (
    <>
      <div id="window-header">
        <WindowControls target="safari" />

        <PanelLeft className="ml-10 icon" />

        <div className="flex items-center gap-1 ml-5">
          <ChevronLeft className="icon" />
          <ChevronRight className="icon" />
        </div>

        <div className="flex-1 flex-center gap-3">
          <ShieldHalf className="icon" />
          <div className="search">
            <Search className="icon" />
            <input
              type="text"
              placeholder="search or enter website name"
              className="flex-1"
            />
          </div>
        </div>

        <div className="flex items-center gap-5">
          <Share className="icon" />
          <Plus className="icon" />
          <Copy className="icon" />
        </div>
      </div>

      <div className="education">
        <h2>Education</h2>

        <div className="space-y-8">
          {educationHistory.map(
            ({ id, name, year, speciality, percentage }) => (
              <div key={id} className="education-post">
                <div className="col-span-2 flex items-center">
                  <h1>{year}</h1>
                </div>

                <div className="content">
                  <p>{speciality} at</p>
                  <h3>{name}</h3>
                  <p>{percentage}</p>
                </div>
              </div>
            ),
          )}
        </div>
      </div>
    </>
  );
};

const SafariWindow = WindowWraper(Safari, "safari");

export default SafariWindow;
