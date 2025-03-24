import prisma from "../utils/db_connect.js";

import generateNewCode from "../utils/getCouponCode.js";

const generateCoupon = async (req, res) => {
  try {
    const now = new Date().getTime().toString();
    const coupon = generateNewCode(now);

    const newCoupon = await prisma.coupon.create({
      data: {
        code: coupon,
        isActive: true,
        isClaimed: false,
      },
    });

    if (!newCoupon) {
      return res.status(500).json({
        message: "Failed to generate coupon",
        error: "COUPON_GENERATION_FAILED",
      });
    }

    res.status(200).json({
      code: newCoupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to generate coupon",
      error: "COUPON_GENERATION_FAILED",
      errorDetails: error,
    });
  }
};

const getCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Invalid coupon id",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    const coupon = await prisma.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon not found",
        error: "COUPON_NOT_FOUND",
      });
    }

    res.status(200).json({
      message: "Coupon fetched successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get coupon",
      error: "COUPON_GET_FAILED",
      errorDetails: error,
    });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await prisma.coupon.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    if (!coupons) {
      return res.status(404).json({
        message: "No coupons found",
        error: "COUPON_NOT_FOUND",
      });
    }

    res.status(200).json({
      message: "All coupons fetched successfully",
      coupons,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to get all coupons",
      error: "COUPON_GET_ALL_FAILED",
      errorDetails: error,
    });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Invalid coupon id",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    let coupon = await prisma.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon id not found",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    coupon = await prisma.coupon.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({
      message: "Coupon deleted successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to delete coupon",
      error: "COUPON_DELETE_FAILED",
      errorDetails: error,
    });
  }
};

const activateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: "Invalid coupon id",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    let coupon = await prisma.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon id not found",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    coupon = await prisma.coupon.update({
      where: {
        id: id,
      },
      data: {
        isActive: true,
      },
    });

    res.status(200).json({
      message: "Coupon activated successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to activate coupon",
      error: "COUPON_ACTIVATION_FAILED",
      errorDetails: error,
    });
  }
};

const deactivateCoupon = async (req, res) => {
  try {
    const { id } = req.params;

    // Check if id is provided
    if (!id) {
      return res.status(400).json({
        message: "Invalid coupon id",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    let coupon = await prisma.coupon.findUnique({
      where: {
        id: id,
      },
    });

    if (!coupon) {
      return res.status(404).json({
        message: "Coupon id not found",
        error: "COUPON_ID_NOT_FOUND",
      });
    }

    // Update the coupon, setting isActive to false
    coupon = await prisma.coupon.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });

    res.status(200).json({
      message: "Coupon deactivated successfully",
      coupon,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to deactivate coupon",
      error: "COUPON_DEACTIVATION_FAILED",
      errorDetails: error,
    });
  }
};

export {
  generateCoupon,
  deleteCoupon,
  activateCoupon,
  deactivateCoupon,
  getCoupon,
  getAllCoupons,
};
