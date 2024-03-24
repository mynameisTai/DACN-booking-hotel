import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { Carousel } from "flowbite-react";
import { ListRoom } from "../room/ListRoom";
import { useCallback, useEffect, useState } from "react";
import Navbar from "../home/Navbar";
import clientAxios from "../../api";
import { useParams } from "react-router-dom";
import { actions, useStore } from "../../context/order";
import { Order } from "../order/Order";
import ShowerIcon from "@mui/icons-material/Shower";
import { io } from "socket.io-client";
import { useRef } from "react";

export function CardDetail() {
  const id = useParams();
  const [open, setOpen] = useState(false);
  const [hotel, setHotel] = useState({});
  const [room, setRoom] = useState([]);
  const [isDate, setIsDate] = useState(false);
  const [isRoom, setIsRoom] = useState(false);
  const [order, dispatch] = useStore();
  const receiverId = "65117d24711c7e3c9c47ee6d";
  // let userId = sessionStorage.getItem("userId");

  // const userId = order.user;

  // const socket = useRef();
  // useEffect(() => {
  //   socket.current = io("ws://localhost:4343");
  // }, []);
  // useEffect(() => {
  //   if (userId !== "" || userId !== undefined || userId !== null) {
  //     socket.current.on("getUsers", (users) => {
  //       console.log(users);
  //     });
  //   } else {
  //     console.log("không có userId");
  //   }
  // }, [userId]);
  const handleOpen = () => {
    if (order.dateCheckin === "" || order.dateCheckout === "") {
      setIsDate(true);
    } else {
      if (order.orderItems.length === 0) {
        setIsRoom(true);
      } else {
        dispatch(actions.setModeModal(true));
        dispatch(actions.setIdHotel(id));
      }
    }
  };
  const handleClose = useCallback(() => {
    dispatch(actions.setModeModal(false));
  }, []);
  useEffect(() => {
    clientAxios
      .get(`/hotel/${id.hotelId}`)
      .then((res) => {
        setHotel(res.data.hotel);
      })
      .catch((err) => console.log(err));

    clientAxios
      .get(`/room/byhotel/${id.hotelId}`)
      .then((res) => {
        setRoom(res.data.room);
      })
      .catch((err) => console.log(err));

    return () => {
      setHotel();
      setRoom();
    };
  }, [id.hotelId]);
  const images = [
    "https://images.pexels.com/photos/260931/pexels-photo-260931.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/3754595/pexels-photo-3754595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/271624/pexels-photo-271624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://i.pinimg.com/564x/94/8f/a9/948fa9b1103218e5929893c0ef6b0c0f.jpg",
    "https://i.pinimg.com/564x/13/87/f5/1387f569dab9fa7a18e90f9b052e926f.jpg",
  ];
  return (
    <>
      <Navbar />
      <div className="w-full h-fit bg-[#003b95] relative flex justify-center">
        <Card className="w-full max-w-6xl h-[30rem]  flex-row top-10">
          <CardHeader
            shadow={false}
            floated={false}
            className="m-0 w-3/6 shrink-0 rounded-r-none"
          >
            <Carousel pauseOnHover>
              {images.map((item, index) => (
                <img key={index} alt="..." src={item} />
              ))}
            </Carousel>
          </CardHeader>
          <CardBody key={hotel?._id}>
            <Typography variant="h6" color="gray" className="mb-4 uppercase">
              {hotel?.name}
            </Typography>
            <Typography className="flex w-auto">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 mt-1 mr-2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6.115 5.19l.319 1.913A6 6 0 008.11 10.36L9.75 12l-.387.775c-.217.433-.132.956.21 1.298l1.348 1.348c.21.21.329.497.329.795v1.089c0 .426.24.815.622 1.006l.153.076c.433.217.956.132 1.298-.21l.723-.723a8.7 8.7 0 002.288-4.042 1.087 1.087 0 00-.358-1.099l-1.33-1.108c-.251-.21-.582-.299-.905-.245l-1.17.195a1.125 1.125 0 01-.98-.314l-.295-.295a1.125 1.125 0 010-1.591l.13-.132a1.125 1.125 0 011.3-.21l.603.302a.809.809 0 001.086-1.086L14.25 7.5l1.256-.837a4.5 4.5 0 001.528-1.732l.146-.292M6.115 5.19A9 9 0 1017.18 4.64M6.115 5.19A8.965 8.965 0 0112 3c1.929 0 3.716.607 5.18 1.64"
                />
              </svg>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {hotel?.address}
              </Typography>
            </Typography>
            <Typography color="gray" className="mb-8 font-normal">
              {hotel?.desc}
            </Typography>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Tiện ích <ShowerIcon className="ml-2" />
            </Typography>
            <Typography color="gray" className="mb-6 font-normal">
              {hotel?.extra}
            </Typography>
            <div className="flex bg-[#003b95]  rounded-xl w-[8rem] justify-center align-middle float-right">
              <Button
                onClick={handleOpen}
                variant="text"
                className="flex items-center gap-2 text-white"
              >
                Đặt
              </Button>
            </div>
          </CardBody>
        </Card>
        <Order open={order.mode} onOpen={handleClose} />
      </div>
      <div className="flex justify-center mt-24 overflow-hidden">
        {room?.length !== 0 ? (
          <ListRoom onDate={isDate} onCheckRoom={isRoom} room={room} />
        ) : (
          "Loading..."
        )}
      </div>
    </>
  );
}
