import { getFlights } from "@/apis/aviation";
import { NextRequest, NextResponse } from "next/server";


export const GET = async (req: NextRequest) => {
    const { searchParams } = new URL(req.url);
    const keyword = searchParams.get('keyword');
    if (!keyword) {
        return NextResponse.error();
    }
    const flights = await getFlights(keyword.toUpperCase());

    return NextResponse.json({
        ok: true,
        flights
    })
}