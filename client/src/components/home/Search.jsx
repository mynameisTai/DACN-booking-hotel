import { Select, Option, Button } from "@material-tailwind/react";
import Datepicker from "react-tailwindcss-datepicker";
import { Link } from "react-router-dom";
import { memo } from "react";

export function Search(props) {
  const handleChangeOption1 = props.onSelect1;
  const handleChangeValueDate = props.dateCheckinChechout;
  const dateCheckinChechout = props.dateNow;
  const handleSearch = props.onFilter;
  return (
    <div className="flex w-auto mr-72 ml-72 flex-row gap-6 justify-between text-black">
      <Select
        color="blue"
        label="Chọn địa điểm đến"
        className="select-label bg-blue-gray-50 text-black "
        onChange={handleChangeOption1}
      >
        <Option value="Vũng Tàu">Vũng Tàu</Option>
        <Option value="Nha Trang">Nha Trang</Option>
        <Option value="Đà Lạt">Đà Lạt</Option>
        <Option value="Phú Quốc">Phú Quốc</Option>
      </Select>
      <div className=" w-full rounded-xl border border-solid border-black ">
        <Datepicker
          value={dateCheckinChechout}
          onChange={handleChangeValueDate}
          showShortcuts={true}
          containerClassName="relative font-semibold"
        />
      </div>

      <Button onClick={handleSearch} className="bg-black w-24">
        Tìm
      </Button>
    </div>
  );
}
export default memo(Search);
