import { NextResponse } from "next/server";
import Models from "@/db/index";

let db = new Models();
const { User, Session }: any = db;

export async function POST(req: any) {
  const body = await req.json();

  let { username, password } = body.data;

  const user = await User.findOne({
    where: {
      username,
    },
  });
  if (!user) {
    return NextResponse.json({
      error: {
        message: "Not exists user",
      },
    });
  }

  let match = await user.matchPassword(password);
  if (!match) {
    return NextResponse.json({
      error: {
        message: "Not exists user",
      },
    });
  }

  let session = await Session.createSession(user, "", "", null);

  let data = await user.loginData(session);

  return NextResponse.json({
    data: {
      User: data,
    },
  });
}
