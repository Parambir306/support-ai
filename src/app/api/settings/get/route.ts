import connectDb from "@/lib/db";
import Settings from "@/model/settings.model";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const { ownerId } = body

        if (!ownerId) {
            return NextResponse.json(
                { message: "owner id is required" },
                { status: 400 }
            )
        }

        await connectDb()
        const setting = await Settings.findOne({ ownerId })

        // Return empty object if no settings exist yet (prevents frontend null crash)
        return NextResponse.json(setting || {})
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("[api/settings/get] Error:", errorMessage);
        return NextResponse.json(
            { message: `get setting error: ${errorMessage}` },
            { status: 500 }
        )
    }
}