import { useCallback, useContext, useEffect, useRef, useState } from "react";
import ListCard from "../components/card/ListCard";
import Header from "../components/home/Header";
import { Sidebar } from "../components/home/Sidebar";
import clientAxios from "../api";
import "../index.css";
import LoadingCard from "./LoadingCard";
import { AuthContext } from "../context";
import { actions, useStore } from "../context/order";
import Search from "../components/home/Search";
import moment from "moment";
// import { io } from "socket.io-client";

export default function Home() {
  const [listCategory, setListCategory] = useState([]);
  const [listHotel, setListHotel] = useState([]);
  const { idCurrentUser } = useContext(AuthContext);
  const [currentIdCurrentUser, setCurrentIdCurrentUser] = useState(null);
  const [state, dispatch] = useStore();
  let userId = sessionStorage.getItem("userId");
  // const socket = useRef();
  // useEffect(() => {
  //   socket.current = io("ws://localhost:4343");
  // }, []);
  // useEffect(() => {
  //   if (userId !== "" || userId !== undefined || userId !== null) {
  //     socket.current.emit("addUser", userId);
  //     socket.current.on("getUsers", (users) => {
  //       console.log(users);
  //     });
  //   } else {
  //     console.log("không có userId");
  //   }
  // }, [userId]);
  useEffect(() => {
    clientAxios
      .get("/category")
      .then((res) => {
        setListCategory(res.data.categories);
      })
      .catch((err) => console.log(err));

    clientAxios
      .get("/hotel")
      .then((res) => {
        setListHotel(res.data.hotels);
      })
      .catch((err) => console.log(err));
    if (currentIdCurrentUser !== idCurrentUser) {
      setCurrentIdCurrentUser(idCurrentUser);
    }
    dispatch(actions.setCurrentUserId(userId));
    return () => {
      setListCategory();
      setListHotel();
    };
  }, [currentIdCurrentUser, idCurrentUser]);

  const [selectedOption1, setSelectedOption1] = useState("");
  const [hotelFilter, setHotelFilter] = useState([]);

  const [isActive1, setIsActive1] = useState(true);

  const [dateNow, setDateNow] = useState();

  const handleChangeOption1 = (e) => {
    setSelectedOption1(e);
  };

  useEffect(() => {
    const now = moment();
    setDateNow(now.format("DD/MM/YYYY"));
  }, []);
  const [dateCheckinChechout, setDateCheckinChechout] = useState({
    startDate: new Date(),
    endDate: new Date().setMonth(11),
  });

  const timePresent = moment().format("HH:mm");
  const handleChangeValueDate = (e) => {
    const selectedOption = e;
    const startDate = moment(selectedOption.startDate).format("DD/MM/YYYY");
    if (startDate < dateNow) {
      alert("Ngày bắt đầu không được nhỏ hơn ngày hiện tại");
      setDateCheckinChechout("");
    } else if (startDate === dateNow && timePresent > "11:00") {
      alert("Vui lòng đặt phỏng trước 11h");
      moment(startDate).add(1, "day");
      setDateCheckinChechout();
    } else {
      setDateCheckinChechout(e);
    }
  };
  // search
  const handleSearch = () => {
    setCheckedItems2([]);
    const filteredListHotel = listHotel.filter((hotel) => {
      return hotel.address.includes(selectedOption1);
    });
    setHotelFilter(filteredListHotel);
  };

  const [checkedItems, setCheckedItems] = useState([]);

  const [checkedCategoryItems, setCheckedCategoryItems] = useState([]);

  const handleCheckboxChange = useCallback(
    (e) => {
      const checkedItemId = e.target.value;
      const isChecked = e.target.checked;
      let item = listArea.find((item) => item.id === parseInt(checkedItemId));
      if (isChecked === true && !checkedItems.includes(item.title)) {
        setCheckedItems([...checkedItems, item.title]);
      } else {
        setCheckedItems(checkedItems.filter((title) => title !== item.title));
      }
    },
    [checkedItems]
  );
  const [checkedItems2, setCheckedItems2] = useState([]);
  const [checkedAreaItems, setCheckedAreaItems] = useState([]);
  const listArea = [
    {
      id: 1,
      title: "Vũng Tàu",
    },
    {
      id: 2,
      title: "Đà Lạt",
    },
    {
      id: 3,
      title: "Nha Trang",
    },
    {
      id: 4,
      title: "Phú Quốc",
    },
  ];
  const handleFilterArea = useCallback((e) => {
    const area = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      const selectedArea = listArea.find((item) => item.title === area);

      if (selectedArea) {
        setCheckedItems2((prevItems) => [...prevItems, selectedArea.title]);
      }
    } else {
      setCheckedItems2((prevItems) =>
        prevItems.filter((item) => item !== area)
      );
    }
  }, []);
  const filteredHotels = listHotel?.filter((item) =>
    checkedItems2.some((checkedItem) => item.address.includes(checkedItem))
  );

  const handleFilterCategory = useCallback(
    (e) => {
      const checkedItemId = e.target.value;
      const isChecked = e.target.checked;
      let item = listCategory.find(
        (category) => category._id === checkedItemId
      );
      if (
        isChecked === true &&
        !checkedItems.includes(item?._id) &&
        item !== undefined
      ) {
        setCheckedCategoryItems([...checkedCategoryItems, item._id]);
      } else {
        setCheckedCategoryItems(
          checkedCategoryItems.filter((hotel) => hotel !== item?._id)
        );
      }
    },
    [checkedCategoryItems]
  );

  const fillType = listHotel?.filter((hotel) =>
    checkedCategoryItems.includes(hotel.categoryId)
  );
  useEffect(() => {
    setHotelFilter(fillType);
  }, [checkedCategoryItems]);

  return (
    <div className="">
      <Header />
      <div className=" mt-4 w-full h-auto mb-2">
        <Search
          onSelect1={handleChangeOption1}
          isActive1={isActive1}
          dateNow={dateCheckinChechout}
          dateCheckinChechout={handleChangeValueDate}
          onFilter={handleSearch}
        />
      </div>
      <div className="flex justify-center row-span-full">
        <Sidebar
          listCategory={listCategory}
          listArea={listArea}
          onCheckboxChange={handleCheckboxChange}
          onFilterCategory={handleFilterCategory}
          onFilterByArea={handleFilterArea}
        />
        {listHotel ? (
          <ListCard
            listHotel={
              filteredHotels.length > 0
                ? filteredHotels
                : hotelFilter.length === 0
                ? listHotel
                : hotelFilter
            }
          />
        ) : (
          <div className="mt-16">
            <LoadingCard />
          </div>
        )}
      </div>
    </div>
  );
}
