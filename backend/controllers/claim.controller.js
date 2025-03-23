import prisma from "../utils/db_connect.js";

const claimCoupon = async (req, res) => {
  /*
   * Claim a coupon
   * 1. Check if id, ipAddress, and sessionId are provided
   * 2. Check if no claim is made from the same ipAddress in last 1 minute
   * 3. Check if no claim is made from the same sessionId.
   * 4. Get a coupon with isActive = True and isClaimed = False
   * 5. Create a claim with the coupon, ipAddress, and sessionId
   * 6. Update the coupon with isClaimed = True
   * 7. Return the claim
   */

  try {
    const { ipAddress, sessionId } = req.body;

    if (!ipAddress) {
      return res.status(400).json({
        message: "Invalid ip address",
      });
    }

    if (!sessionId) {
      return res.status(400).json({
        message: "Invalid session id",
      });
    }

    // Check if claim is made from the same ipAddress in last 1 minute
    const lastClaim = await prisma.claim.findMany({
      where: {
        ipAddress: ipAddress,
      },
      orderBy: {
        claimedAt: "desc",
      },
    });

    if (lastClaim.length > 0) {
      const lastClaimTime = lastClaim[0].claimedAt;
      const currentTime = new Date();
      const timeDiff = currentTime.getTime() - lastClaimTime.getTime();
      const minutesDiff = Math.floor(timeDiff / 60000);

      if (minutesDiff < 1) {
        return res.status(400).json({
          message: "You have already claimed within the last minute",
          error: "CLAIM_ALREADY_MADE_FROM_SAME_IP",
          lastClaimTime,
        });
      }
    }

    let coupon = await prisma.coupon.findFirst({
      where: {
        isActive: true,
        isClaimed: false,
      },
    });

    if (!coupon) {
      return res.status(404).json({
        message: "No active coupons found",
      });
    }

    const claim = await prisma.claim.create({
      data: {
        coupon: {
          connect: {
            id: coupon.id,
          },
        },
        ipAddress: ipAddress,
        sessionId: sessionId,
        claimedAt: new Date(),
      },
      select: {
        id: true,
        coupon: {
          select: {
            code: true,
          },
        },
      },
    });

    coupon = await prisma.coupon.update({
      where: {
        id: coupon.id,
      },
      data: {
        isClaimed: true,
      },
    });

    res.status(200).json({
      message: "Coupon claimed successfully",
      claim,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Failed to claim coupon",
      errorDetails: error,
    });
  }
};

export { claimCoupon };
