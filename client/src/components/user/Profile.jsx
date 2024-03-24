import React, { useContext, useEffect, useState } from "react";
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBCard,
  MDBCardText,
  MDBCardBody,
  MDBCardImage,
  MDBBreadcrumb,
  MDBBreadcrumbItem,
  MDBProgress,
  MDBProgressBar,
  MDBListGroup,
  MDBListGroupItem,
} from "mdb-react-ui-kit";
import { useNavigate } from "react-router-dom";
import Navbar from "../home/Navbar";
import { Button } from "@mui/material";
import clientAxios from "../../api";
import { useStore } from "../../context/order";
import moment from "moment";
import { CardHeader } from "@material-tailwind/react";

export default function Profile() {
  const navigate = useNavigate();
  const [state, dispatch] = useStore();
  const [user, setUser] = useState({});
  const [listOrdered, setListOrdered] = useState([]);
  const [listOrderPending, setListOrderPending] = useState([]);
  const [twoOrder, setTwoOrder] = useState([]);
  const [isActiveHistory, setIsActiveHistory] = useState(false);
  const [isActivePending, setIsActivePending] = useState(false);
  const [isActiveTwoOrder, setIsActiveTwoOrder] = useState(true);

  const handleHomeClick = () => {
    navigate("/");
  };
  const idUser = state.user;
  useEffect(() => {
    clientAxios
      .get(`/user/me/${idUser}`)
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => console.log(err));

    clientAxios
      .get(`/order/metwo/${idUser}`)
      .then((res) => {
        setTwoOrder(res.data.orders);
      })
      .catch((err) => console.log(err));
    clientAxios
      .get(`/order/me/${idUser}`)
      .then((res) => {
        setListOrdered(res.data.orders);
      })
      .catch((err) => console.log(err));
    clientAxios
      .get(`/order/me/order-pending/${idUser}`)
      .then((res) => {
        setListOrderPending(res.data.orders);
      })
      .catch((err) => console.log(err));
    return () => {
      setUser();
      setListOrdered();
      setTwoOrder();
      setListOrderPending();
    };
  }, [idUser]);
  const handleHistoryOrdered = () => {
    setIsActivePending(false);
    setIsActiveHistory(true);
    setIsActiveTwoOrder(false);
  };
  const handleOrderPending = () => {
    setIsActivePending(true);
    setIsActiveHistory(false);
    setIsActiveTwoOrder(false);
  };

  const handleCancelOrder = (_id) => {
    clientAxios
      .get(`/order/cancel/${_id}`)
      .then((res) => {
        if (listOrdered) {
          setListOrderPending((prev) => {
            return prev.filter((item) => item._id !== _id);
          });
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <section style={{ backgroundColor: "#003b95" }}>
      <Navbar />

      <MDBContainer className="py-5 h-full">
        <MDBRow>
          <MDBCol>
            <MDBBreadcrumb className="bg-light  rounded-3 p-3 mb-4">
              <MDBBreadcrumbItem className="mt-2">
                <p onClick={handleHomeClick}>Home</p>
              </MDBBreadcrumbItem>
              <MDBBreadcrumbItem className="mt-2" active>
                User Profile
              </MDBBreadcrumbItem>
            </MDBBreadcrumb>
          </MDBCol>
        </MDBRow>

        <MDBRow>
          <MDBCol lg="4">
            <MDBCard className="mb-4">
              <MDBCardBody className="text-center">
                <MDBCardImage
                  src="https://images.pexels.com/photos/981588/pexels-photo-981588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="avatar"
                  className="rounded-circle"
                  style={{ width: "150px" }}
                  fluid
                />
                <p className="text-muted mb-1">{user?.username}</p>
              </MDBCardBody>
            </MDBCard>

            <MDBCard className="mb-4 mb-lg-0">
              <MDBCardBody className="p-0">
                <MDBListGroup flush className="rounded-3">
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <Button className="w-full" onClick={handleHistoryOrdered}>
                      <i className="fas fa-clone text-warning mr-5 mb-3"></i>
                      <MDBCardText>Lịch sử đặt phòng</MDBCardText>
                    </Button>
                  </MDBListGroupItem>
                  <MDBListGroupItem className="d-flex justify-content-between align-items-center p-3">
                    <Button className="w-full" onClick={handleOrderPending}>
                      <i className="fas fa-info-circle text-cyan-500 mr-5 mb-3"></i>
                      <MDBCardText>Booking đang tiến hành</MDBCardText>
                    </Button>
                  </MDBListGroupItem>
                </MDBListGroup>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
          <MDBCol lg="8">
            <MDBCard className="mb-4">
              <MDBCardBody>
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>User Name</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.username}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
                <MDBRow>
                  <MDBCol sm="3">
                    <MDBCardText>Email</MDBCardText>
                  </MDBCol>
                  <MDBCol sm="9">
                    <MDBCardText className="text-muted">
                      {user?.email}
                    </MDBCardText>
                  </MDBCol>
                </MDBRow>
                <hr />
              </MDBCardBody>
            </MDBCard>

            <MDBRow>
              {isActivePending
                ? listOrderPending?.map((order) => (
                    <MDBCol md="6" className="mb-3">
                      <MDBCard className="mb-4 mb-md-0 mb-3" key={order._id}>
                        <MDBCardBody>
                          <MDBCardText className="mb-4">
                            <span className="text-primary font-italic me-1">
                              Địa điểm booking chờ duyệt
                            </span>{" "}
                            <Button
                              color="warning"
                              variant="contained"
                              size="small"
                              style={{ height: "30px", float: "right" }}
                              onClick={() => handleCancelOrder(order._id)}
                            >
                              Cancel
                            </Button>
                          </MDBCardText>

                          <MDBCardText
                            className="mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.name}
                          </MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar
                              width={80}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.address}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {" "}
                            Thời gian:{" "}
                            {moment(order.dateCheckin).format(
                              "DD/MM/YYYY"
                            )} -{" "}
                            {moment(order.dateCheckout).format("DD/MM/YYYY")}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))
                : ""}
              {isActiveHistory
                ? listOrdered?.map((order) => (
                    <MDBCol md="6" className="mb-3">
                      <MDBCard className="mb-4 mb-md-0 mb-3" key={order._id}>
                        <MDBCardBody>
                          <MDBCardText className="mb-4">
                            <span className="text-primary font-italic me-1">
                              Địa điểm booking
                            </span>{" "}
                            <Button
                              color="error"
                              variant="contained"
                              size="small"
                              disabled
                              style={{
                                height: "30px",
                                float: "right",
                                backgroundColor: `${
                                  order.status === "Pending..."
                                    ? "#176B87"
                                    : "rgb(14 22 45)"
                                }`,
                                color: `${
                                  order.status === "Pending..."
                                    ? "white"
                                    : "white"
                                }`,
                              }}
                            >
                              {order.status}
                            </Button>
                          </MDBCardText>
                          <MDBCardText
                            className="mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.name}
                          </MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar
                              width={80}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.address}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {" "}
                            Thời gian:{" "}
                            {moment(order.dateCheckin).format(
                              "DD/MM/YYYY"
                            )} -{" "}
                            {moment(order.dateCheckout).format("DD/MM/YYYY")}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))
                : ""}

              {isActiveTwoOrder
                ? twoOrder?.map((order) => (
                    <MDBCol md="6" className="mb-3">
                      <MDBCard className="mb-4 mb-md-0 mb-3" key={order._id}>
                        <MDBCardBody>
                          <MDBCardText className="mb-4">
                            <span className="text-primary font-italic me-1">
                              Địa điểm booking
                            </span>{" "}
                          </MDBCardText>
                          <MDBCardText
                            className="mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.name}
                          </MDBCardText>
                          <MDBProgress className="rounded">
                            <MDBProgressBar
                              width={80}
                              valuemin={0}
                              valuemax={100}
                            />
                          </MDBProgress>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {order.hotel?.address}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          >
                            {" "}
                            Thời gian:{" "}
                            {moment(order.dateCheckin).format(
                              "DD/MM/YYYY"
                            )} -{" "}
                            {moment(order.dateCheckout).format("DD/MM/YYYY")}
                          </MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>

                          <MDBCardText
                            className="mt-4 mb-1"
                            style={{ fontSize: ".77rem" }}
                          ></MDBCardText>
                        </MDBCardBody>
                      </MDBCard>
                    </MDBCol>
                  ))
                : ""}
            </MDBRow>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}
