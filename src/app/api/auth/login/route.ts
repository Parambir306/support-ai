import { scalekit } from "@/lib/scalekit";
import { NextResponse } from "next/server";

export async function GET() {
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "");
    const redirectUri = `${baseUrl}/api/auth/callback`
    const url = scalekit.getAuthorizationUrl(redirectUri, {
        prompt: "select_account"
    })
    return NextResponse.redirect(url)
}