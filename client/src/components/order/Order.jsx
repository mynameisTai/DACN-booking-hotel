import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Textarea,
  Alert,
} from "@material-tailwind/react";
import { actions, useStore } from "../../context/order";
import { formatPrice } from "../../common/formatPrice";
import { memo, useEffect, useMemo, useRef, useState } from "react";
import { debounce } from "lodash";
import clientAxios from "../../api/index";
import { Modal } from "@mui/material";
import CodeIcon from "@mui/icons-material/Code";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CloseIcon from "@mui/icons-material/Close";
import { io } from "socket.io-client";
import { toast } from "react-toastify";
import StripeCheckout from "react-stripe-checkout";
import StripeContainer from "../payment/StripeContainer";
import { Icon } from "../../common/Icon";
export function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="h-3 w-3"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M4.5 12.75l6 6 9-13.5"
      />
    </svg>
  );
}

export function Order(props) {
  const [listOrder, dispatch] = useStore();
  const [note, setNote] = useState("");
  const [isShowModal, setIsShowModal] = useState(props.open);
  const [prevIsShowModal, setPrevIsShowModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [idOrder, setIdOrder] = useState("");
  // let userId = sessionStorage.getItem("userId");

  // // const userId = order.user;
  // const receiverId = "65117d24711c7e3c9c47ee6d";

  // const socket = useRef();
  // useEffect(() => {
  //   socket.current = io("ws://localhost:4343");
  // }, []);
  // useEffect(() => {
  //   if (userId || userId !== "" || userId !== undefined || userId !== null) {
  //     socket.current.on("getUsers", (users) => {
  //       console.log(users);
  //     });
  //   } else {
  //     console.log("không có userId");
  //   }
  // }, [userId]);

  let amoutDate = Math.round(
    (new Date(listOrder.dateCheckout) - new Date(listOrder.dateCheckin)) /
      (1000 * 60 * 60 * 24)
  );

  const totalPrice = useMemo(() => {
    return listOrder.orderItems.reduce((acc, item) => {
      if (
        !isNaN(item.quantity) ||
        !isNaN(item.price) ||
        item.quantity !== undefined ||
        item.price !== undefined
      ) {
        return acc + item?.price * item.quantity * amoutDate;
      } else {
        return acc;
      }
    }, 0);
  }, [listOrder, amoutDate]);

  const allowSubmit = useMemo(() => {
    return listOrder;
  }, [listOrder]);

  const debouncedDispatch = useMemo(() => {
    return debounce((e) => {
      setNote(e);
      dispatch(actions.setOrderNote(e));
    }, 800);
  }, []);

  useEffect(() => {
    setPrevIsShowModal(isShowModal);
  }, [props.open]);

  useEffect(() => {
    if (isShowModal !== prevIsShowModal) {
      setIsShowModal(isShowModal);
    }
  }, [isShowModal, prevIsShowModal]);
  const convertToUSD = (totalPrice / 24000).toFixed(2);
  const handleChaneNote = (e) => {
    debouncedDispatch(e.target.value);
  };
  const openPaymentVNPay = async (event) => {
    event.preventDefault();

    try {
      const response = await clientAxios.post("order/vnpay", {
        amount: parseInt(totalPrice),
        order: listOrder,
      });
      console.log("co ko ", response.data);
      // if (response.data.success) {
      //   setIdOrder(response.data.newOrder._id);
      //   setShowAlert(true);
      //   toast({
      //     title: "Đơn hàng mới",
      //     message: `Đơn hàng mới với mã số ${response.data.newOrder._id} đã được tạo.`,
      //     type: "info",
      //     pauseOnHover: false,
      //   });
      // }
    } catch (error) {
      console.log("Error", error);
    }
  };

  const handleSubmit = () => {
    if (allowSubmit) {
      clientAxios
        .post("/order", listOrder)
        .then((res) => {
          setIdOrder(res.data.newOrder._id);
          setShowAlert(true);
          toast({
            title: "Đơn hàng mới",
            message: `Đơn hàng mới với mã số ${res.data.newOrder._id} đã được tạo.`,
            type: "info",
            pauseOnHover: false,
          });
          // socket.current.emit("sendMessage", {
          //   senderId: userId,
          //   receiverId,
          //   text: `Đơn hàng mới với mã số ${res.data.newOrder._id} đã được tạo.`,
          // });
        })
        .catch((err) => console.log(err));
    } else {
      alert(
        "Vui lòng nhập giá trị cho tất cả các trường hoặc để trống trường Ghi chú."
      );
    }
  };

  const handleCloseArlert = () => {
    setShowAlert(false);
    dispatch(actions.setClearOrder());

    props.onOpen();
  };
  const [isShowPayment, setIsShowPayment] = useState(false);
  const openPayment = () => {
    setIsShowPayment(!isShowPayment);
  };
  return (
    <>
      <Modal
        open={props.open}
        className="flex justify-center"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card
          id="modal-modal-title"
          color="white"
          variant="gradient"
          className="w-full max-w-[30rem] h-auto max-h-[800px] p-8 bg-blue-gray-50 mt-3"
        >
          <CloseIcon
            color="primary"
            className="mb-2 cursor-pointer float-right hover:text-cyan-400"
            onClick={props.onOpen}
          />
          {showAlert ? (
            <Alert
              open={true}
              className="absolute max-w-screen-md bg-blue-700 h-28 z-10"
              icon={<Icon />}
              onClose={() => handleCloseArlert()}
            >
              <Typography variant="h5" color="white">
                Booking thành công
              </Typography>
              <Typography color="white" className="mt-2 font-normal">
                Đơn hàng {idOrder}
              </Typography>
            </Alert>
          ) : (
            ""
          )}
          <CardHeader
            floated={false}
            shadow={false}
            color="transparent"
            className="m-0 mb- rounded-s-2xl border-b border-white/10 pb-8 text-center"
          >
            <Typography
              variant="small"
              color="light-blue"
              className="font-medium uppercase text-lg "
            >
              <AttachMoneyIcon className="mb-1" />
              Bill
            </Typography>
            <Typography
              variant="h1"
              color="black"
              className="flex justify-center gap-1 text-7xl font-norma"
            >
              {formatPrice(totalPrice)}{" "}
              <span className="self-end text-4xl"></span>
            </Typography>
            <div className="flex mt-3 h-10 justify-center">
              <Typography variant="h4" className="">
                {listOrder.dateCheckin}
                <CodeIcon color="primary" />
                {listOrder.dateCheckout}
              </Typography>
            </div>
            <Typography variant="h4" className="">
              {amoutDate} ngày {amoutDate + 1} đêm
            </Typography>
          </CardHeader>
          <CardBody
            className="p-0 max-h-max[600px]  overflow-y: scroll"
            id="modal-modal-description"
          >
            <ul className="flex flex-col gap-4">
              {listOrder.orderItems.map((item) => (
                <li className="flex items-center gap-4">
                  <span className="rounded-full border border-white/20 bg-cyan-400 mb-2 text-white p-1">
                    <CheckIcon />
                  </span>
                  <Typography className="font-bold">
                    {item.name}: {item.quantity} * {formatPrice(item.price)}
                  </Typography>
                </li>
              ))}
            </ul>
            <div className="flex w-full flex-col gap-6">
              <Textarea
                color="blue"
                label="Ghi chú"
                className="text-base h-auto border-[2px] "
                onChange={handleChaneNote}
              />
            </div>
          </CardBody>
          <CardFooter className="mt-12 p-0 ">
            <Button
              size="lg"
              color="white"
              className="mb-2 hover:scale-[1.02] focus:scale-[1.02] active:-100"
              ripple={false}
              fullWidth={true}
              onClick={openPaymentVNPay}
            >
              Thanh toán qua VnPay
            </Button>
            <Button
              size="lg"
              color="white"
              className="mb-2 hover:scale-[1.02] focus:scale-[1.02] active:-100"
              ripple={false}
              fullWidth={true}
              onClick={openPayment}
            >
              Thanh toán qua Stripe
            </Button>
            <Button
              size="lg"
              color="white"
              className="hover:scale-[1.02] focus:scale-[1.02] active:-100"
              ripple={false}
              fullWidth={true}
              onClick={handleSubmit}
            >
              Xác nhận
            </Button>
          </CardFooter>
        </Card>
      </Modal>
      {isShowPayment ? (
        <Modal
          open={isShowPayment}
          className="flex justify-center "
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <CardBody
            className="p-0 h-[20%] mt-14 w-[600px]  bg-blue-gray-900 rounded-xl  overflow-y: scroll"
            id="modal-modal-description"
          >
            <StripeContainer
              totalPrice={convertToUSD}
              toggleShowPM={openPayment}
            />
          </CardBody>
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}
export default memo(Order);
