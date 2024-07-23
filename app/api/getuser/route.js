import { getUserMeLoader } from "@/data/services/getUserMeLoader";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getUserMeLoader();
    
    if (user.ok === false) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }

    // Assuming getUserMeLoader returns user data in user.data
    return NextResponse.json(user.data);
  } catch (error) {
    console.error('Error fetching user data:', error);
    return NextResponse.json({ message: 'Internal Server Error' }, { status: 500 });
  }
}