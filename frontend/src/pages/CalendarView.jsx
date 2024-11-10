import { TopBar } from "../components/Dashboard/TopBar";
import { Calendar } from "antd";

function CalendarView() {
  const onPanelChange = (value, mode) => {
    console.log(value.format("YYYY-MM-DD"), mode);
  };

  return (
    <div className="bg-white rounded-lg pb-4 shadow">
      <TopBar />
      <div className="m-4">
        <Calendar onPanelChange={onPanelChange} />
      </div>
    </div>
  );
}

export default CalendarView;
