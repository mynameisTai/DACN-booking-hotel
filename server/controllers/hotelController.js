import cloundinary from "cloudinary";
import catchAsyncError from "../middleware/catchAsyncErrors.js";
import ErrorHandler from "../utills/errorHandle.js";
import { CategoryModel, HotelModel, UserModel } from "../models/index.js";

export const getAllHotel = catchAsyncError(async (req, res, next) => {
  const hotels = await HotelModel.find().where({ status: true });
  res.status(200).json({
    hotels,
    message: "get hotel successfully",
    success: true,
  });
});
export const getCountHotel = catchAsyncError(async (req, res, next) => {
  const counthotel = await HotelModel.count();
  res.status(200).json({
    counthotel,
    message: "get hotel successfully",
    success: true,
  });
});
export const getAllHotelMain = catchAsyncError(async (req, res, next) => {
  const hotel = await HotelModel.find().sort();
  const hotelCount = await HotelModel.count();

  res.status(200).json({
    hotel,
    message: "get all hotel successfully",
    success: true,
    hotelCount,
  });
});
export const createHotel = catchAsyncError(async (req, res, next) => {
  const hotels = req.body.hotels;
  const userId = req.body.userId;
  const user = await UserModel.findById(userId);
  if (!user) return next(new ErrorHandler("Not found user...", 404));
  const categoryId = req.body.categoryId;
  const category = await CategoryModel.findById(categoryId);
  if (!category) return next(new ErrorHandler("Not found category...", 404));

  const newHotels = [];

  for (const hotel of hotels) {
    const newHotel = await new HotelModel({
      name: hotel.name,
      desc: hotel.desc,
      image: hotel.image,
      address: hotel.address,
      rate: hotel.rate,
      extra: hotel.extra,
      user: user._id,
      categoryId: category._id,
    }).save();
    newHotels.push(newHotel);
  }
  console.log(newHotels);

  res.status(200).json({
    newHotels,
    success: true,
    message: "Create hotels successfully!!!",
  });
});
export const getOneHotel = catchAsyncError(async (req, res, next) => {
  const hotel = await HotelModel.findById(req.params.id).select("-user");
  if (!hotel) return next(new ErrorHandler("Error get hotel ...", 400));

  res.status(200).json({
    hotel,
    success: true,
    message: "Get hotel id successfully!!!",
  });
});
export const updateHotel = catchAsyncError(async (req, res, next) => {
  const hotel = await HotelModel.findById(req.params.id);
  if (!hotel) return next(new ErrorHandler("hotel not found", 404));

  const updatehotel = await HotelModel.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
    updatehotel,
    message: "update hotel success",
  });
});
export const updateHotelStatus = catchAsyncError(async (req, res, next) => {
  const hotel = await HotelModel.findById(req.params.id);

  if (!hotel) {
    return next(new ErrorHandler("Not found", 404));
  }
  if (hotel.status == true) {
    hotel.status = false;
  } else {
    hotel.status = true;
  }
  await hotel.save();

  res.status(200).json({
    hotel,
    success: true,
  });
});
