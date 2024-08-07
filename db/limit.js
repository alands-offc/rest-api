import User from '../db/handler.js'; // Sesuaikan dengan path yang sesuai

// Fungsi untuk mengurangi nilai limit
async function minl(apikey, amount) {
  try {
    const user = await User.findOne({ apikey: apikey });
    if (!user) {
      throw new Error('User not found');
    }

    if (user.limit < amount) {
      return false
    }

    user.limit -= amount;
    await user.save();
    return true
  } catch (error) {
    throw new Error(error.message);
  }
}

async function plusl(apikey, amount) {
  try {
    const user = await User.findOne({ apikey: apikey });
    if (!user) {
      throw new Error('User not found');
    }
    user.limit += amount;
    await user.save();
    return true
  } catch (error) {
    throw new Error(error.message);
  }
}


async function claimDailyReward(apikey) {
  try {
    const user = await User.findOne({ apikey });
    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    const oneDay = 24 * 60 * 60 * 1000; // 1 hari dalam milidetik

    if (user.daily && (now - user.daily) < oneDay) {
      
      return 'Daily reward already claimed. Please wait until 24 hours pass.';
    }

    user.daily = now;
    await plusl(apikey, 10)
    await user.save();
    return 'Daily reward claimed successfully!\n anda mendapatkan 10limit';
  } catch (error) {
    throw new Error(error.message);
  }
}

async function claimWeeklyReward(apikey) {
  try {
    const user = await User.findOne({ apikey });
    if (!user) {
      throw new Error('User not found');
    }

    const now = new Date();
    const oneWeek = 7 * 24 * 60 * 60 * 1000; // 1 minggu dalam milidetik

    if (user.weekly && (now - user.weekly) < oneWeek) {
      return 'Weekly reward already claimed. Please wait until 7 days pass.';
    }

    user.weekly = now;
    await plusl(apikey, 30)
    await user.save();
    return 'Weekly reward claimed successfully!\n anda mendapatkan\n 30limit';
  } catch (error) {
    throw new Error(error.message);
  }
}
export { minl, plusl, claimDailyReward, claimWeeklyReward }