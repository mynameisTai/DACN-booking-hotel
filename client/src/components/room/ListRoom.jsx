import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Select,
  Option,
} from "@material-tailwind/react";
import BungalowIcon from "@mui/icons-material/Bungalow";
import SingleBedIcon from "@mui/icons-material/SingleBed";
import PersonIcon from "@mui/icons-material/Person";
import { useEffect, useState } from "react";
import Datepicker from "react-tailwindcss-datepicker";
import moment from "moment";
import { useStore, actions } from "../../context/order";
import { formatPrice } from "../../common/formatPrice";
const TABLE_HEAD = ["Loại chỗ nghỉ ", "Phù hợp cho", "Giá", ""];

export function ListRoom(props) {
  const rooms = props.room;

  const [isActive, setIsActive] = useState(props.onDate);
  const [isActiveRoom, setIsActiveRoom] = useState(props.onCheckRoom);
  const [state, dispatch] = useStore();
  const [dateNow, setDateNow] = useState();
  const [quantity, setQuantity] = useState(null);
  const [roomId, setRoomId] = useState("");
  useEffect(() => {
    const now = moment();
    setDateNow(now.format("DD/MM/YYYY"));
  }, []);
  const [dateCheckinChechout, setDateCheckinChechout] = useState({
    startDate: "",
    endDate: new Date().setMonth(11),
  });

  useEffect(() => {
    setIsActive(props.onDate);
    setIsActiveRoom(props.onCheckRoom);
  }, [props]);

  const timePresent = moment().format("HH:mm");
  const handleChangeValueDate = (e) => {
    const selectedOption = e;
    const startDate = moment(selectedOption.startDate);
    if (!startDate.isValid()) {
      alert("Ngày không hợp lệ");
      setDateCheckinChechout("");
    }
    const now = moment();
    if (startDate.isBefore(now, "day")) {
      alert("Ngày bắt đầu không được nhỏ hơn ngày hiện tại");
      setDateCheckinChechout("");
    } else if (startDate.isSame(now, "day") && timePresent > "11:00") {
      alert("Vui lòng đặt phòng trước 11h");
      setDateCheckinChechout("");
    } else {
      setIsActive(false);
      setDateCheckinChechout(e);
      dispatch(actions.setDateCheckInOut(e));
      let idCurrentUser = sessionStorage.getItem("userId");
      dispatch(actions.setCurrentUserId(idCurrentUser));
      console.log(sessionStorage.getItem("userId"));
    }
  };

  const handleChangeOption = (e, _id) => {
    setQuantity(e);
    setRoomId(_id);
    const room = rooms.find((item) => item._id === _id);
    const orderItem = {
      roomId: _id,
      quantity: parseInt(e),
      name: room.name,
      price: room.price,
    };
    if (orderItem?.roomId !== "" || quantity !== null) {
      setIsActiveRoom(false);
      dispatch(actions.setOrderItem(orderItem));
    }
  };

  return (
    <div className="block w-3/4">
      <div className="flex">
        <Typography className="font-medium text-base">Chọn ngày</Typography>
        <Typography className="ml-4 font-medium text-base text-red-600">
          {isActive ? "Hãy chọn 1 ngày tuyệt vời" : ""}
        </Typography>
      </div>
      <div className=" w-full rounded-xl font-semibold border-solid border-black border-1 bg-[#003b95] h-14 flex justify-center ">
        <div className="mt-2 w-4/5">
          <Datepicker
            containerClassName="relative font-semibold"
            value={dateCheckinChechout}
            onChange={handleChangeValueDate}
            showShortcuts={true}
          />
        </div>
      </div>
      <Card className="h-full ">
        <CardHeader floated={false} shadow={false} className="rounded-none">
          <Typography className="text-red-600 mt-2" variant="h5">
            {isActiveRoom ? "Hãy chọn phòng phù hợp" : ""}
          </Typography>
        </CardHeader>
        <CardBody className="overflow-scroll px-0">
          <table className="mt-4 w-full min-w-max table-auto text-left">
            <thead>
              <tr>
                {TABLE_HEAD.map((head) => (
                  <th
                    key={head}
                    className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 "
                  >
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className=" leading-none opacity-70 font-semibold text-lg"
                    >
                      {head}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rooms?.map(
                ({ _id, name, numberBed, amount, price, stock }, index) => {
                  const isLast = index === rooms.length - 1;
                  const classes = isLast
                    ? "p-4"
                    : "p-4 border-b border-blue-gray-50";

                  return (
                    <tr key={_id}>
                      <td className={classes}>
                        <div className="flex items-center gap-3">
                          <BungalowIcon></BungalowIcon>
                          <div className="flex flex-col">
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="font-normal"
                            >
                              {name}
                            </Typography>
                            <Typography
                              variant="small"
                              color="blue-gray"
                              className="opacity-70 font-semibold"
                            >
                              {numberBed}
                              <SingleBedIcon></SingleBedIcon>Giường lớn
                            </Typography>
                          </div>
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex ">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-semibold text-base mr-1"
                          >
                            {amount}
                          </Typography>
                          <PersonIcon />
                        </div>
                      </td>
                      <td className={classes}>
                        <div className="flex flex-col">
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal text-lg"
                          >
                            {stock === "Còn phòng"
                              ? formatPrice(price)
                              : "Hết phòng"}
                          </Typography>
                        </div>
                      </td>
                      <td className={classes}>
                        <Select
                          variant="standard"
                          label="Chọn phòng"
                          onChange={(e) => handleChangeOption(e, _id)}
                        >
                          <Option value="1">
                            1 ({formatPrice(price * 1)})
                          </Option>
                          <Option value="2">
                            2 ({formatPrice(price * 2)})
                          </Option>
                          <Option value="3">
                            3 ({formatPrice(price * 3)})
                          </Option>
                          <Option value="4">
                            4 ({formatPrice(price * 4)})
                          </Option>
                        </Select>
                      </td>
                    </tr>
                  );
                }
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
    </div>
  );
}
