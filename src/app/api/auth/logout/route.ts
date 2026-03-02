import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { scalekit } from "@/lib/scalekit";

export async function GET() {
   const cookieStore = await cookies()
   cookieStore.delete("access_token")

   const appUrl = process.env.NEXT_PUBLIC_APP_URL

   // Use SDK method to generate logout URL
   const logoutUrl = scalekit.getLogoutUrl({
      postLogoutRedirectUri: appUrl
   })

   return NextResponse.redirect(logoutUrl)
}